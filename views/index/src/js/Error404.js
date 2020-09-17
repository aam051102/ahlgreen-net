import React from "react";
import Layout from "./Layout";

import "../css/error404.scss";

const Error404 = (props) => {
    return (
        <Layout
            title="Error 404"
            slug={`/404/${props.file}`}
            description=""
            keywords={[]}
        >
            <div className="error404-page-container">
                <h1>404</h1>
                <h2>
                    <a
                        className="link"
                        href={`/${decodeURIComponent(props.file)}`}
                    >
                        https://ahlgreen.net/
                        {decodeURIComponent(props.file)}
                    </a>{" "}
                    could not be found.
                </h2>
            </div>
        </Layout>
    );
};

export default Error404;
