import { React } from "react";
import Spinner from "../../components/spinner/Spinner";
import successIcon from "./assets/success_icon.svg";
import deleteIcon from "./assets/delete_icon.svg";
import errorIcon from "./assets/error_icon.svg";
import "./StateDialog.css";


export default function StateDialog({
    variant,
    heading,
    message,
    detailsSummary,
    detailsContent,
    buttonLabels = ["Ok"], 
    onClose
}) {
    let iconPath = successIcon;
    let altMessage = "";
    switch(variant) {
        case "success": iconPath = successIcon; altMessage = "sucesso"; break;
        case "delete":  iconPath = deleteIcon; altMessage = "apagar"; break;
        case "error": iconPath = errorIcon; altMessage = "erro"; break;
        default: iconPath = successIcon; altMessage = "";
    }

    return (
        <div className="state-dialog-container">
            {(variant !== "load") && <img src={iconPath} alt={altMessage}/>}
            <h3>{heading}</h3>
            {message.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {detailsSummary && (
                <details className="state-dialog-details">
                    <summary>{detailsSummary}</summary>
                    <div className="state-dialog-details-content">
                        {detailsContent}
                    </div>
                </details>
            )}
            {(variant === "load") ? (
                <Spinner/>
            ) : (
                <div className="state-dialog-buttons">
                    {buttonLabels.map((label, index) => (
                         <button
                            key={index}
                            onClick={() => onClose(index)}
                            className="click-ripple-effect-light"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
