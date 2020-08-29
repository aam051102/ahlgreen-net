import React from "react";

const ProgressBar = (props) => {
    return (
        <article className="progress-bar">
            <div
                className="progress-filler"
                style={{ width: props.percentage + "%" }}
            >
                {props.title}
            </div>
        </article>
    );
};

export default ProgressBar;
