const {
    getDatabaseConnection,
    connectToDatabase,
    sessionStore,
    mongoClient,
} = require("../database");
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const jwt = require("jsonwebtoken");

let databaseConnection = getDatabaseConnection();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Credentials
const credentials = [
    {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    },
];

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
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

// Sanitize MySQL input
const sanitize = (text) => {
    return encodeURIComponent(text).replace(/'|"|`/g, "\\$&");
};

// Check if database connection is valid
const validateDatabase = () => {
    databaseConnection.query("SELECT test FROM system", (err) => {
        if (err) {
            console.log("Reperformed database handshake.");
            databaseConnection = connectToDatabase();
        }
    });

    // Clear session store
    sessionStore.clear((err) => {
        if (err) console.error(err);
        console.log("Cleared session storage.");
    });
};

setInterval(validateDatabase, 1000 * 60 * 60 * 24 * 14);

// Routes
// Admin login
router.post("/login", (req, res) => {
    if (
        req.session.adminLocked == undefined ||
        req.session.adminLocked == false
    ) {
        if (
            req.body != undefined &&
            req.body.username != undefined &&
            req.body.password != undefined
        ) {
            for (let i = 0; i < credentials.length; i++) {
                if (
                    req.body.username == credentials[i].username &&
                    req.body.password == credentials[i].password
                ) {
                    // Generate token
                    res.status(200).json({
                        valid: true,
                        token: jwt.sign(
                            { date: req.body.username },
                            process.env.TOKEN_SECRET,
                            { expiresIn: "1h" }
                        ),
                        expires: new Date().getTime() + 1000 * 60 * 60,
                    });
                    return;
                }
            }
        }

        if (req.session.adminAttempts) {
            req.session.adminAttempts++;

            if (req.session.adminAttempts > 3) {
                req.session.adminLocked = true;
            }
        } else {
            req.session.adminAttempts = 1;
            req.session.adminLocked = false;
        }
    }

    if (req.session.adminLocked) {
        res.status(400).json({
            error: "Too many attempts at accessing the administration panel",
            locked: true,
        });
    } else {
        res.status(400).json({
            error: "Incorrect password and username combination",
            locked: false,
        });
    }
});

// Validation check
router.post("/validate", authenticateToken, (_, res) => {
    res.sendStatus(200);
});

// Email
router.post("/email", async (req, res) => {
    res.json(
        new Promise((resolve, reject) => {
            transporter.sendMail(
                {
                    from: `${process.env.EMAIL_USERNAME}`,
                    to: `${process.env.EMAIL_PRIVATE}`,
                    subject: req.body.subject,
                    text: `${req.body.email}:\n\n${req.body.message}`,
                },
                (err, info) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(info);
                    }
                }
            );
        })
    );
});

// Get all
router.get("/get/:type", (req, res) => {
    let query = "";

    if (req.params.type == "creations" || req.params.type == "knowledge") {
        query = `SELECT * FROM \`${sanitize(req.params.type)}\``;
    } else {
        res.status(400).json({ error: "Invalid type." });
        return;
    }

    databaseConnection.query(query, (err, resp) => {
        if (err) {
            res.status(400).json({ error: "An error occured: " + err });
            return;
        }

        res.status(200).json(resp);
    });
});

// Get single
router.get("/get/:type/:selector", (req, res) => {
    let query = "";
    if (req.params.type == "creations") {
        query = `SELECT * FROM \`${sanitize(
            req.params.type
        )}\` WHERE id='${sanitize(req.params.selector)}'`;
    } else if (req.params.type == "knowledge") {
        query = `SELECT * FROM \`${sanitize(
            req.params.type
        )}\` WHERE id='${sanitize(req.params.selector)}'`;
    } else {
        res.status(400).json({ error: "Invalid type." });
        return;
    }

    databaseConnection.query(query, (err, resp) => {
        if (err) {
            res.status(400).json({ error: "An error occured: " + err });
            return;
        }

        res.status(200).json(resp);
    });
});

// Delete single
router.post("/delete/:type/:selector", authenticateToken, (req, res) => {
    let query = "";
    if (req.params.type == "creations") {
        query = `DELETE FROM \`${sanitize(
            req.params.type
        )}\` WHERE id="${sanitize(req.params.selector)}";`;
    } else if (req.params.type == "knowledge") {
        query = `DELETE FROM \`${sanitize(
            req.params.type
        )}\` WHERE id="${sanitize(req.params.selector)}";`;
    } else {
        res.status(400).json({ error: "Invalid type." });
        return;
    }

    databaseConnection.query(query, (err, resp) => {
        if (err) {
            res.status(400).json({ error: "An error occured: " + err });
            return;
        }

        res.status(200).json(resp);
    });
});

// Insert
router.post("/insert/:type", authenticateToken, (req, res) => {
    let query = ``;
    if (req.params.type == "creations") {
        query = `INSERT INTO \`${sanitize(
            req.params.type
        )}\` (\`name\`, \`image_url\`, \`url\`, \`description\`) VALUES (
            '${sanitize(req.body.name)}',
            '${sanitize(req.body.image_url)}',
            '${sanitize(req.body.url)}',
            '${sanitize(req.body.description)}'
            )`;
    } else if (req.params.type == "knowledge") {
        query = `INSERT INTO \`${sanitize(
            req.params.type
        )}\` (\`name\`, \`percentage\`, \`experience\`) VALUES (
            '${sanitize(req.body.name)}',
            '${sanitize(req.body.percentage)}',
            '${sanitize(req.body.experience)}'
            )`;
    } else {
        res.status(400).json({ error: "Invalid type." });
        return;
    }

    databaseConnection.query(query, (err, resp) => {
        if (err) {
            res.status(400).json({ error: "An error occured: " + err });
            return;
        }

        res.status(200).json({ id: resp.insertId });
    });
});

// Update
router.post("/update/:type/:selector", authenticateToken, (req, res) => {
    let query = "";
    if (req.params.type == "creations") {
        query = `UPDATE \`${sanitize(req.params.type)}\` SET 
        \`name\`='${sanitize(req.body.name)}',
        \`image_url\`='${sanitize(req.body.image_url)}',
        \`url\`='${sanitize(req.body.url)}',
        \`description\`='${sanitize(req.body.description)}' 
        WHERE id="${sanitize(req.params.selector)}";`;
    } else if (req.params.type == "knowledge") {
        query = `UPDATE \`${sanitize(req.params.type)}\` SET 
        \`name\`='${sanitize(req.body.name)}',
        \`percentage\`='${sanitize(req.body.percentage)}',
        \`experience\`='${sanitize(req.body.experience)}'
        WHERE id="${sanitize(req.params.selector)}";`;
    } else {
        res.status(400).json({ error: "Invalid type." });
        return;
    }

    databaseConnection.query(query, (err, resp) => {
        if (err) {
            res.status(400).json({ error: "An error occured: " + err });
            return;
        }

        res.status(200).json(resp);
    });
});

/// Apps
// 1 - Homestuck Search Engine
router.get("/app/1/tags", async (_, res) => {
    try {
        const db = mongoClient.db("homestuck");
        const collection = db.collection("tag");
        res.status(200).json(await collection.find({}).toArray());
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// DANGEROUS DEBUGGING FUNCTION
// TODO: REMOVE AFTER MODIFYING DATABASE
router.get("/app/1/debug", async (_, res) => {
    try {
        const db = mongoClient.db("homestuck");
        const collection = db.collection("asset");

        const items = await collection.find().toArray();
        let ob = [];

        for (let i = 0; i < items.length; i++) {
            ob.push({
                info: await collection
                    .updateOne(
                        { content: items[i].content },
                        {
                            $set: {
                                page: parseInt(
                                    items[i].url.substr(
                                        items[i].url.lastIndexOf("/") + 1
                                    )
                                ),
                            },
                        }
                    )
                    .then((e) => e.result),
            });

            ob.push(items[i]);
        }

        res.status(200).json({ test: ob, items: items });
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

module.exports = router;
