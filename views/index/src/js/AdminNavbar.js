import React from "react";

import { Link } from "@reach/router";

function AdminNavbar() {
    return (
        <aside className="admin-navbar">
            <h2 className="navbar-title">Admin</h2>
            <nav>
                <ul>
                    <li>
                        <ul>
                            <li>
                                <Link to="/admin">Dashboard</Link>
                            </li>

                            <li>
                                <Link to="/admin/creations">Creations</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <ul>
                            <li>
                                <a href="/api/logout">Log Out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default AdminNavbar;
