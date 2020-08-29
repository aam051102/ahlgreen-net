import React, { useState, useLayoutEffect } from "react";
import ImageSide from "./ImageSide";
import Layout from "./Layout";

const CreationDetails = (props) => {
    const [creation, setCreation] = useState({ id: undefined });

    useLayoutEffect(() => {
        if (!creation.id && !creation.error) {
            fetch("/api/get/creations/" + props.url_slug)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    setCreation(json.error ? json : json[0]);
                });
        }
    });

    return (
        <Layout
            title={creation.name ? decodeURIComponent(creation.name) : ""}
            slug={`creation/${
                creation.url_slug ? decodeURIComponent(creation.url_slug) : ""
            }`}
            description={""}
            keywords={[]}
        >
            <div className="creation-details-container">
                <ImageSide
                    name={creation.id ? decodeURIComponent(creation.name) : ""}
                    image_src={
                        creation.id
                            ? decodeURIComponent(creation.image_url)
                            : ""
                    }
                    image_href={
                        creation.id ? decodeURIComponent(creation.url) : ""
                    }
                >
                    <h1>
                        <a
                            href={
                                creation.id
                                    ? decodeURIComponent(creation.url)
                                    : ""
                            }
                        >
                            {creation.id
                                ? decodeURIComponent(creation.name)
                                : ""}
                        </a>
                    </h1>
                    <p>
                        {creation.id
                            ? (() => {
                                  const lines = decodeURIComponent(
                                      creation.description
                                  );
                                  const charOutput = [];

                                  for (let i = 0; i < lines.length; i++) {
                                      if (lines[i] == "\n") {
                                          charOutput.push(<br key={i} />);
                                      } else {
                                          charOutput.push(lines[i]);
                                      }
                                  }

                                  return charOutput;
                              })()
                            : ""}
                    </p>
                </ImageSide>
            </div>
        </Layout>
    );
};

export default CreationDetails;
