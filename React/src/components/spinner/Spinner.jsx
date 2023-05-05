import { React } from "react";
import "./Spinner.css";


export default function Spinner({ diameter = "65px", color = "#7e5700" }) {
    return (
        <svg class="spinner" width={diameter} height={diameter} viewBox="0 0 66 66">
            <circle
                class="spinner-circle"
                fill="none"
                stroke={color}
                stroke-width="6"
                stroke-linecap="round"
                cx="33"
                cy="33"
                r="30"
            />
        </svg>
    )
}
