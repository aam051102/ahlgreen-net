import React, { useState } from "react";
import { Link } from "@reach/router";

const CreationCard = (props) => {
    const [loaded, useLoaded] = useState(false);

    return (
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
                <div className="content">{props.children}</div>
            </section>
        </article>
    );
};

export default CreationCard;
