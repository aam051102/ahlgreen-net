import { callbackPromise } from "nodemailer/lib/shared";
import React from "react";
import FormElement from "./FormElement";

const Form = (props) => {
    return (
        <form>
            {props.children}

            <FormElement
                type="button"
                label="Send"
                onClick={(e) => {
                    e.preventDefault();

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

                    // MAKE A BETTER FORM SYSTEM - PROBABLY IN COMPONENT FORM
                    /*
                    const emailDOM = document.querySelector("#email");
                    const subjectDOM = document.querySelector("#subject");
                    const messageDOM = document.querySelector("#message");

                    if (subjectDOM.value == "") {
                        subjectDOM.classList.add("error");
                        messageDOM.classList.remove("error");
                    } else if (messageDOM.value == "") {
                        subjectDOM.classList.remove("error");
                        messageDOM.classList.add("error");
                    } else {
                        fetch("/api/email", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: emailDOM.value,
                                subject: subjectDOM.value,
                                message: messageDOM.value,
                            }),
                        });

                        subjectDOM.classList.remove("error");
                        messageDOM.classList.remove("error");
                        subjectDOM.value = "";
                        messageDOM.value = "";
                        document
                            .querySelector(".contact-container")
                            .classList.add("visible");
                    }*/
                }}
            />
        </form>
    );
};

export default Form;
