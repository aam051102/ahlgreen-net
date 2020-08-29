let {
    getDatabaseConnection,
    connectToDatabase,
    sessionStore,
} = require("../database");
const express = require("express");
const { session } = require("passport");
const { ESRCH } = require("constants");
const router = express.Router();

let databaseConnection = getDatabaseConnection();

// Credentials and generated keys
const generatedKeys = [];
const credentials = [
    {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    },
];

// Generates an API key
const generateKey = (username) => {
    let key = generatedKeys.find((key) => {
        return key.username == username;
    });

    if (!key) {
        // TODO: Come up with a method to create keys randomly
        key = (
            parseInt(new Buffer.from(username).join("")) *
            (Math.random() * 10)
        ).toString(16);

        generatedKeys.push({ username, key });
    } else {
        key = key.key;
    }

    return key;
};

// Check if key is valid
const validateKey = (key) => {
    if (
        generatedKeys.find((generatedKey) => {
            return generatedKey.key == key;
        }) == undefined
    ) {
        return false;
    } else {
        return true;
    }
};

// Check if database connection is valid
const validateDatabase = () => {
    databaseConnection.query("SELECT test FROM system", (err, resp) => {
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
router.post("/login", (req, res) => {
    let sess = req.session;

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
                    req.session.adminKey = true;

                    res.status(200).json({ valid: req.session.adminKey });
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

router.get("/logout", (req, res) => {
    req.session.adminKey = false;

    res.redirect("/admin/login");
});

router.post("/validate", (req, res) => {
    if (req.session.adminKey) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

router.get("/get/:type", (req, res) => {
    let query = "";

    if (req.params.type == "creations" || req.params.type == "knowledge") {
        query = `SELECT * FROM \`${req.params.type}\``;
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

router.get("/get/:type/:selector", (req, res) => {
    let query = "";
    if (req.params.type == "creations") {
        query = `SELECT * FROM \`${req.params.type}\` WHERE url_slug='${req.params.selector}'`;
    } else if (req.params.type == "knowledge") {
        query = `SELECT * FROM \`${req.params.type}\` WHERE id='${req.params.selector}'`;
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

router.post("/delete/:type/:selector", (req, res) => {
    if (!req.session.adminKey) {
        res.status(400).json({
            error: "You need to be an administrator to perform this action.",
        });
        return;
    }

    let query = "";
    if (req.params.type == "creations") {
        query =
            "DELETE FROM `" +
            req.params.type +
            '` WHERE url_slug="' +
            req.params.selector +
            '"';
    } else if (req.params.type == "knowledge") {
        query =
            "DELETE FROM `" +
            req.params.type +
            "` WHERE id=" +
            req.params.selector +
            "";
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

router.post("/insert/:type", (req, res) => {
    if (!req.session.adminKey) {
        res.status(400).json({
            error: "You need to be an administrator to perform this action.",
        });
        return;
    }

    let query = ``;
    if (req.params.type == "creations") {
        query = `INSERT INTO \`${
            req.params.type
        }\` (\`name\`, \`url_slug\`, \`image_url\`, \`url\`, \`description\`) VALUES (
            '${encodeURIComponent(req.body.name)}',
            '${encodeURIComponent(req.body.url_slug)}',
            '${encodeURIComponent(req.body.image_url)}',
            '${encodeURIComponent(req.body.url)}',
            '${encodeURIComponent(req.body.description)}'
            )`;
    } else if (req.params.type == "knowledge") {
        query = `INSERT INTO \`${
            req.params.type
        }\` (\`name\`, \`percentage\`) VALUES (
            '${encodeURIComponent(req.body.name)}',
            '${req.body.percentage}'
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

        res.status(200).json(resp);
    });
});

router.post("/update/:type/:selector", (req, res) => {
    if (!req.session.adminKey) {
        res.status(400).json({
            error: "You need to be an administrator to perform this action.",
        });
        return;
    }

    let query = "";
    if (req.params.type == "creations") {
        query = `UPDATE \`${req.params.type}\` SET 
        \`name\`='${encodeURIComponent(req.body.name)}',
        \`url_slug\`='${encodeURIComponent(req.body.url_slug)}',
        \`image_url\`='${encodeURIComponent(req.body.image_url)}',
        \`url\`='${encodeURIComponent(req.body.url)}',
        \`description\`='${encodeURIComponent(req.body.description)}' 
        WHERE url_slug='${req.params.selector}'`;
    } else if (req.params.type == "knowledge") {
        query = `UPDATE \`${req.params.type}\` SET 
        \`name\`='${encodeURIComponent(req.body.name)}',
        \`percentage\`='${req.body.percentage}'
        WHERE id='${encodeURIComponent(req.params.selector)}'`;
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

module.exports = router;
