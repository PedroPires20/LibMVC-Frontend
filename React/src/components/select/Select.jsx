import { React, useState, useEffect, useRef } from "react";
import resetIcon from "./assets/cancel_icon.svg";
import "./Select.css";


export default function Select({
    label,
    options = [],
    placeholder,
    multiple,
    value,
    onChange
}) {
    let [active, setActive] = useState(false);
    let selectElementRef = useRef(null);

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
            className={`select-container ${(active) ? "select-container-active": ""}`}
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
                        {(Array.isArray(value)) ? ((value.length > 0) ? value.join("; ") : value) : (value || placeholder)}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        onChange((multiple) ? [] : "");
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
                        {options.map((optionValue, index) => (
                            <li
                                key={index}
                                className={`click-ripple-effect-light ${(optionValue === value) ? "select-item-selected" : ""}`}
                                onClick={() => {
                                    if(multiple) {
                                        onChange([optionValue, ...value]);
                                    }else {
                                        onChange(optionValue);
                                    }
                                }}
                            >
                                {optionValue}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
