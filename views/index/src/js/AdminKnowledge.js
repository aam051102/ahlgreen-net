import React, { useState, useLayoutEffect } from "react";

import AdminLayout from "./AdminLayout";
import ValidateAdmin from "./ValidateAdmin";

import Popup from "./Popup";
import Form from "./Form";
import FormElement from "./FormElement";

import "../css/admin.scss";

const AdminKnowledge = () => {
    // States
    const [knowledge, setKnowledge] = useState([]);
    const [popupMessage, setPopupMessage] = useState({
        visible: false,
        title: "",
        type: "",
        parameters: "",
    });

    // Fetch API data
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

    // Layout
    return (
        <AdminLayout
            title="Admin / Knowledge"
            slug="admin/knowledge"
            description=""
            keywords={[]}
        >
            <ValidateAdmin>
                <div className="admin-dashboard-container">
                    <h1>Admin / Knowledge</h1>

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
                                <Form
                                    onValid={() => {
                                        fetch(
                                            "/api/delete/knowledge/" +
                                                popupMessage.parameters,
                                            {
                                                method: "POST",
                                            }
                                        )
                                            .then((response) => response.json())
                                            .then((data) => {
                                                fetchKnowledge();
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
                                            "/api/update/knowledge/" +
                                                popupMessage.parameters.id,
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
                                                fetchKnowledge();
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
                                        type="number"
                                        id="percentage"
                                        label="Percentage"
                                        min={0}
                                        max={100}
                                        default={
                                            popupMessage.parameters.percentage
                                        }
                                        required
                                    />
                                    <FormElement
                                        type="number"
                                        id="experience"
                                        label="Experience"
                                        min={1}
                                        default={
                                            popupMessage.parameters.experience
                                        }
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
                                        fetch("/api/insert/knowledge", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(data),
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                fetchKnowledge();
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
                                        required
                                    />
                                    <FormElement
                                        type="number"
                                        id="percentage"
                                        label="Percentage"
                                        min={0}
                                        max={100}
                                        default={1}
                                        required
                                    />
                                    <FormElement
                                        type="number"
                                        id="experience"
                                        label="Experience"
                                        min={1}
                                        default={1}
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

export default AdminKnowledge;
