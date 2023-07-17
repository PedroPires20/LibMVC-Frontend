import { React, useState } from "react";
import { useLoanFields } from "../../hooks/useLoanFields";
import Select from "../select/Select";
import DatePicker from "../date_picker/DatePicker";
import Button from "../button/Button";
import "./LoanInputs.css";

const FIELD_LOADING_MESSAGE = "Carregando...";
const FIELD_LOADING_ERROR = "Ocorreu um erro ao carregar as opções do filtro";
const DEFAULT_FILTER_VALUES = {
    "reader": "",
    "bookTitle": "",
    "startDate": "",
    "endDate": "",
    "late": undefined,
    "renew": undefined
};

function getOptionsFromField(field) {
    if(field.loading) {
        return [FIELD_LOADING_MESSAGE];
    }
    if(field.error) {
        return [FIELD_LOADING_ERROR];
    }
    return field.fieldData;
}


export default function LoanInputs({ onSubmit, disabled }) {
    const [filters, setFilters] = useState(DEFAULT_FILTER_VALUES);
    const { readers, bookTitles } = useLoanFields();

    function handleSelectChange(name, value) {
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
                        options={getOptionsFromField(readers)}
                        value={filters.reader}
                        onChange={handleSelectChange}
                        disabled={readers.loading || readers.error}
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="bookTitle"
                        label="Obra"
                        placeholder="Todas"
                        options={getOptionsFromField(bookTitles)}
                        value={filters.bookTitle}
                        onChange={handleSelectChange}
                        disabled={bookTitles.loading || bookTitles.error}
                    />
                </div>
                <div className="lfilters-input-container">
                    <DatePicker
                        name="startDate"
                        label="Data empréstimo"
                        placeholder="Todas"
                        value={filters.startDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <DatePicker
                        name="endDate"
                        label="Data devolução"
                        placeholder="Todas"
                        value={filters.endDate}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="late"
                        label="Atrasado"
                        options={["Sim", "Não"]}
                        optionValues={[true, false]}
                        placeholder="Todos"
                        value={filters.late}
                        onChange={handleSelectChange}
                    
                    />
                </div>
                <div className="lfilters-input-container">
                    <Select
                        name="renew"
                        label="Renovação"
                        options={["Sim", "Não"]}
                        optionValues={[true, false]}
                        placeholder="Todos"
                        value={filters.renew}
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
