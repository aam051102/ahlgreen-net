import React, { useState } from "react";

const ImageLink = (props) => {
    return props.image_href ? (
        <a
            href={props.image_href}
            target="_blank"
            rel="noreferrer"
            className={props.isImageLoaded ? "loaded" : ""}
        >
            {props.children}
        </a>
    ) : (
        props.children
    );
};

const ImageSide = (props) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="image-side-container">
            <section className="image-wrapper">
                <ImageLink
                    isImageLoaded={isImageLoaded}
                    image_href={props.image_href}
                >
                    <img
                        src={props.image_src}
                        alt={props.name}
                        onLoad={() => {
                            setIsImageLoaded(true);
                        }}
                    />
                    <div className="image-loader"></div>
                </ImageLink>
            </section>
            <section className="info-wrapper">{props.children}</section>
        </div>
    );
};

export default ImageSide;
