import { React } from "react";
import Menu from "../menu/Menu";
import menuIcon from "./assets/menu_icon.svg";
import "./Header.css";

export default function Header() {
    return (
        <>
            <header className="header-container">
                <button className="header-menu-button click-ripple-effect">
                    <img src={menuIcon} alt="menu"/>
                </button>
                <h1>LibMVC</h1>
            </header>
            <Menu/>
        </>
    )
}
