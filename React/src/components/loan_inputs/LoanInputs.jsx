import { React } from "react";
import Select from "../select/Select";
import Button from "../button/Button";
import "./LoanInputs.css";


export default function LoanInputs() {
    return (
        <div className="loans-filters-card">
            <h3>Filtros</h3>
            <div className="loans-filters-inputs">
                <div className="lfilters-select-container">
                    <Select label="Leitor" placeholder="Todos"/>
                </div>
                <div className="lfilters-select-container">
                    <Select label="Obra" placeholder="Todos"/>
                </div>
                <div className="lfilters-select-container">
                    <Select label="Data empréstimo" placeholder="Todos"/>
                </div>
                <div className="lfilters-select-container">
                    <Select label="Data devolução" placeholder="Todos"/>
                </div>
                <div className="lfilters-select-container">
                    <Select label="Atrasado" options={["Sim", "Não"]} placeholder="Todos"/>
                </div>
                <div className="lfilters-select-container">
                    <Select label="Renovação" options={["Sim", "Não"]} placeholder="Todos"/>
                </div>
                <div className="loan-button-container">
                    <Button variant="secondary">Aplicar</Button>
                </div>
            </div>
        </div>
    );
}
