import React, { useState } from "react";
import { Link } from "@reach/router";

const Header = () => {
    const [menuUp, setMenuUp] = useState(true);

    const handleClick = (e) => {
        if (document.body.clientWidth < 600) {
            if (
                e.target.tagName == "A" ||
                e.target.className == "header-main"
            ) {
                setMenuUp(!menuUp);

                document.querySelector("header").style = !menuUp
                    ? "transform: translateY(calc(-100% + 4rem))"
                    : "transform: none";
            }
        }
    };

    return (
        <header onClick={handleClick}>
            <div className="header-main">
                <span className="header-title">
                    <Link to="/">Alexander Ahlgreen Madsen</Link>
                </span>
                <span className="swipe-down-text">Tap For Menu</span>
            </div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;
