import { React, useState } from "react";
import { useLoanFields } from "../../hooks/useLoanFields";
import Select from "../select/Select";
import DatePicker from "../date_picker/DatePicker";
import Button from "../button/Button";
import "./LoanInputs.css";

const DEFAULT_FILTER_VALUES = {
    "reader": "",
    "bookTitle": "",
    "startDate": "",
    "endDate": "",
    "renew": "",
    "late": ""
};


export default function LoanInputs({ onSubmit, disabled }) {
    const [filters, setFilters] = useState(DEFAULT_FILTER_VALUES);
    const { readers, bookTitles } = useLoanFields();

    function handleSelectChange(name, value) {
        console.log('test');
        setFilters({ ...filters, [name]: value });
    }

    return (
        <div className="loans-filters-card">
            <h3>Filtros</h3>
            <div className="loans-filters-inputs">
                <div className="lfilters-input-container">
                    <Select
                        name="reader"
                        label="Leitor"
                        placeholder="Todos"
                        options={readers}
                        value={filters.reader}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="bookTitle"
                        label="Obra"
                        placeholder="Todos"
                        options={bookTitles}
                        value={filters.bookTitle}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <DatePicker
                        name="startDate"
                        label="Data empréstimo"
                        placeholder="Todos"
                        value={filters.startDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <DatePicker
                        name="endDate"
                        label="Data devolução"
                        placeholder="Todos"
                        value={filters.endDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="renew"
                        label="Atrasado"
                        options={["Sim", "Não"]}
                        placeholder="Todos"
                        value={filters.renew}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="late"
                        label="Renovação"
                        options={["Sim", "Não"]}
                        placeholder="Todos"
                        value={filters.late}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-buttons-container">
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            setFilters(DEFAULT_FILTER_VALUES);
                            onSubmit(DEFAULT_FILTER_VALUES);
                            e.target.blur();
                        }}
                        disabled={disabled}
                    >
                        Redefinir
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            onSubmit(filters);
                            e.target.blur();
                        }}
                        disabled={disabled}
                    >
                        Aplicar
                    </Button>
                </div>
            </div>
        </div>
    );
}
