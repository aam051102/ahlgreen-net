import React from "react";
import FormElement from "./FormElement";
import ReactDOM from "react-dom";

const Form = (props) => {
    return (
        <form>
            {props.children}

            <FormElement
                type="button"
                label="Send"
                onClick={(e) => {
                    e.preventDefault();
                    e.target.setAttribute("disabled", "");

                    let valid = true;
                    let data = {};

                    props.children.forEach((child) => {
                        const childDOM = document.querySelector(
                            "#" + child.props.id
                        );

                        const childValid = child.props.pattern
                            ? child.props.pattern.test(childDOM.value)
                            : childDOM.value != "";

                        childDOM.classList.remove("error");

                        if (!childValid) {
                            if (
                                childDOM.getAttribute("required") != undefined
                            ) {
                                childDOM.classList.add("error");
                                valid = false;
                            }
                        }
                    });

                    if (valid) {
                        props.children.forEach((child) => {
                            const childDOM = document.querySelector(
                                "#" + child.props.id
                            );

                            data[child.props.id] = childDOM.value;
                            childDOM.value = "";
                        });

                        props.onValid(data);
                    }

                    e.target.removeAttribute("disabled");
                }}
            />
        </form>
    );
};

export default Form;
