import { React, useState } from "react";
import "./DatePicker.css";


export default function DatePicker({
    name = "",
    label = "",
    supportingText = "",
    minDate,
    maxDate,
    required,
    errorMessage,
    formVariant,
    value,
    onChange
}) {
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    return (
        <div
            className={`date-picker-container ${formVariant && "date-picker-container-form"}${(isActive) ? " date-picker-container-active" : ""}${(!!error) ? " date-picker-container-error" : ""}`}
        >
            <label className={(isActive || value) ? "date-picker-small-label" : ""}>{label}</label>
            <div className={`date-picker-control${(!!error) ? " date-picker-control-error" : ""}`}>
                <input
                    type="date"
                    value={value}
                    min={minDate}
                    max={maxDate}
                    required={required}
                    onChange={(e) => onChange(name, e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={(e) => {
                        setError(e.target.validationMessage);
                        setIsActive(false);
                    }}
                    onInvalid={(e) => setError(e.target.validationMessage)}
                />
            </div>
            {(!!error) ? (
                <span className="date-picker-error-message">{errorMessage || error}</span>
            ) : (
                supportingText && <span className="date-picker-support">{supportingText}</span>
            )}
        </div>
    )
}
