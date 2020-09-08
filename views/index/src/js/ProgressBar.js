import React from "react";

const ProgressBar = (props) => {
    return (
        <article className="progress-bar">
            <div
                className="progress-filler-wrapper"
                style={{ width: props.percentage + "%" }}
            >
                <span className="progress-title">{props.title}</span>
                <div className="progress-filler"></div>
            </div>
        </article>
    );
};

export default ProgressBar;
