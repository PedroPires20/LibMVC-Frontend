import { React, useState } from "react";
import { useBookFilters } from "../../hooks/useBookFilters";
import SearchBox from "../search_box/SearchBox";
import Select from "../select/Select";
import Button from "../button/Button";
import "./CollectionInputs.css";


export default function CollectionInputs() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        author: "",
        categories: "",
        publisher: "",
        format: ""
    });
    const { authors, categories, publishers, formats } = useBookFilters();

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
                <div className="collection-search-box-container">
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
                    <Button variant="secondary">Pesquisar</Button>
                </div>
            </div>
        </div>
    );
}
