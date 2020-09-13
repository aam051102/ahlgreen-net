import { EPERM } from "constants";
import React from "react";

import Layout from "./Layout";

const Contact = () => {
    return (
        <Layout title="Contact" slug="contact" description="" keywords={[]}>
            <div className="contact-page-container">
                <h1>Contact</h1>
                <p>
                    If you want to contact me, please use the form below or send
                    me an email:{" "}
                    <a className="link" href="mailto:ahlgreenmadsen@gmail.com">
                        ahlgreenmadsen@gmail.com
                    </a>
                    .
                </p>

                <div className="contact-container">
                    <p className="sent-text">Message sent.</p>

                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="subject">Subject</label>
                            <input
                                name="subject"
                                id="subject"
                                type="text"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="message">Message</label>
                            <textarea required id="message"></textarea>
                        </div>

                        <div className="button-container">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();

                                    const subjectDOM = document.querySelector(
                                        "#subject"
                                    );
                                    const messageDOM = document.querySelector(
                                        "#message"
                                    );

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
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                subject: subjectDOM.value,
                                                text: messageDOM.value,
                                            }),
                                        });

                                        subjectDOM.classList.remove("error");
                                        messageDOM.classList.remove("error");
                                        subjectDOM.value = "";
                                        messageDOM.value = "";
                                        document
                                            .querySelector(".contact-container")
                                            .classList.add("visible");
                                    }
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
