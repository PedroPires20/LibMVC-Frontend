import { React, useState } from "react";
import clearIcon from "./assets/cancel_icon.svg";
import "./TextArea.css";


export default function TextArea({
    name,
    label = "",
    supportingText = "",
    minLength,
    maxLength,
    required,
    defaultValue = "",
    errorMessage,
    value,
    onChange
}) {
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    return (
        <div
            className={`textarea-container${(isActive) ? " textarea-container-active" : ""}${(!!error) ? " textarea-container-error" : ""}`}
        >
            <label>{label}</label>
            <div className={`textarea-control${(!!error) ? " textarea-control-error" : ""}`}>
                <textarea
                    name={name}
                    value={value}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    onChange={(e) => onChange(e.target.name, e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={(e) => {
                        setError(e.target.validationMessage);
                        setIsActive(false);
                    }}
                    onInvalid={(e) => setError(e.target.validationMessage)}
                />
                <button
                    onClick={(e) => {
                        onChange(name, defaultValue);
                        e.preventDefault();
                    }}
                >
                    <img src={clearIcon} alt="limpar"/>
                </button>
            </div>
            {(!!error) ? (
                <span className="textarea-error-message">{errorMessage || error}</span>
            ) : (
                supportingText && <span className="textarea-support">{supportingText}</span>
            )}
        </div>
    )
}
