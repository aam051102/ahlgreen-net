import React from "react";

import Layout from "./Layout";
import { redirectTo, navigate } from "@reach/router";

const AdminLogin = () => {
    return (
        <Layout
            title="Admin Login"
            slug="admin/login"
            description=""
            keywords={[]}
        >
            <div className="admin-login-container">
                <div className="admin-login-alert"></div>

                <section>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                id="username"
                                type="text"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();

                                if (
                                    document.querySelector("#username").value !=
                                        "" &&
                                    document.querySelector("#password").valid !=
                                        ""
                                ) {
                                    fetch("/api/login", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            username: document.querySelector(
                                                "#username"
                                            ).value,
                                            password: document.querySelector(
                                                "#password"
                                            ).value,
                                        }),
                                    })
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((data) => {
                                            if (data.valid) {
                                                navigate("/admin");
                                                return;
                                            }

                                            if (
                                                data.error &&
                                                data.error != ""
                                            ) {
                                                document.querySelector(
                                                    ".admin-login-alert"
                                                ).innerText = data.error;
                                            }

                                            document.querySelector(
                                                "#username"
                                            ).value = "";
                                            document.querySelector(
                                                "#password"
                                            ).value = "";
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }
                            }}
                        >
                            <span>Login</span>
                        </button>
                    </form>
                </section>
            </div>
        </Layout>
    );
};

export default AdminLogin;
