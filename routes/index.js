const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Routes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views/index/dist", "index.html"));
});

router.get("/app/hsse", (req, res) => {
    if(req.originalUrl.endsWith("/")) {
        res.sendFile(
            path.join(__dirname, "..", "views/app/hsse/build", "index.html")
        );
    } else {
        res.set("location", "https://ahlgreen.net/app/hsse/");
        res.status(301).send();
    }
});

router.get("/admin", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "views/index/dist", "admin", "index.html")
    );
});

// File access fallback
router.get("/app/hsse/*", (req, res) => {
    const filePath = path.join(
        __dirname,
        "..",
        "views",
        req.originalUrl.replace("app/hsse", "app/hsse/build")
    );

    if (fs.existsSync(filePath)) {
        res.status(200).sendFile(filePath);
    } else {
        res.status(404).redirect(`/404`);
    }
});

router.get("/*", (req, res) => {
    const filePath = path.join(
        __dirname,
        "..",
        "views/index/dist",
        req.originalUrl
    );

    if (fs.existsSync(filePath)) {
        res.status(200).sendFile(filePath);
    } else {
        res.status(404).redirect(`/404`);
    }
});

module.exports = router;
