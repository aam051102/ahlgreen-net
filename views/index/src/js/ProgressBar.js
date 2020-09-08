import React from "react";

const ProgressBar = (props) => {
    return (
        <article className="progress-bar">
            <div
                className="progress-filler-wrapper"
                style={{ width: props.percentage + "%" }}
            >
                <div className="progress-filler">{props.title}</div>
            </div>
        </article>
    );
};

export default ProgressBar;
