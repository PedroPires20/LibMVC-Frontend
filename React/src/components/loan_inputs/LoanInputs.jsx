import { React, useState } from "react";
import { useLoanFilters } from "../../hooks/useLoanFilters";
import Select from "../select/Select";
import Button from "../button/Button";
import "./LoanInputs.css";


export default function LoanInputs() {
    const [filters, setFilters] = useState({
        "reader": "",
        "bookTitle": "",
        "startDate": "",
        "endDate": "",
        "renew": "",
        "late": ""
    });
    const { readers, bookTitles, startDates, endDates } = useLoanFilters();

    function handleSelectChange(name, value) {
        setFilters({ ...filters, [name]: value });
    }

    return (
        <div className="loans-filters-card">
            <h3>Filtros</h3>
            <div className="loans-filters-inputs">
                <div className="lfilters-select-container">
                    <Select
                        name="reader"
                        label="Leitor"
                        placeholder="Todos"
                        options={readers}
                        value={filters.reader}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-select-container">
                    <Select
                        name="bookTitle"
                        label="Obra"
                        placeholder="Todos"
                        options={bookTitles}
                        value={filters.bookTitle}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-select-container">
                    <Select
                        name="startDate"
                        label="Data empréstimo"
                        placeholder="Todos"
                        options={startDates}
                        value={filters.startDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-select-container">
                    <Select
                        name="endDate"
                        label="Data devolução"
                        placeholder="Todos"
                        options={endDates}
                        value={filters.endDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-select-container">
                    <Select
                        name="renew"
                        label="Atrasado"
                        options={["Sim", "Não"]}
                        placeholder="Todos"
                        value={filters.renew}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-select-container">
                    <Select
                        name="late"
                        label="Renovação"
                        options={["Sim", "Não"]}
                        placeholder="Todos"
                        value={filters.late}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="loan-button-container">
                    <Button variant="secondary">Aplicar</Button>
                </div>
            </div>
        </div>
    );
}
