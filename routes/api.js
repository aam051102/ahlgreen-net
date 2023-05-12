const { mongoClient } = require("../database");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { ObjectId } = require("bson");

// Authenticate token
const authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ error: "Authentication is required" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid auth token" });
        }

        req.user = user;
        next();
    });
};

/// Apps
// 1 - Homestuck Search Engine

/**
 * path: /app/1/tags
 * query:
 *   include []
 *     synonyms - adds a "synonyms" property on each tag, which is a string array of its synonyms
 */
router.get("/app/1/tags", async (req, res) => {
    try {
        const qInclude = req.query?.include;
        let include = [];
        if (Array.isArray(qInclude)) include = qInclude;
        else if (typeof include === "string") include = [qInclude];

        const db = mongoClient.db("homestuck");
        const definitionsCollection = db.collection("tag_definition");
        const synonymsCollection = db.collection("tag_synonym");

        const synonyms = {};
        const synonymMap = {};
        (await synonymsCollection.find({}).toArray()).forEach((item) => {
            synonyms[item._id] = item;

            if (qInclude.includes("synonyms")) {
                if (!synonymMap[item.ref]) synonymMap[item.ref] = [];
                synonymMap[item.ref].push(item._id);
            }
        });

        // TODO: Maybe restructure, so both synonym forms are optional?????

        const definitions = {};
        (await definitionsCollection.find({}).toArray()).forEach((item) => {
            if (qInclude.includes("synonyms")) {
                item.synonyms = synonymMap[item._id];
            }

            definitions[item._id] = item;
        });

        res.status(200).json({
            definitions: definitions,
            synonyms: synonyms,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

router.post("/app/1/tags", authenticateToken, async (req, res) => {
    try {
        /**
         * @type {({ type: "create"; data: { id: number; parentId: number; name: string }; } | {type:"move"; data: { childId: number; oldParentId?: number; newParentId: number; placeBeforeTagId?:number; }} | {type: "edit";  data: { id: number; name: string };}| { type: "delete"; data: { id: number; parentId: number; keepChildren?: boolean; })[]}
         */
        const actions = req.body.actions;

        const db = mongoClient.db("homestuck");
        const definitionsCollection = db.collection("tag_definition");

        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];

            if (action.type === "create") {
                // TODO: Create synonyms

                const createRes = await definitionsCollection.insertOne({
                    _id: action.data.id,
                    name: action.data.name,
                });

                if (!createRes.acknowledged) {
                    return res.status(500).json({ error: "Failed to create" });
                }

                const updateParentRes = await definitionsCollection.updateOne(
                    {
                        _id: action.data.parentId,
                    },
                    {
                        $push: { children: action.data.id },
                    }
                );

                if (!updateParentRes.acknowledged) {
                    return res
                        .status(500)
                        .json({ error: "Failed to add to parent" });
                }
            } else if (action.type === "move") {
                // Old parent
                if (action.data.oldParentId !== undefined) {
                    const oldParentRes = await definitionsCollection.findOne({
                        _id: action.data.oldParentId,
                    });
                    const childIndex = oldParentRes.children.findIndex(
                        (child) => child === action.data.childId
                    );
                    oldParentRes.children.splice(childIndex, 1);

                    const updateOldParentRes =
                        await definitionsCollection.updateOne(
                            {
                                _id: action.data.oldParentId,
                            },
                            {
                                $set: { children: oldParentRes.children },
                            }
                        );

                    if (!updateOldParentRes.acknowledged) {
                        return res
                            .status(500)
                            .json({ error: "Failed to move from parent" });
                    }
                }

                // New parent
                const newParentRes = await definitionsCollection.findOne({
                    _id: action.data.newParentId,
                });
                if (placeBeforeTagId !== undefined) {
                    const placeBeforeTagIndex =
                        newParentRes.children?.findIndex(
                            (child) => child === action.data.placeBeforeTagId
                        ) ?? -1;
                    newParentRes.children.splice(
                        placeBeforeTagIndex,
                        0,
                        action.data.childId
                    );
                } else {
                    newParentRes.children.push(action.data.childId);
                }

                const updateNewParentRes =
                    await definitionsCollection.updateOne(
                        {
                            _id: action.data.newParentId,
                        },
                        {
                            $set: { children: newParentRes.children },
                        }
                    );

                if (!updateNewParentRes.acknowledged) {
                    return res
                        .status(500)
                        .json({ error: "Failed to move to parent" });
                }
            } else if (action.type === "edit") {
                // TODO: Update synonyms

                const updateRes = await definitionsCollection.updateOne(
                    { _id: action.data.id },
                    {
                        $set: {
                            name: action.data.name,
                        },
                    }
                );

                if (!updateRes.acknowledged) {
                    return res.status(500).json({ error: "Failed to update" });
                }
            } else if (action.type === "delete") {
                const parentDoc = await definitionsCollection.findOne({
                    _id: action.data.parentId,
                });
                const childIndex = parentDoc.children.findIndex(
                    (child) => child === action.data.id
                );

                if (action.data.keepChildren) {
                    const tagDoc = await definitionsCollection.findOne({
                        _id: action.data.id,
                    });

                    parentDoc.children.splice(
                        childIndex,
                        1,
                        ...tagDoc.children
                    );
                } else {
                    parentDoc.children.splice(childIndex, 1);
                }

                const removeFromParentRes =
                    await definitionsCollection.updateOne(
                        {
                            _id: action.data.parentId,
                        },
                        {
                            $set: { children: parentDoc.children },
                        }
                    );

                if (!removeFromParentRes.acknowledged) {
                    return res
                        .status(500)
                        .json({ error: "Failed to remove from parent" });
                }
            }
        }

        res.status(200).json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

router.post("/app/1/search", async (req, res) => {
    try {
        const db = mongoClient.db("homestuck");
        const collection = db.collection("asset");

        let searchObj = {};

        // Tags
        let tags = req.body.tags;
        if (tags && tags.length > 0) {
            searchObj.tags = { $all: tags };
        }

        // Page ranges
        let pageRanges = req.body.ranges;
        if (pageRanges && pageRanges.length > 0) {
            if (pageRanges.length > 0) {
                searchObj["$or"] = [];
            }

            for (let i = 0; i < pageRanges.length; i++) {
                searchObj["$or"].push({
                    page: {
                        $gte: parseInt(pageRanges[i][0]),
                        $lte: parseInt(pageRanges[i][1]),
                    },
                });
            }
        }

        res.status(200).json(await collection.find(searchObj).toArray());
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/app/1/edit/:id", authenticateToken, async (req, res) => {
    try {
        if (req.body.tags && Array.isArray(req.body.tags)) {
            const db = mongoClient.db("homestuck");
            const collection = db.collection("asset");

            const updateRes = await collection.updateOne(
                { _id: Number(req.params.id) },
                { $set: { tags: req.body.tags } }
            );

            if (!updateRes) {
                return res.status(500).json({ error: "Failed to update." });
            }

            const dataRes = await collection.findOne({
                _id: Number(req.params.id),
            });

            res.status(200).json(dataRes);
        } else {
            res.status(400).json({
                error: "Incorrect data format. Requires tags in the form of an array.",
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});

// Login
const expirationTime =
    process.env.NODE_ENV === "development"
        ? 1000 * 60 * 60 * 6
        : 1000 * 60 * 60;

router.post("/app/1/login", (req, res) => {
    if (req.body && req.body.password) {
        if (req.body.password == process.env.APP_HSSE_PASSWORD) {
            // Generate token
            res.status(200).json({
                valid: true,
                token: jwt.sign(
                    { date: req.body.password },
                    process.env.TOKEN_SECRET,
                    { expiresIn: expirationTime / 1000 }
                ),
                expires: new Date().getTime() + expirationTime,
            });
            return;
        }
    }

    res.status(400).json({
        error: "Incorrect password",
    });
});

// Validation check
router.post("/app/1/validate", authenticateToken, (_, res) => {
    res.status(200).json({ valid: true });
});

module.exports = router;
