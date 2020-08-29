import React from "react";
import { Link } from "@reach/router";

const CreationCard = (props) => {
    return (
        <article className="card">
            <Link to={`/creation/${props.url_slug}`}></Link>

            <section className="side-a">
                <img src={props.src} alt="" />
            </section>
            <section className="side-b">
                <div className="content">{props.children}</div>
            </section>
        </article>
    );
};

export default CreationCard;
