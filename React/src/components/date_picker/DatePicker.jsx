import { React, useState } from "react";
import "./DatePicker.css";


export default function DatePicker({
    label = "",
    supportingText = "",
    minDate,
    maxDate,
    required,
    error,
    errorMessage,
    value,
    onChange
}) {
    let [isActive, setIsActive] = useState(false);

    return (
        <div
            className={`date-picker-container${(isActive) ? " date-picker-container-active" : ""}${(error) ? " date-picker-container-error" : ""}`}
        >
            <label className={(isActive || value) ? "date-picker-small-label" : ""}>{label}</label>
            <div className={`date-picker-control${(error) ? " date-picker-control-error" : ""}`}>
                <input
                    type="date"
                    value={value}
                    min={minDate}
                    max={maxDate}
                    required={required}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                />
            </div>
            {(!error && supportingText) && <span className="date-picker-support">{supportingText}</span>}
            {(error && errorMessage) && <span className="date-picker-error-message">{errorMessage}</span>}
        </div>
    )
}
