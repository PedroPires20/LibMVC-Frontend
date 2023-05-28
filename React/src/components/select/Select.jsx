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
    errorMessage = "Por favor, selecione uma opção",
    onChange,
    value,
    disabled,
    required
}) {
    const [active, setActive] = useState(false);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [error, setError] = useState("");
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
        }else if(value !== undefined && value !== "") {
            setSelectedIndexes([values.indexOf(value)]);
        }else {
            setSelectedIndexes([]);
        }
    }, [options, value])

    return (
        <div
            className={`select-container${(formVariant) ? " select-container-form" : ""}${(active) ? " select-container-active": ""}${(error) ? " select-container-error" : ""}`}
            onClick={() => setActive(true)}
            onKeyDown={(e) => e.key === "Enter" && setActive(false)} 
            ref={selectElementRef}
        >
            <div className="select-input">
                <div className="select-header">
                    <div className="select-name">
                        {label}
                    </div>
                    <input
                        type="text"
                        className="select-selected-option"
                        value={(selectedIndexes.length > 0) ? selectedIndexes.map((index) => options[index]).join("; ") : ""}
                        placeholder={(error && errorMessage !== "") ? errorMessage : placeholder}
                        required={required}
                        onInvalid={(e) => setError(errorMessage)}
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setActive(false);
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
                                    if(disabled) {
                                        setActive(false);
                                        e.stopPropagation();
                                        return;
                                    }
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
                                    setError((e.target.validationMessage && e.target.validationMessage !== "") ? errorMessage : "");
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
