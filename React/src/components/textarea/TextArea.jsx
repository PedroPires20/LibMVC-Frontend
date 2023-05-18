import { React, useState } from "react";
import clearIcon from "./assets/cancel_icon.svg";
import "./TextArea.css";


export default function TextArea({
    label = "",
    supportingText = "",
    minLength,
    maxLength,
    required,
    defaultValue = "",
    error,
    errorMessage,
    value,
    onChange
}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            className={`textarea-container${(isActive) ? " textarea-container-active" : ""}${(error) ? " textarea-container-error" : ""}`}
        >
            <label>{label}</label>
            <div className={`textarea-control${(error) ? " textarea-control-error" : ""}`}>
                <textarea
                    value={value}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                />
                <button
                    onClick={(e) => {
                        onChange(defaultValue);
                        e.preventDefault();
                    }}
                >
                    <img src={clearIcon} alt="limpar"/>
                </button>
            </div>
            {(!error && supportingText) && <span className="textarea-support">{supportingText}</span>}
            {(error && errorMessage) && <span className="textarea-error-message">{errorMessage}</span>}
        </div>
    )
}
