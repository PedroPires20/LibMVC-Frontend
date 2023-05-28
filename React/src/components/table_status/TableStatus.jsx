import { React } from "react";
import ProgressBar from "../progress_bar/ProgressBar";
import errorIcon from "./assets/error_icon.svg";
import "./TableStatus.css";


export default function TableStatus({ loading, error, message }) {
    return (
        <tbody>
            <tr>
                <td>
                    <div className="load-status-container">
                        {(error) && <img src={errorIcon} alt="Erro"/>}
                        {(loading) && <ProgressBar/>}
                        <p>
                            {message}
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
