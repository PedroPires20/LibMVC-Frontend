import { React } from "react";
import "./DialogBox.css";


export default function DialogBox({ children }) {
    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                {children}
            </div>
        </div>
    )
}
