import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";


export default function Menu({ visible, onPageChange }) {
    let [activePage, setActivePage] = useState("");
    let location = useLocation();
    
    useEffect(() => {
        setActivePage(location.pathname);
        onPageChange && onPageChange();
    }, [location.pathname]);

    return (
        <nav className={`side-menu-container side-menu-${(visible)? "visible": "hidden"}`}>
            <ul>
                <li
                    className={"side-menu-item " + ((activePage === "/collection") ? " side-menu-item-selected" : "")}
                >
                    <Link to="/collection">Acervo</Link>
                </li>
                <li
                    className={"side-menu-item " + ((activePage === "/loans") ? " side-menu-item-selected" : "")}
                >
                    <Link to="/loans">Empréstimos</Link>
                </li>
            </ul>
        </nav>
    )
}
