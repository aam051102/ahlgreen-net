import React, { useState, useLayoutEffect } from "react";

import AdminLayout from "./AdminLayout";
import ValidateAdmin from "./ValidateAdmin";

import Popup from "./Popup";

const Admin = () => {
    const [knowledge, setKnowledge] = useState([]);
    const [popupMessage, setPopupMessage] = useState({
        visible: false,
        title: "",
        type: "",
        parameters: "",
    });

    useLayoutEffect(() => {
        if (knowledge.length == 0) {
            fetchKnowledge();
        }
    });

    const fetchKnowledge = () => {
        fetch("/api/get/knowledge")
            .then((response) => response.json())
            .then((data) => {
                setKnowledge(data);
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

    const handleAddKnowledgeBtnClick = (e) => {
        setPopupMessage({
            visible: true,
            title: "Add Knowledge",
            type: "add",
        });
    };

    const handleDeleteBtnClick = (e, selector) => {
        setPopupMessage({
            visible: true,
            title: "Delete Knowledge",
            type: "delete",
            parameters: selector,
        });
    };

    const handleEditBtnClick = (e, creation) => {
        setPopupMessage({
            visible: true,
            title: "Edit Knowledge",
            type: "edit",
            parameters: creation,
        });
    };

    return (
        <AdminLayout title="Admin" slug="admin" description="" keywords={[]}>
            <ValidateAdmin>
                <div className="admin-dashboard-container">
                    <h1>Admin / Dashboard</h1>

                    <section className="knowledge-container">
                        {knowledge.length > 0
                            ? knowledge.map((element, i) => {
                                  return (
                                      <div key={i} className="knowledge-card">
                                          <div className="info-container">
                                              <p>
                                                  {decodeURIComponent(
                                                      element.name
                                                  )}
                                              </p>
                                          </div>

                                          <div className="function-container">
                                              <button
                                                  onClick={(e) => {
                                                      handleEditBtnClick(
                                                          e,
                                                          element
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
                                                          element.id
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
                        onClick={handleAddKnowledgeBtnClick}
                        className="add-knowledge-button"
                    >
                        Add Knowledge
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
                                                "/api/delete/knowledge/" +
                                                    popupMessage.parameters,
                                                {
                                                    method: "POST",
                                                }
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    fetchKnowledge();
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
                                    <label htmlFor="knowledge-name">Name</label>
                                    <input
                                        type="text"
                                        id="knowledge-name"
                                        name="knowledge-name"
                                        defaultValue={decodeURIComponent(
                                            popupMessage.parameters.name
                                        )}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="knowledge-percentage">
                                        Percentage
                                    </label>
                                    <input
                                        type="number"
                                        id="knowledge-percentage"
                                        name="knowledge-percentage"
                                        min="1"
                                        max="100"
                                        defaultValue={
                                            popupMessage.parameters.percentage
                                        }
                                    />
                                </div>

                                <div className="button-container">
                                    <button
                                        onClick={() => {
                                            fetch(
                                                "/api/update/knowledge/" +
                                                    popupMessage.parameters.id,
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        name: document.querySelector(
                                                            "#knowledge-name"
                                                        ).value,
                                                        percentage: document.querySelector(
                                                            "#knowledge-percentage"
                                                        ).value,
                                                    }),
                                                }
                                            )
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    console.log(data);
                                                    fetchKnowledge();
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
                                    <label htmlFor="knowledge-name">Name</label>
                                    <input
                                        type="text"
                                        id="knowledge-name"
                                        name="knowledge-name"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label htmlFor="knowledge-percentage">
                                        Percentage
                                    </label>
                                    <input
                                        type="number"
                                        id="knowledge-percentage"
                                        name="knowledge-percentage"
                                        min="1"
                                        max="100"
                                    />
                                </div>

                                <div className="button-container">
                                    <button
                                        onClick={() => {
                                            fetch("/api/insert/knowledge", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    name: document.querySelector(
                                                        "#knowledge-name"
                                                    ).value,
                                                    percentage: document.querySelector(
                                                        "#knowledge-percentage"
                                                    ).value,
                                                }),
                                            })
                                                .then((response) =>
                                                    response.json()
                                                )
                                                .then((data) => {
                                                    console.log(data);
                                                    fetchKnowledge();
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

export default Admin;
