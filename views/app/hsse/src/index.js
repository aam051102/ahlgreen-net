import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Router } from "@reach/router";

import "./index.scss";

import Home from "./js/Home";
import { HelmetProvider } from "react-helmet-async";
const Login = lazy(() => import("./js/Login"));
const Settings = lazy(() => import("./js/Settings"));

const STARTPOINT = window.location.hostname === "localhost" ? "" : "/app/hsse";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <HelmetProvider>
                <Router>
                    <Home path={`${STARTPOINT}/`} />
                    <Login path={`${STARTPOINT}/login`} />
                    <Settings path={`${STARTPOINT}/settings`} />
                </Router>
            </HelmetProvider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();