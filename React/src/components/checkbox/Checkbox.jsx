import { React } from "react";
import checkIcon from "./assets/check_icon_small.svg";
import "./Checkbox.css";


export default function Checkbox({ label, supportingText, checked, onChange }) {
    return (
        <div className="checkbox-container">
            <div className={`checkbox-input${(checked) ? " checkbox-input-checked" : ""}`}>
                <button className="checkbox-checkmark" onClick={() => onChange(!checked)}>
                    <div className="checkbox-checkmark-state click-ripple-effect-light">
                        <img src={checkIcon} alt="marcado"/>
                    </div>
                </button>
                <label>{label}</label>
            </div>
            {supportingText && (
                <span className="checkbox-supporting-text">{supportingText}</span>
            )}
        </div>
    )
}
