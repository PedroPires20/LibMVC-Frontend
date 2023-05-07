import { React, useState } from "react";
import clearIcon from "./assets/cancel_icon.svg";
import "./Input.css";


export default function Input({
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
            className={`text-input-container${(isActive) ? " text-input-container-active" : ""}${(error) ? " text-input-container-error" : ""}`}
        >
            <label className={(isActive || value) ? "text-input-small-label" : ""}>{label}</label>
            <div className={`text-input-control${(error) ? " text-input-control-error" : ""}`}>
                <input
                    type={type}
                    value={value}
                    minLength={minLength}
                    maxLength={maxLength}
                    min={minValue}
                    max={maxValue}
                    step={step}
                    pattern={validationPattern}
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
            {(!error && supportingText) && <span className="text-input-support">{supportingText}</span>}
            {(error && errorMessage) && <span className="text-input-error-message">{errorMessage}</span>}
        </div>
    )
}
