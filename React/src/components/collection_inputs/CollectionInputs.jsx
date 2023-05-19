import { React, useState } from "react";
import { useBookFields } from "../../hooks/useBookFields";
import SearchBox from "../search_box/SearchBox";
import Select from "../select/Select";
import Button from "../button/Button";
import "./CollectionInputs.css";

const DEFAULT_FILTER_VALUES = {
    author: "",
    categories: "",
    publisher: "",
    format: ""
};


export default function CollectionInputs({ onSubmit }) {
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
                        options={authors}
                        placeholder="Todos"
                        value={filters.author}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="categories"
                        label="Categoria"
                        options={categories}
                        placeholder="Todos"
                        value={filters.categories}
                        onChange={handleSelectChange}
                        multiple
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="publisher"
                        label="Editora"
                        options={publishers}
                        placeholder="Todos"
                        value={filters.publisher}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        name="format"
                        label="Formato"
                        options={formats}
                        placeholder="Todos"
                        value={filters.format}
                        onChange={handleSelectChange}
                    />
                </div>
                <div className="cinputs-button-container">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setFilters(DEFAULT_FILTER_VALUES);
                            setSearchQuery("");
                        }}
                    >
                        Redefinir
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => onSubmit(searchQuery, filters)}
                    >
                        Pesquisar
                    </Button>
                </div>
            </div>
        </div>
    );
}
