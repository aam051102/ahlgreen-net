const express = require("express");
const router = express.Router();
const path = require("path");

// Routes
router.get(
    [
        "/",
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
    res.sendFile(path.join(__dirname, "..", "dist", req.params.file));
});

module.exports = router;
