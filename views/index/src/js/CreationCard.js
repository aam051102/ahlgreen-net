import React, { useState } from "react";
import { Link } from "@reach/router";

const CreationCard = (props) => {
    const [loaded, useLoaded] = useState(false);

    return (
        <div className="card-wrapper">
            <article className={`card${loaded ? " loaded" : ""}`}>
                <Link to={`/portfolio/${props.url_slug}`}></Link>

                <section className="side-a">
                    <img
                        src={props.src}
                        alt={props.url_slug}
                        onLoad={() => {
                            useLoaded(true);
                        }}
                    />
                </section>
                <section className="side-b">
                    <div className="content">
                        {props.children}
                        <p className="read-more">Click to read more.</p>
                    </div>
                </section>
            </article>
            <article className="loading-card">
                <img
                    src={require("../assets/images/spinner.png")}
                    alt="Loading..."
                />
            </article>
        </div>
    );
};

export default CreationCard;
