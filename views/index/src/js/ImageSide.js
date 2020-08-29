import React from "react";

const ImageSide = (props) => {
    return (
        <div className="image-side-container">
            <section className="image-wrapper">
                {props.image_href ? (
                    <a href={props.image_href}>
                        <img src={props.image_src} alt={props.name} />
                    </a>
                ) : (
                    <img src={props.image_src} alt={props.name} />
                )}
            </section>
            <section className="info-wrapper">{props.children}</section>
        </div>
    );
};

export default ImageSide;
