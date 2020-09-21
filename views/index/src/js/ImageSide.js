import React, { useState } from "react";

const ImageSide = (props) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="image-side-container">
            <section className="image-wrapper">
                <a
                    href={props.image_href}
                    target="_blank"
                    className={isImageLoaded ? "loaded" : ""}
                >
                    <img
                        src={props.image_src}
                        alt={props.name}
                        onLoad={() => {
                            setIsImageLoaded(true);
                        }}
                    />
                    <div className="image-loader"></div>
                </a>
            </section>
            <section className="info-wrapper">{props.children}</section>
        </div>
    );
};

export default ImageSide;
