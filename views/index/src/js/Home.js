import React, { useState, useLayoutEffect } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faHackerrank } from "@fortawesome/free-brands-svg-icons";

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
    }, []);

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
                        challenges my way.
                    </p>
                    <p>
                        Expected to graduate as a web developer from Roskilde
                        Tekniske Skole (Roskilde Technical College) in Denmark
                        during late 2020.
                    </p>

                    <section className="skills">
                        <h2>Skillset</h2>

                        <div className="progress-bars">
                            {knowledge
                                .sort(
                                    (a, b) =>
                                        parseInt(b.percentage) -
                                        parseInt(a.percentage)
                                )
                                .map((element, i) => {
                                    return (
                                        <div
                                            className="skillset-button button-link"
                                            key={i}
                                        >
                                            <span className="skillset-name">
                                                {decodeURIComponent(
                                                    element.name
                                                )}
                                            </span>
                                            <span className="skillset-years">
                                                {element.experience}{" "}
                                                {element.experience == 1
                                                    ? "year"
                                                    : "years"}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    <section className="socials">
                        <a
                            href="https://github.com/aam051102"
                            target="_blank"
                            alt="GitHub"
                            title="GitHub"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a
                            href="https://www.hackerrank.com/ahlgreenmadsen"
                            target="_blank"
                            alt="HackerRank"
                            title="HackerRank"
                        >
                            <FontAwesomeIcon icon={faHackerrank} />
                        </a>
                    </section>
                </ImageSide>
            </div>
        </Layout>
    );
};

export default Home;
