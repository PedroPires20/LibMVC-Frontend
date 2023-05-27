import { React } from "react";
import ProgressBar from "../progress_bar/ProgressBar";
import errorIcon from "./assets/error_icon.svg";
import "./LoadStatus.css";


export default function LoadStatus({ error, loadingMessage, errorMessage }) {
    return (
        <tbody>
            <tr>
                <td>
                    <div className="load-status-container">
                        {(error) ? (
                            <img src={errorIcon} alt="Erro"/>
                        ) : (
                            <ProgressBar/>
                        )
                        }
                        <p>
                            {(error) ? errorMessage : loadingMessage}
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
