import React from "react";

function Popup(props) {
    return (
        <article
            className="popup-container"
            style={{ display: props.visible ? "flex" : "none" }}
        >
            <section className="popup">
                <p className="popup-title">{props.title}</p>
                <section className="popup-content">{props.children}</section>
            </section>
        </article>
    );
}

export default Popup;
