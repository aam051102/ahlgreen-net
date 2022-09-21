#!/usr/bin/env nodejs
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

// Token secret
process.env.TOKEN_SECRET = require("crypto").randomBytes(64).toString("hex");

// Server setup
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const http = require("http");
const https = require("https");

// Create server
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Cookie parser
app.use(cookieParser());

// CORS Middleware
app.use(cors());

// Express-Session
let { sessionStore, mongoClient } = require("./database");

if (process.env.NODE_ENV == "production") app.set("trust proxy", true);
app.use(
    session({
        cookie: {
            secure: process.env.NODE_ENV == "production",
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
        },
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        proxy: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// HSSE
app.get(["/app/hsse/login"], (req, res) => {
    if (req.originalUrl.endsWith("/")) {
        res.status(302).redirect(
            req.originalUrl.substr(0, req.originalUrl.length - 1)
        );
    } else {
        res.sendFile(path.join(__dirname, "views/app/hsse/build/index.html"));
    }
});

app.use(
    "/app/hsse",
    express.static(path.join(__dirname, "views/app/hsse/build"))
);

// Set static folders
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "views/index")));
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/api", require("./routes/api"));

// Clear session store
sessionStore.clear((err) => {
    if (err) console.error(err);
    console.log("Cleared session storage.");
});

process.on("exit", () => {
    mongoClient.close();
});

// Listen on port
/*if (process.env.NODE_ENV == "production") {
    https
        .createServer(
            {
                key: fs.readFileSync("sslcert/server.key", "utf-8"),
                cert: fs.readFileSync("sslcert/server.cert", "utf-8"),
            },
            app
        )
        .listen(process.env.PORT, () => {
            console.log(`App listening on PORT ${process.env.PORT}`);
        });
} else {*/
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`App listening on PORT ${process.env.PORT}`);
});
//}
