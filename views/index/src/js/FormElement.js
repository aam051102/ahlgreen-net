import React from "react";

const FormElement = (props) => {
    return (
        <>
            {(() => {
                if (props.type == "text") {
                    return (
                        <div
                            className={`input-wrapper ${
                                props.required ? "required-input" : ""
                            }`}
                        >
                            <label htmlFor={props.id}>{props.label}</label>
                            <input
                                name={props.id}
                                id={props.id}
                                className="input-element"
                                type="text"
                                defaultValue={props.default}
                                pattern={props.pattern}
                                required={props.required}
                            />
                        </div>
                    );
                } else if (props.type == "number") {
                    return (
                        <div
                            className={`input-wrapper ${
                                props.required ? "required-input" : ""
                            }`}
                        >
                            <label htmlFor={props.id}>{props.label}</label>
                            <input
                                name={props.id}
                                id={props.id}
                                className="input-element"
                                type="number"
                                min={props.min}
                                max={props.max}
                                defaultValue={props.default}
                                required={props.required}
                            />
                        </div>
                    );
                } else if (props.type == "textarea") {
                    return (
                        <div
                            className={`input-wrapper ${
                                props.required ? "required-input" : ""
                            }`}
                        >
                            <label htmlFor={props.id}>{props.label}</label>
                            <textarea
                                name={props.id}
                                id={props.id}
                                className="input-element"
                                defaultValue={props.default}
                                pattern={props.pattern}
                                required={props.required}
                            ></textarea>
                        </div>
                    );
                } else if (props.type == "button") {
                    return (
                        <button onClick={props.onClick}>{props.label}</button>
                    );
                }
            })()}
        </>
    );
};

export default FormElement;
