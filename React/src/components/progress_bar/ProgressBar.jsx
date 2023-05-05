import { React } from "react";
import "./ProgressBar.css"

export default function ProgressBar({ width = "25rem", value }) {
    let isIndefinite = (typeof value !== "number") || value < 0 || value > 100;

    return (
        <div
            className={`progress-bar ${(isIndefinite) ? "progress-bar-indefinite" : ""}`}
            style={{
                '--filled-width': `${Math.floor(value * 100)}%`,
                "width": width
            }}
        >
        </div>
    )
}
