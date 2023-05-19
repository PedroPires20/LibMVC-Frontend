import { React, useState, useEffect, useRef } from "react";
import resetIcon from "./assets/cancel_icon.svg";
import "./Select.css";


export default function Select({
    name = "",
    label,
    options = [],
    optionValues = [],
    placeholder,
    multiple,
    value,
    formVariant,
    onChange
}) {
    const [active, setActive] = useState(false);
    const selectElementRef = useRef(null);
    const values = (optionValues.length > 0) ? optionValues : options;

    useEffect(() => {
        const checkClickOutsideList = (e) => {
            if(selectElementRef.current && !selectElementRef.current.contains(e.target)) {
                setActive(false);
            }
        };

        document.addEventListener("click", checkClickOutsideList);

        return () => {
            document.removeEventListener("click", checkClickOutsideList);
        }
    }, []);

    return (
        <div
            className={`select-container${(formVariant) ? " select-container-form" : ""}${(active) ? " select-container-active": ""}`}
            onClick={() => setActive(true)}
            onKeyDown={(e) => e.key === "Enter" && setActive(false)} 
            ref={selectElementRef}
        >
            <div className="select-input">
                <div className="select-header">
                    <div className="select-name">
                        {label}
                    </div>
                    <div className="select-selected-option">
                        {(Array.isArray(value)) ? ((value.length > 0) ? value.join("; ") : placeholder) : (value || placeholder)}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        onChange(name, (multiple) ? [] : "");
                        e.stopPropagation();
                    }}
                >
                    <img src={resetIcon} alt="redefinir"/>
                </button>
            </div>
            {active && (
                <div className="select-item-list-container">
                    <ul
                        className="select-item-list"
                    >
                        {options.map((optionLabel, index) => (
                            <li
                                key={index}
                                className={`click-ripple-effect-light ${(values[index] === value) ? "select-item-selected" : ""}`}
                                onClick={(e) => {
                                    if(multiple) {
                                        onChange(name, [...value, values[index]]);
                                    }else {
                                        onChange(name, values[index]);
                                        setActive(false);
                                        e.stopPropagation()
                                    }
                                }}
                            >
                                {optionLabel}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
