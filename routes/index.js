const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Routes
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views/index/dist", "index.html"));
});

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views/index/dist", "admin"));
});

// File access fallback
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
