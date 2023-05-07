import { React, useState, useEffect, useRef } from "react";
import editIcon from "./assets/edit_icon.svg";
import eraseIcon from "./assets/delete_icon.svg"
import finalizeIcon from "./assets/check_icon.svg";
import "./ContextMenu.css";


export default function ContextMenu({
    children,
    loan,
    onMenuClick
}) {
    let [showMenu, setShowMenu] = useState(false);
    let [position, setPosition] = useState({ x: 0, y: 0 })
    let contextMenuRef = useRef(null);

    useEffect(() => {
        const checkClickOutsideMenu = (e) => {
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
                console.log("close");
                setShowMenu(false);
            }
            console.log("test");
        };

        document.addEventListener("click", checkClickOutsideMenu);

        return () => {
            document.removeEventListener("click", checkClickOutsideMenu);
        }
    }, []);

    return (
        <div
            onClick={(e) => {
                if(!showMenu) {
                    setPosition({ x: e.pageX, y: e.pageY });
                    setShowMenu(true);
                    e.stopPropagation();
                }
            }}
        >
            {children}
            <div
                className={`context-menu-container${(showMenu) ? " context-menu-container-open" : ""}`}
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
                                setShowMenu(false);
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
                                setShowMenu(false);
                                onMenuClick && onMenuClick(1);
                            }}
                            className="click-ripple-effect"
                        >
                            <img src={(loan) ? finalizeIcon : eraseIcon} alt={(loan) ? "editar" : "apagar"}/>
                        </button>
                    </div>
                    <label>{(loan) ? "Finalizar" : "Apagar"}</label>
                </div>
            </div>
        </div>
    )
}
