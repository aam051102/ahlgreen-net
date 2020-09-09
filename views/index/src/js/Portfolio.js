import React, { useState, useLayoutEffect } from "react";
import CreationCard from "./CreationCard";

import Layout from "./Layout";

const Portfolio = () => {
    const [creations, setCreations] = useState([]);

    useLayoutEffect(() => {
        if (creations.length == 0) {
            fetch("/api/get/creations")
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    setCreations(json);
                });
        }
    });

    return (
        <Layout title="Portfolio" slug="portfolio" description="" keywords={[]}>
            <div className="creations-page-container">
                <h1>Portfolio</h1>
                <div className="creations">
                    {creations.length > 0 ? (
                        creations.map((creation, i) => {
                            return (
                                <CreationCard
                                    key={i}
                                    src={decodeURIComponent(creation.image_url)}
                                    url_slug={creation.url_slug}
                                >
                                    <p>{decodeURIComponent(creation.name)}</p>
                                </CreationCard>
                            );
                        })
                    ) : (
                        <p className="portfolio-loading">
                            Loading portfolio...
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Portfolio;
