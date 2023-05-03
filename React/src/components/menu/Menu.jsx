import { React } from "react";
import "./Menu.css";

const PAGE_NAMES = ["Acervo", "Empréstimos"]

export default function Menu({ activePage, onPageChange }) {
    return (
        <nav className="side-menu-container">
            <ul>
                {
                    PAGE_NAMES.map(
                        (pageName, index) => <li
                        key={index}
                        className={"side-menu-item" + ((activePage === pageName) ? " side-menu-item-selected" : "")}
                        onClick={() => onPageChange(pageName)}
                        >
                            {pageName}
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}
