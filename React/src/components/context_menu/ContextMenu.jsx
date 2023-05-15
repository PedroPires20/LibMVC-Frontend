import { React, useEffect, useRef } from "react";
import editIcon from "./assets/edit_icon.svg";
import eraseIcon from "./assets/delete_icon.svg"
import finalizeIcon from "./assets/check_icon.svg";
import "./ContextMenu.css";


export default function ContextMenu({
    position,
    loanVariant,
    onMenuClick,
    onMenuClose
}) {
    let contextMenuRef = useRef(null);

    useEffect(() => {
        const checkClickOutsideMenu = (e) => {
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
                onMenuClose && onMenuClose();
            }
        };

        document.addEventListener("click", checkClickOutsideMenu);

        return () => {
            document.removeEventListener("click", checkClickOutsideMenu);
        }
    }, []);

    return (
        <div
            className="context-menu-container"
            style={{
                top: position && position.y,
                left: position && position.x
            }}
            tabIndex={0}
            ref={contextMenuRef}
        >
            <div className="context-menu-option">
                <div className="context-menu-button-container">
                    <button
                        onClick={() => {
                            onMenuClick && onMenuClick(0);
                        }}
                        className="click-ripple-effect"
                    >
                        <img src={editIcon} alt="editar"/>
                    </button>
                </div>
                <label>Editar</label>
            </div>
            <div className="context-menu-option">
                <div className="context-menu-button-container">
                    <button
                        onClick={() => {
                            onMenuClick && onMenuClick(1);
                        }}
                        className="click-ripple-effect"
                    >
                        <img src={(loanVariant) ? finalizeIcon : eraseIcon} alt={(loanVariant) ? "editar" : "apagar"}/>
                    </button>
                </div>
                <label>{(loanVariant) ? "Finalizar" : "Apagar"}</label>
            </div>
        </div>
    )
}
