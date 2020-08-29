import React, { useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import ProgressBar from "./ProgressBar";

import ImageSide from "./ImageSide";
import Layout from "./Layout";

const Home = () => {
    const [knowledge, setKnowledge] = useState([]);

    useLayoutEffect(() => {
        if (knowledge.length == 0) {
            fetch("/api/get/knowledge")
                .then((response) => response.json())
                .then((data) => {
                    setKnowledge(data);
                });
        }
    });

    return (
        <Layout title="Home" slug="" description="" keywords={[]}>
            <div className="home-container">
                <ImageSide
                    name="MadCreativity"
                    image_src={require("../assets/images/logo.png")}
                >
                    <h1>MadCreativity</h1>
                    <p>
                        I have been programming since 2013, starting at age 10.
                        Since then, I have mainly focused on web development and
                        desktop applications. I'm always interested in a
                        challenge.
                    </p>

                    <section className="skills">
                        <h2>Knowledge/Skillset</h2>

                        <div>
                            {knowledge
                                .sort(
                                    (a, b) =>
                                        parseInt(b.percentage) -
                                        parseInt(a.percentage)
                                )
                                .map((element, i) => {
                                    return (
                                        <ProgressBar
                                            key={i}
                                            title={decodeURIComponent(
                                                element.name
                                            )}
                                            percentage={element.percentage}
                                        />
                                    );
                                })}
                        </div>
                    </section>

                    <section className="socials">
                        <a
                            href="https://github.com/aam051102"
                            target="blank"
                            alt="GitHub"
                            title="GitHub"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </section>
                </ImageSide>
            </div>
        </Layout>
    );
};

export default Home;
