import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Location } from "@reach/router";
import Header from "./js/Header";

const Home = lazy(() => import("./js/Home"));
const Portfolio = lazy(() => import("./js/Portfolio"));
const PortfolioDetails = lazy(() => import("./js/PortfolioDetails"));
const Contact = lazy(() => import("./js/Contact"));

const AdminKnowledge = lazy(() => import("./js/AdminKnowledge"));
const AdminCreations = lazy(() => import("./js/AdminCreations"));
const AdminLogin = lazy(() => import("./js/AdminLogin"));

const Error404 = lazy(() => import("./js/Error404"));

import { HelmetProvider } from "react-helmet-async";

import "./css/app.scss";

class OnRouteChangeWorker extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.action();
        }
    }

    render() {
        return null;
    }
}

const OnRouteChange = ({ action }) => (
    <Location>
        {({ location }) => (
            <OnRouteChangeWorker location={location} action={action} />
        )}
    </Location>
);

const renderLoader = () => (
    <div
        style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        Loading
    </div>
);

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Loading failed! Please reload.
                </div>
            );
        }

        return this.props.children;
    }
}

class App extends React.Component {
    componentDidMount() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                document.body.classList.add("scrolled");
            } else {
                document.body.classList.remove("scrolled");
            }
        });
    }

    render() {
        return (
            <React.StrictMode>
                <HelmetProvider>
                    <Header />

                    <ErrorBoundary>
                        <Suspense fallback={renderLoader()}>
                            <Router>
                                <Home path="/" />
                                <PortfolioDetails path="/portfolio/:url_slug" />
                                <Portfolio path="/portfolio" />
                                <Contact path="/contact" />

                                <AdminKnowledge path="/admin" />
                                <AdminKnowledge path="/admin/knowledge" />
                                <AdminCreations path="/admin/creations" />
                                <AdminLogin path="/admin/login" />

                                <Error404 path="/404" />
                            </Router>
                        </Suspense>
                    </ErrorBoundary>

                    <OnRouteChange
                        action={() => {
                            window.scrollTo(0, 0);
                        }}
                    />
                </HelmetProvider>
            </React.StrictMode>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
