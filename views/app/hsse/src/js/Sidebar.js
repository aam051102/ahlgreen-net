import React, { useState } from "react";
import { MdChevronLeft, MdDelete } from "react-icons/md";

import "../css/Sidebar.scss";

const Sidebar = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <aside className={`sidebar${showSidebar ? " visible" : ""}`}>
                <div
                    className={`sidebar-controls ${
                        showSidebar ? "close" : "open"
                    }`}
                >
                    <button
                        className={`sidebar-button ${
                            showSidebar ? "close" : "open"
                        }`}
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                    >
                        <MdChevronLeft />
                        <h2>{props.title}</h2>
                    </button>

                    <button
                        className="sidebar-button"
                        onClick={props.clearSearch}
                    >
                        <MdDelete />
                    </button>
                </div>

                <div className="sidebar-inner">{props.children}</div>
            </aside>
        </>
    );
};

export default Sidebar;
