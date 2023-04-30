#!/usr/bin/env nodejs
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

// Token secret
process.env.TOKEN_SECRET = require("crypto").randomBytes(64).toString("hex");

// Server setup
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const request = require("request");
const dayjs = require("dayjs");
const fs = require("fs");

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
let { mongoClient } = require("./database");

if (process.env.NODE_ENV == "production") app.set("trust proxy", true);

// HSSE
app.get(["/app/hsse/tags"], (req, res) => {
    if (req.originalUrl.endsWith("/")) {
        res.status(302).redirect(
            req.originalUrl.substr(0, req.originalUrl.length - 1)
        );
    } else {
        res.sendFile(path.join(__dirname, "views/app/hsse/build/index.html"));
    }
});

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

// MUSE
var generateRandomString = function (length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const SELF_URL =
    process.env.NODE_ENV === "production"
        ? "https://ahlgreen.net"
        : "http://localhost:4000";

app.get("/app/muse/auth/login", (req, res) => {
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";

    const authQueryParameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: `${SELF_URL}/app/muse/auth/callback`,
        state: state,
    });

    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            authQueryParameters.toString()
    );
});

app.get("/app/muse/auth/callback", (req, res) => {
    const code = req.query.code;

    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: `${SELF_URL}/app/muse/auth/callback`,
            grant_type: "authorization_code",
        },
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    spotify_client_id + ":" + spotify_client_secret
                ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const accessToken = body.access_token;
            const refreshToken = body.refresh_token;
            const expiry = body.expires_in; // Expiry is in seconds
            res.redirect(
                `/app/muse/search?token=${accessToken}&refreshToken=${refreshToken}&expiry=${dayjs()
                    .add(expiry, "seconds")
                    .toISOString()}`
            );
        }
    });
});

app.get("/app/muse/auth/refresh_token", function (req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    spotify_client_id + ":" + spotify_client_secret
                ).toString("base64"),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const expiry = body.expires_in; // Expiry is in seconds
            res.json({
                token: access_token,
                expiry: dayjs().add(expiry, "seconds").toISOString(),
            });
        }
    });
});

app.use(["/app/muse", "/app/muse/*"], (req, res) => {
    if (req.path.lastIndexOf(".") === -1) {
        res.sendFile(path.join(__dirname, "views/app/muse/build/index.html"));
    } else {
        res.sendFile(path.join(__dirname, "views/app/muse/build", req.path));
    }
});

// Set static folders
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/articles", (req, res) => {
    const p = path.join(__dirname, "views/articles/build", req.path + ".html");

    if (fs.existsSync(p)) {
        res.sendFile(
            path.join(__dirname, "views/articles/build", req.path + ".html")
        );
    } else {
        res.sendFile(path.join(__dirname, "views/articles/build", req.path));
    }
});
app.use("/", express.static(path.join(__dirname, "views/index")));
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.use("/api", require("./routes/api"));
app.use("/joyfulldreams", require("./routes/joyfulldreams/index"));

process.on("exit", () => {
    mongoClient.close();
});

// Listen on port
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`App listening on PORT ${process.env.PORT}`);
});
