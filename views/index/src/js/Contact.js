import React from "react";
import Form from "./Form";
import FormElement from "./FormElement";

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

                    <Form
                        onValid={(data) => {
                            fetch("/api/email", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            });

                            document
                                .querySelector(".contact-container")
                                .classList.add("visible");
                        }}
                    >
                        <FormElement
                            type="text"
                            id="email"
                            label="Email"
                            pattern={
                                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                            }
                            required
                        />

                        <FormElement
                            type="text"
                            id="subject"
                            label="Subject"
                            required
                        />

                        <FormElement
                            type="textarea"
                            id="message"
                            label="Message"
                            required
                        />
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
