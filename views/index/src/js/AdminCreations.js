import React, { useState, useLayoutEffect } from "react";

import AdminLayout from "./AdminLayout";
import ValidateAdmin from "./ValidateAdmin";
import Popup from "./Popup";

const AdminCreations = () => {
    const [creations, setCreations] = useState([]);
    const [popupMessage, setPopupMessage] = useState({
        visible: false,
        title: "",
        type: "",
        parameters: "",
    });

    useLayoutEffect(() => {
        if (creations.length == 0) {
            fetchCreations();
        }
    });

    const fetchCreations = () => {
        fetch("/api/get/creations")
            .then((response) => response.json())
            .then((data) => {
                setCreations(data);
            });
    };

    const resetPopupMessage = () => {
        setPopupMessage({
            visible: false,
            title: "",
            type: "",
            parameters: "",
        });
    };

    const handleAddCreationBtnClick = (e) => {
        setPopupMessage({
            visible: true,
            title: "Add Creation",
            type: "add",
        });
    };

    const handleDeleteBtnClick = (e, url_slug) => {
        setPopupMessage({
            visible: true,
            title: "Delete Creation",
            type: "delete",
            parameters: url_slug,
        });
    };

    const handleEditBtnClick = (e, creation) => {
        setPopupMessage({
            visible: true,
            title: "Edit Creation",
            type: "edit",
            parameters: creation,
        });
    };

    return (
        <AdminLayout
            title="Admin / Creations"
            slug="admin/creations"
            description=""
            keywords={[]}
        >
            <ValidateAdmin>
                <div className="admin-creations-container">
                    <h1>Admin / Creations</h1>

                    <section className="creations-container">
                        {creations.length > 0
                            ? creations.map((creation, i) => {
                                  return (
                                      <div key={i} className="creation-card">
                                          <div className="info-container">
                                              <div className="creation-card-icon">
                                                  <img
                                                      src={decodeURIComponent(
                                                          creation.image_url
                                                      )}
                                                  />
                                              </div>
                                              <p>
                                                  {decodeURIComponent(
                                                      creation.name
                                                  )}
                                              </p>
                                          </div>

                                          <div className="function-container">
                                              <button
                                                  onClick={(e) => {
                                                      handleEditBtnClick(
                                                          e,
                                                          creation
                                                      );
                                                  }}
                                                  className="edit-button"
                                              >
                                                  Edit
                                              </button>
                                              <button
                                                  onClick={(e) => {
                                                      handleDeleteBtnClick(
                                                          e,
                                                          creation.url_slug
                                                      );
                                                  }}
                                                  className="delete-button"
                                              >
                                                  Delete
                                              </button>
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
                    </section>

                    <button
                        onClick={handleAddCreationBtnClick}
                        className="add-creation-button"
                    >
                        Add Creation
                    </button>
                </div>
            </ValidateAdmin>

            <Popup visible={popupMessage.visible} title={popupMessage.title}>
                {(() => {
                    if (popupMessage.type == "delete") {
                        return (
                            <div>
                                <p>
                                    Are you sure you want to delete this
                                    element?
                                </p>

                                <div className="button-container">
                                    <button
                                        onClick={() => {
                                            fetch(
                                                "/api/delete/creations/" +
                                                    popupMessage.parameters,
                                                {
                                                    method: "POST",
                                                }
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    fetchCreations();
                                                });

                                            resetPopupMessage();
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => {
                                            resetPopupMessage();
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        );
                    } else if (popupMessage.type == "edit") {
                        return (
                            <div>
                                <div className="input-wrapper">
                                    <label htmlFor="creation-name">Name</label>
                                    <input
                                        type="text"
                                        id="creation-name"
                                        name="creation-name"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.name
                                        )}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-slug">Slug</label>
                                    <input
                                        type="text"
                                        id="creation-slug"
                                        name="creation-slug"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.url_slug
                                        )}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-url">URL</label>
                                    <input
                                        type="text"
                                        id="creation-url"
                                        name="creation-url"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.url
                                        )}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-image-url">
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="creation-image-url"
                                        name="creation-image-url"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.image_url
                                        )}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-description">
                                        Description
                                    </label>
                                    <textarea
                                        rows="4"
                                        id="creation-description"
                                        name="creation-description"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.description
                                        )}
                                    ></textarea>
                                </div>

                                <div className="button-container">
                                    <button
                                        onClick={() => {
                                            fetch(
                                                "/api/update/creations/" +
                                                    popupMessage.parameters
                                                        .url_slug,
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        name: document.querySelector(
                                                            "#creation-name"
                                                        ).value,
                                                        url_slug: document.querySelector(
                                                            "#creation-slug"
                                                        ).value,
                                                        image_url: document.querySelector(
                                                            "#creation-image-url"
                                                        ).value,
                                                        url: document.querySelector(
                                                            "#creation-url"
                                                        ).value,
                                                        description: document.querySelector(
                                                            "#creation-description"
                                                        ).value,
                                                    }),
                                                }
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    console.log(data);
                                                    fetchCreations();
                                                });

                                            resetPopupMessage();
                                        }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            resetPopupMessage();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        );
                    } else if (popupMessage.type == "add") {
                        return (
                            <div>
                                <div className="input-wrapper">
                                    <label htmlFor="creation-name">Name</label>
                                    <input
                                        type="text"
                                        id="creation-name"
                                        name="creation-name"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-slug">Slug</label>
                                    <input
                                        type="text"
                                        id="creation-slug"
                                        name="creation-slug"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-url">URL</label>
                                    <input
                                        type="text"
                                        id="creation-url"
                                        name="creation-url"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-image-url">
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="creation-image-url"
                                        name="creation-image-url"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="creation-description">
                                        Description
                                    </label>
                                    <textarea
                                        rows="4"
                                        id="creation-description"
                                        name="creation-description"
                                    ></textarea>
                                </div>

                                <div className="button-container">
                                    <button
                                        onClick={() => {
                                            fetch("/api/insert/creations", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    name: document.querySelector(
                                                        "#creation-name"
                                                    ).value,
                                                    url_slug: document.querySelector(
                                                        "#creation-slug"
                                                    ).value,
                                                    image_url: document.querySelector(
                                                        "#creation-image-url"
                                                    ).value,
                                                    url: document.querySelector(
                                                        "#creation-url"
                                                    ).value,
                                                    description: document.querySelector(
                                                        "#creation-description"
                                                    ).value,
                                                }),
                                            })
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    console.log(data);
                                                    fetchCreations();
                                                });

                                            resetPopupMessage();
                                        }}
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => {
                                            resetPopupMessage();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        );
                    }
                })()}
            </Popup>
        </AdminLayout>
    );
};

export default AdminCreations;
