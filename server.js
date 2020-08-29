#!/usr/bin/env nodejs
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MySQLStore = require("express-mysql-session")(session);
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
app.set("trust proxy", 1);


let { sessionStore } = require("./database");

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

// Set static folder
app.use(express.static(path.join(__dirname, "build")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));
app.get("/404", (req, res) => {
    res.status(404).end("Error: 404.");
});

// Clear session store
sessionStore.clear((err) => {
    if (err) console.error(err);
    console.log("Cleared session storage.");
});

// Listen on port
if (process.env.NODE_ENV == "production") {
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
} else {
    http.createServer(app).listen(process.env.PORT, () => {
        console.log(`App listening on PORT ${process.env.PORT}`);
    });
}
