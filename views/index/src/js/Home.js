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
                    name="Alexander Ahlgreen"
                    image_src={require("../assets/images/logo.png")}
                >
                    <h1>Alexander Ahlgreen</h1>
                    <p>
                        I'm a Danish full-stack web developer with experience in
                        React, Node and anything in between. I mainly specialize
                        in web development, but I also enjoy developing C++
                        applications. I've been writing code since I was 10
                        years old and I'm still going strong. Feel free to send
                        any challenges my way.
                    </p>
                    <p>
                        Currently studying web development at Roskilde Tekniske
                        Skole in Denmark.
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
