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
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

/// Apps
// 1 - Homestuck Search Engine
router.get("/app/1/tags", async (_, res) => {
    try {
        const db = mongoClient.db("homestuck");
        const definitionsCollection = db.collection("tag_definition");
        const synonymsCollection = db.collection("tag_synonym");

        const synonyms = {};
        (await synonymsCollection.find({}).toArray()).forEach((item) => {
            synonyms[item._id] = item;
        });

        const definitions = {};
        (await definitionsCollection.find({}).toArray()).forEach((item) => {
            definitions[item._id] = item;
        });

        res.status(200).json({
            definitions: definitions,
            synonyms: synonyms,
        });
    } catch (e) {
        res.status(500).json({ error: e });
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

router.post("/app/1/edit", authenticateToken, async (req, res) => {
    try {
        if (req.body.edits) {
            const db = mongoClient.db("homestuck");
            const collection = db.collection("asset");

            for (const id in req.body.edits) {
                const tags = req.body.edits[id];

                await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { tags: tags.map((tag) => tag[1]) } }
                );
            }

            res.status(200).json({});
        } else {
            res.status(400).json({
                error: "Incorrect data format. Requires tags in the form of an array.",
            });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.post("/app/1/edit/:id", authenticateToken, async (req, res) => {
    try {
        if (req.body.tags && req.body.tags.length > 0) {
            const db = mongoClient.db("homestuck");
            const collection = db.collection("asset");

            res.status(200).json(
                await collection.updateOne(
                    { _id: new ObjectId(req.params.id) },
                    { $set: { tags: req.body.tags } }
                )
            );
        } else {
            res.status(400).json({
                error: "Incorrect data format. Requires tags in the form of an array.",
            });
        }
    } catch (e) {
        res.status(500).json({ error: e });
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
    res.sendStatus(200);
});

module.exports = router;
