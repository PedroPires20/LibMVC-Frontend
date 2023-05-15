import { React, useState } from "react";
import clearIcon from "./assets/cancel_icon.svg";
import "./Input.css";


export default function Input({
    name = "",
    label = "",
    supportingText = "",
    type = "text",
    minLength,
    maxLength,
    minValue,
    maxValue,
    step,
    validationPattern,
    required,
    defaultValue = "",
    error,
    errorMessage,
    value,
    onChange
}) {
    let [isActive, setIsActive] = useState(false);

    return (
        <div
            className={`input-container${(isActive) ? " input-container-active" : ""}${(error) ? " input-container-error" : ""}`}
        >
            <label className={(isActive || value) ? "input-small-label" : ""}>{label}</label>
            <div className={`input-control${(error) ? " input-control-error" : ""}`}>
                <input
                    name={name}
                    type={type}
                    value={value}
                    minLength={minLength}
                    maxLength={maxLength}
                    min={minValue}
                    max={maxValue}
                    step={step}
                    pattern={validationPattern}
                    required={required}
                    onChange={(e) => onChange(name, e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
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
            {(!error && supportingText) && <span className="input-support">{supportingText}</span>}
            {(error && errorMessage) && <span className="input-error-message">{errorMessage}</span>}
        </div>
    )
}
