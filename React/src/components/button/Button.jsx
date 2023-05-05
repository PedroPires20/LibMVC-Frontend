import { React } from "react";
import "./Button.css";


export default function Button({ children, variant, onClick, disabled = false }) {
    variant = (/primary|secondary/.test(variant)) ? variant : "primary";

    return (
        <button
            className={`material-button material-button-${variant}`}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    )
}
