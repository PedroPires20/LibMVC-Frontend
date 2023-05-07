import { React, useState } from "react";
import clearIcon from "./assets/cancel_icon.svg";
import "./TextInput.css";


export default function TextInput({
    label = "",
    supportingText = "",
    value,
    onChange
}) {
    let [isActive, setIsActive] = useState(false);

    return (
        <div className={`text-input-container${(isActive) ? " text-input-container-active" : ""}`}>
            <label className={(isActive || value) ? "text-input-small-label" : ""}>{label}</label>
            <div className="text-input-control">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                />
                <button>
                    <img src={clearIcon} alt="limpar"/>
                </button>
            </div>
            {supportingText && <span className="text-input-support">{supportingText}</span>}
        </div>
    )
}
