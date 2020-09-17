import React from "react";
import Layout from "./Layout";

import "../css/error404.scss";
import { Link } from "@reach/router";

const Error404 = (props) => {
    return (
        <Layout title="Error 404" slug={`/404`} description="" keywords={[]}>
            <div className="error404-page-container">
                <h1>404</h1>
                <h2>The file you were looking for could not be found.</h2>
                <Link className="link" to="/">
                    Would you like to go back home?
                </Link>
            </div>
        </Layout>
    );
};

export default Error404;
