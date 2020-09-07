import React from "react";

import Layout from "./Layout";

const Contact = () => {
    return (
        <Layout title="Contact" slug="contact" description="" keywords={[]}>
            <div className="contact-page-container">
                <h1>Contact</h1>
                <div className="contact-container">
                    <address>
                        <a
                            className="email-link"
                            target="_blank"
                            href="mailto:ahlgreenmadsen@gmail.com"
                        >
                            ahlgreenmadsen@gmail.com
                        </a>
                    </address>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
