import React from "react";
import { MdCancel, MdEdit, MdSave } from "react-icons/md";

import { setDialog, useIsEditMode, useIsSignedIn } from "../globalState";
import useEventListener from "../useEventListener";

import "../../css/Controls.scss";
import { saveData } from "../utility";

const Controls = () => {
    // Variables
    let editsMade = false;

    // States
    const [isEditMode, setIsEditMode, ] = useIsEditMode();
    const [isSignedIn, ] = useIsSignedIn();

    // Functions
    function exitEditMode(callback) {
        if (!callback) callback = () => {};

        if (isEditMode && editsMade/*&& resultTags !== result.tags*/) {
            setDialog({
                visible: true,
                title: "Warning",
                content: "Performing this action will disable edit mode. Would you like to save?",
                buttons: [
                    {
                        title: "Save",
                        callbacks: [saveData, callback, ],
                    },
                    {
                        title: "Don't Save",
                        callbacks: [callback, ],
                    },
                    { title: "Cancel", }, 
                ],
            });
        } else {
            callback();
            setIsEditMode(false);
        }
    }

    // Event listeners
    useEventListener(
        "keydown",
        (e) => {
            if (e.target.tagName !== "INPUT") {
                if (e.key === "e" && isSignedIn) {
                    // Shortcut for edit mode
                    if (isEditMode) {
                        exitEditMode();
                    } else {
                        setIsEditMode(true);
                    }
                }
            }
        });

    return (
        <>
            {isSignedIn ? (
                <>
                    <button
                        className="control-btn control-edit"
                        onClick={() => {
                            if (isEditMode) {
                                exitEditMode();
                            } else {
                                setIsEditMode(true);
                            }
                        }}
                        aria-label="Edit tags"
                        title="Toggle Edit Mode"
                    >
                        {
                            isEditMode ? 
                                <MdCancel /> :
                                <MdEdit />
                        }
                    </button>

                    {
                        isEditMode ? (
                            <button
                                className="control-btn control-save"
                                onClick={async () => {
                                    await saveData();
                                    exitEditMode();
                                }}
                                aria-label="Save edits"
                                title="Save"
                            >
                                <MdSave />
                            </button>
                        ) : null
                    }
                </>
            ) : null}
        </>
    );
};

export default Controls;