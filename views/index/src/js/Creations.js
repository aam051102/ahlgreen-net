import React, { useState, useLayoutEffect } from "react";
import CreationCard from "./CreationCard";

import Layout from "./Layout";

const Creations = () => {
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
        <Layout title="Creations" slug="creations" description="" keywords={[]}>
            <div className="creations-page-container">
                {creations.map((creation, i) => {
                    return (
                        <CreationCard
                            key={i}
                            src={decodeURIComponent(creation.image_url)}
                            url_slug={creation.url_slug}
                        >
                            <p>{decodeURIComponent(creation.name)}</p>
                        </CreationCard>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Creations;
