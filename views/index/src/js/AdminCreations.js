import React, { useState, useLayoutEffect } from "react";

import AdminLayout from "./AdminLayout";
import ValidateAdmin from "./ValidateAdmin";
import Popup from "./Popup";
import Form from "./Form";
import FormElement from "./FormElement";

import "../css/adminCreations.scss";

const AdminCreations = () => {
    // States
    const [creations, setCreations] = useState([]);
    const [popupMessage, setPopupMessage] = useState({
        visible: false,
        title: "",
        type: "",
        parameters: "",
    });

    // Fetch API data
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

    // Reset popup message
    const resetPopupMessage = () => {
        setPopupMessage({
            visible: false,
            title: "",
            type: "",
            parameters: "",
        });
    };

    // Click handlers
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

    // Layout
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
                                <Form
                                    onValid={() => {
                                        fetch(
                                            "/api/delete/creations/" +
                                                popupMessage.parameters,
                                            {
                                                method: "POST",
                                            }
                                        )
                                            .then((response) => response.json())
                                            .then((data) => {
                                                fetchCreations();
                                            });

                                        resetPopupMessage();
                                    }}
                                    onCancel={() => {
                                        resetPopupMessage();
                                    }}
                                    submitLabel="Yes"
                                    cancelLabel="No"
                                >
                                    <p>
                                        Are you sure you want to delete this
                                        element?
                                    </p>
                                </Form>
                            </div>
                        );
                    } else if (popupMessage.type == "edit") {
                        return (
                            <div>
                                <Form
                                    onValid={(data) => {
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
                                                body: JSON.stringify(data),
                                            }
                                        )
                                            .then((response) => response.json())
                                            .then((data) => {
                                                fetchCreations();
                                            });

                                        resetPopupMessage();
                                    }}
                                    onCancel={() => {
                                        resetPopupMessage();
                                    }}
                                    submitLabel="Save"
                                >
                                    <FormElement
                                        type="text"
                                        id="name"
                                        label="Name"
                                        default={decodeURIComponent(
                                            popupMessage.parameters.name
                                        )}
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="url_slug"
                                        label="Slug"
                                        default={decodeURIComponent(
                                            popupMessage.parameters.url_slug
                                        )}
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="image_url"
                                        label="Image URL"
                                        default={decodeURIComponent(
                                            popupMessage.parameters.image_url
                                        )}
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="url"
                                        label="URL"
                                        default={decodeURIComponent(
                                            popupMessage.parameters.url
                                        )}
                                        required
                                    />
                                    <FormElement
                                        type="textarea"
                                        id="description"
                                        label="Description"
                                        default={decodeURIComponent(
                                            popupMessage.parameters.description
                                        )}
                                        required
                                    />
                                </Form>
                            </div>
                        );
                    } else if (popupMessage.type == "add") {
                        return (
                            <div>
                                <Form
                                    onValid={(data) => {
                                        fetch("/api/insert/creations", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(data),
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                fetchCreations();
                                            });

                                        resetPopupMessage();
                                    }}
                                    onCancel={() => {
                                        resetPopupMessage();
                                    }}
                                    submitLabel="Add"
                                >
                                    <FormElement
                                        type="text"
                                        id="name"
                                        label="Name"
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="url_slug"
                                        label="Slug"
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="image_url"
                                        label="Image URL"
                                        required
                                    />
                                    <FormElement
                                        type="text"
                                        id="url"
                                        label="URL"
                                        required
                                    />
                                    <FormElement
                                        type="textarea"
                                        id="description"
                                        label="Description"
                                        required
                                    />
                                </Form>
                            </div>
                        );
                    }
                })()}
            </Popup>
        </AdminLayout>
    );
};

export default AdminCreations;
