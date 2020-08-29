import React, { useState } from "react";
import { Link } from "@reach/router";

const Header = () => {
    const [menuUp, setMenuUp] = useState(true);

    const handleClick = (e) => {
        if (e.target.tagName == "A" || e.target.className == "header-main") {
            setMenuUp(!menuUp);

            document.querySelector("header").style = !menuUp
                ? "transform: translateY(calc(-100% + 56px))"
                : "transform: none";
        }
    };

    return (
        <header onClick={handleClick}>
            <div className="header-main">
                <span className="header-title">Ahlgreen.NET</span>
                <span className="swipe-down-text">Tap For Menu</span>
            </div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/creations">Creations</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;
