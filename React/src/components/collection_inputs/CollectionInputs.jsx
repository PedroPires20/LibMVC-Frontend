import { React, useState } from "react";
import { useBookFields } from "../../hooks/useBookFields";
import SearchBox from "../search_box/SearchBox";
import Select from "../select/Select";
import Button from "../button/Button";
import "./CollectionInputs.css";

const FIELD_LOADING_MESSAGE = "Carregando...";
const FIELD_LOADING_ERROR = "Ocorreu um erro ao carregar as opções do filtro";
const DEFAULT_FILTER_VALUES = {
    author: "",
    categories: "",
    publisher: "",
    format: ""
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


export default function CollectionInputs({ onSubmit, disabled }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTER_VALUES);
    const { authors, categories, publishers, formats } = useBookFields();

    function handleSelectChange(name, option) {
        setFilters({ ...filters, [name]: option });
    }

    return (
        <div className="collection-input-card">
            <div className="collection-input-titles">
                <h3>Pesquisa no acervo:</h3>
                <h3>Refine sua busca:</h3>
            </div>
            <div className="collection-inputs">
                <div className="cinputs-search-box-container">
                    <SearchBox
                        searchQuery={searchQuery}
                        onQueryChange={setSearchQuery}
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="author"
                        label="Autor"
                        options={getOptionsFromField(authors)}
                        placeholder="Todos"
                        value={filters.author}
                        onChange={handleSelectChange}
                        disabled={authors.loading || authors.error}
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="categories"
                        label="Categoria"
                        options={getOptionsFromField(categories)}
                        placeholder="Todas"
                        value={filters.categories}
                        onChange={handleSelectChange}
                        disabled={categories.loading || categories.error}
                        multiple
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="publisher"
                        label="Editora"
                        options={getOptionsFromField(publishers)}
                        placeholder="Todas"
                        value={filters.publisher}
                        onChange={handleSelectChange}
                        disabled={publishers.loading || publishers.error}
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="format"
                        label="Formato"
                        options={getOptionsFromField(formats)}
                        placeholder="Todos"
                        value={filters.format}
                        onChange={handleSelectChange}
                        disabled={formats.loading || formats.error}
                    />
                </div>
                <div className="cinputs-button-container">
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            setFilters(DEFAULT_FILTER_VALUES);
                            setSearchQuery("");
                            onSubmit("", DEFAULT_FILTER_VALUES);
                            e.target.blur();
                        }}
                        disabled={disabled}
                    >
                        Redefinir
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            onSubmit(searchQuery, filters);
                            e.target.blur();
                        }}
                        disabled={disabled}
                    >
                        Pesquisar
                    </Button>
                </div>
            </div>
        </div>
    );
}
