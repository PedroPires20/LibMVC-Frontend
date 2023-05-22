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
    autofocus,
    defaultValue = "",
    errorMessage,
    value,
    onChange,
    onKeyDown
}) {
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    return (
        <div
            className={`input-container${(isActive) ? " input-container-active" : ""}${(!!error) ? " input-container-error" : ""}`}
        >
            <label className={(isActive || value) ? "input-small-label" : ""}>{label}</label>
            <div className={`input-control${(!!error) ? " input-control-error" : ""}`}>
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
                    autoFocus={autofocus}
                    onChange={(e) => onChange && onChange(name, e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={() => setIsActive(true)}
                    onBlur={(e) => {
                        setError(e.target.validationMessage);
                        setIsActive(false);
                    }}
                    onInvalid={(e) => setError(e.target.validationMessage)}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onChange && onChange(name, defaultValue);
                    }}
                >
                    <img src={clearIcon} alt="limpar"/>
                </button>
            </div>
            {(!!error) ? (
                <span className="input-error-message">{errorMessage || error}</span>
            ) : (
                supportingText && <span className="input-support">{supportingText}</span>
            )}
        </div>
    )
}
