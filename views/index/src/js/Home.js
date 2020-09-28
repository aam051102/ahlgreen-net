import React, { useState, useLayoutEffect } from "react";

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
                    image_src={"https://ahlgreen.net/public/images/logo.jpg"}
                >
                    <h1>Alexander Ahlgreen Madsen</h1>
                    <p>
                        I'm a Danish full-stack web developer with experience in
                        React, Node and anything in between. I mainly specialize
                        in web development, but I also enjoy developing C++
                        applications. I've been writing code since I was 10
                        years old and I'm still going strong. I love to be
                        challenged, so feel free to send anything my way.
                    </p>
                    <p>
                        Expected to graduate as a web developer from Roskilde
                        Tekniske Skole (Roskilde Technical College) in Denmark
                        during late 2020.
                    </p>

                    <section className="skills">
                        <div className="skills-title">
                            <h2>Skillset</h2>
                            <p className="skills-subtitle">
                                (Hover over items to see more)
                            </p>
                            <p className="mobile skills-subtitle">
                                (Tap items)
                            </p>
                        </div>

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
                                            style={{
                                                animationDelay: `${i / 10}s`,
                                            }}
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
                            rel="noreferrer"
                        >
                            <svg
                                viewBox="0 0 32.6 31.8"
                                focusable="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8
	c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4
	c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7
	c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4
	c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5
	C32.6,7.3,25.3,0,16.3,0z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.hackerrank.com/ahlgreenmadsen"
                            target="_blank"
                            alt="HackerRank"
                            title="HackerRank"
                            rel="noreferrer"
                        >
                            <svg
                                viewBox="0 0 612 648"
                                focusable="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M580.529,165.226C562.556,134.278,341.907,6.45,305.981,6.45c-35.922,0-256.662,127.509-274.538,158.775
	c-17.877,31.271-17.972,286.291-0.003,317.557C49.415,514.047,270.077,641.55,305.981,641.55s256.584-127.664,274.544-158.771
	C598.484,451.67,598.498,196.174,580.529,165.226z M380.366,520.256c-4.916,0-50.74-44.372-47.136-47.993
	c1.081-1.082,7.77-1.842,21.77-2.273v-1.198c0-27.956,0.646-79.77,1.16-105.877c0.052-2.51-0.55-4.251-0.55-7.251
	c-33.316,0-65.843,0-99.146,0c0,12-0.211,24.915,0.044,37.634c0.332,16.795,0.814,35.986,1.651,52.764
	c0.28,5.635-1.956,7.396-7.124,7.374c-12.57-0.035-25.148-0.139-37.726-0.104c-5.085,0.015-7.277-1.893-7.121-7.573
	c0.955-34.525,1.963-71.89,1.926-106.424C208.075,298.029,207,223.256,206,181.951v-3.929c-12-0.433-20.324-1.194-21.411-2.287
	c-3.622-3.618,42.846-47.989,47.742-47.989c4.906,0,51.073,44.382,47.47,47.989c-1.083,1.084-9.801,1.844-20.801,2.278v3.925
	c-3,31.937-2.52,98.725-3.262,130.725c33.72,0,66.259,0,99.555,0c0-13,0.163-25.011-0.031-37.038
	c-0.341-21.233-0.771-45.488-1.46-66.717c-0.13-4.205,1.176-6.413,5.224-6.447c13.734-0.096,27.477-0.157,41.217-0.069
	c4.297,0.021,5.674,2.136,5.58,6.679c-0.908,47.6-2.284,97.997-2.429,145.608C403.306,383.333,404,437.89,405,468.257v1.72
	c11,0.432,20.86,1.195,21.946,2.286C430.552,475.884,385.275,520.256,380.366,520.256z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ahlgreenmadsen/"
                            target="_blank"
                            alt="LinkedIn"
                            title="LinkedIn"
                            rel="noreferrer"
                        >
                            <svg
                                viewBox="0 0 128.5 129.6"
                                focusable="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="currentColor"
                                    d="M128.5,64.3c0,18.2,0,36.3,0,54.5c0,5.8-4,9.8-9.8,9.8c-36.3,0-72.6,0-109,0c-5.6,0-9.7-4-9.7-9.6
		C0,82.5,0,46,0,9.6C0,4.1,4.1,0,9.6,0C46.1,0,82.5,0,119,0c5.4,0,9.5,4.1,9.5,9.6C128.5,27.8,128.5,46.1,128.5,64.3z M109.4,109.4
		c0-0.4,0-0.7,0-1c0-10.8,0-21.7,0-32.5c0-4.4-0.2-8.8-1.2-13.1c-1.6-7.3-5.4-12.9-12.9-14.9c-2.9-0.8-6.1-1-9.1-1.1
		c-5.5-0.2-10.3,1.8-14.3,5.7c-1.3,1.2-2.3,2.7-3.6,4.3c0-2.9,0-5.6,0-8.4c-6.1,0-12.1,0-18.2,0c0,20.4,0,40.7,0,61
		c6.3,0,12.6,0,18.9,0c0-0.5,0-1,0-1.4c0-9.8,0-19.6,0-29.4c0-1.6,0.1-3.3,0.3-4.9c0.7-6.3,3.9-9.6,9.7-10.2c5.9-0.6,9.6,2,10.7,7.7
		c0.4,2.1,0.6,4.3,0.6,6.4c0.1,10.1,0,20.2,0,30.4c0,0.5,0,0.9,0,1.4C96.9,109.4,103.1,109.4,109.4,109.4z M19.1,109.3
		c6.3,0,12.6,0,18.9,0c0-20.4,0-40.7,0-61c-6.3,0-12.6,0-18.9,0C19.1,68.7,19.1,89,19.1,109.3z M28.6,39.8c6.1,0,11-5,11-11.1
		c0-6-5-10.9-11-10.9c-6.1,0-11,5-11,11.1C17.6,34.9,22.6,39.8,28.6,39.8z"
                                />
                            </svg>
                        </a>
                    </section>
                </ImageSide>
            </div>
        </Layout>
    );
};

export default Home;
