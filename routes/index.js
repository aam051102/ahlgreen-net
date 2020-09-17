const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Routes
router.get(
    [
        "/",
        "/404/:file",
        "/index",
        "/portfolio/:url_slug",
        "/portfolio",
        "/contact",
        "/admin",
        "/admin/knowledge",
        "/admin/creations",
        "/admin/login",
        "/admin/logout",
    ],
    (req, res) => {
        res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
    }
);

// File access fallback
router.get("/:file", (req, res) => {
    const filePath = path.join(__dirname, "..", "dist", req.params.file);

    if (fs.existsSync(filePath)) {
        res.status(200).sendFile(filePath);
    } else {
        res.status(404).redirect(`/404/${encodeURIComponent(req.params.file)}`);
    }
});

module.exports = router;
