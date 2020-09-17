const {
    getDatabaseConnection,
    connectToDatabase,
    sessionStore,
} = require("../database");
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

let databaseConnection = getDatabaseConnection();

let transporter;
(async () => {
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
})();

// Credentials
const credentials = [
    {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
    },
];

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
// Admin login
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

// Admin logout
router.get("/logout", (req, res) => {
    req.session.adminKey = false;

    res.redirect("/admin/login");
});

// Admin validation
router.post("/validate", (req, res) => {
    if (req.session.adminKey) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
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

// Get single
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

// Delete single
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

// Insert
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
        }\` (\`name\`, \`percentage\`, \`experience\`) VALUES (
            '${encodeURIComponent(req.body.name)}',
            '${req.body.percentage}',
            '${req.body.experience}'
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

// Update
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
        \`percentage\`='${req.body.percentage}',
        \`experience\`='${req.body.experience}'
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
