import React from "react";

import { Helmet } from "react-helmet-async";

import AdminNavbar from "./AdminNavbar";

function AdminLayout(props) {
    return (
        <div className="admin-layout">
            <div className="admin-content">
                <AdminNavbar />

                <main
                    className={`${
                        props.animate == undefined || props.animate
                            ? "animate"
                            : ""
                    }`}
                >
                    <Helmet>
                        <link
                            rel="canonical"
                            href={`https://ahlgreen.net/${props.slug}`}
                        />

                        {props.description ? (
                            <meta
                                name="description"
                                content={props.description}
                            />
                        ) : null}

                        {props.description ? (
                            <meta
                                name="og:description"
                                content={props.description}
                            />
                        ) : null}

                        <meta
                            name="keywords"
                            content={
                                "web,programmer,developer,css,html,javascript,js,madcreativity,mad,ahlgreen,python,c++,cpp,c#,csharp,node" +
                                (props.keywords && props.keywords.length > 0
                                    ? "," + props.keywords.join(",")
                                    : "")
                            }
                        />

                        <title>
                            Alexander Ahlgreen | Web Developer - {props.title}
                        </title>
                    </Helmet>

                    <div className="page-content">{props.children}</div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
