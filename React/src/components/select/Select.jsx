import { React, useState, useEffect, useRef } from "react";
import resetIcon from "./assets/cancel_icon.svg";
import "./Select.css";


export default function Select({
    name,
    options = [],
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
            tabIndex={0}
            onClick={() => setActive(true)}
            onKeyDown={(e) => e.key === "Enter" && setActive(false)} 
            ref={selectElementRef}
        >
            <div className="select-input">
                <div className="select-header">
                    <div className="select-name">
                        {name}
                    </div>
                    <div className="select-selected-option">
                        {(multiple && Array.isArray(value)) ? value.join("; ") : value}
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
