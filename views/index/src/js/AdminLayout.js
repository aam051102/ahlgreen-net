import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Helmet } from "react-helmet-async";

import AdminNavbar from "./AdminNavbar";

function AdminLayout(props) {
    return (
        <div className="admin-layout">
            <Header />

            <div className="admin-content">
                <AdminNavbar />

                <main>
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

                        <title>Ahlgreen.NET / {props.title}</title>
                    </Helmet>

                    <div className="page-content">{props.children}</div>

                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
