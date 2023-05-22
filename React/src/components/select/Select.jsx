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
    formVariant,
    onChange,
    value
}) {
    const [active, setActive] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
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

    useEffect(() => {
        const values = (optionValues.length > 0) ? optionValues : options;
        if(Array.isArray(value)) {
            setSelectedIndexes(value.map((optionValue) => values.indexOf(optionValue)));
        }else if(value && value !== "") {
            setSelectedIndexes([values.indexOf(value)]);
        }
    }, [options])

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
                        {(selectedIndexes.length > 0) ? selectedIndexes.map((index) => options[index]).join("; ") : placeholder}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedIndexes([]);
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
                                className={`click-ripple-effect-light ${(selectedIndexes.includes(index)) ? "select-item-selected" : ""}`}
                                onClick={(e) => {
                                    if(multiple) {
                                        let newSelectedIndexes;
                                        if(selectedIndexes.includes(index)) {
                                            newSelectedIndexes = selectedIndexes.filter((selectedIndex) => selectedIndex !== index);
                                        }else {
                                            newSelectedIndexes = [...selectedIndexes, index];
                                        }
                                        setSelectedIndexes(newSelectedIndexes);
                                        onChange(name, newSelectedIndexes.map((selectedIndex) => values[selectedIndex]));
                                    }else {
                                        setSelectedIndexes([index]);
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
