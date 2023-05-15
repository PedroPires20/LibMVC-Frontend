import { React } from "react";
import { useBookFilters } from "../../hooks/useBookFilters";
import SearchBox from "../search_box/SearchBox";
import Select from "../select/Select";
import Button from "../button/Button";
import "./CollectionInputs.css";


export default function CollectionInputs() {
    const { authors, categories, publishers, formats } = useBookFilters();

    return (
        <div className="collection-input-card">
            <div className="collection-input-titles">
                <h3>Pesquisa no acervo:</h3>
                <h3>Refine sua busca:</h3>
            </div>
            <div className="collection-inputs">
                <div className="collection-search-box-container">
                    <SearchBox/>
                </div>
                <div className="cinputs-select-container">
                    <Select
                        label="Autor"
                        options={authors}
                        placeholder="Todos"
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        label="Categoria"
                        options={categories}
                        placeholder="Todos"
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        label="Editora"
                        options={publishers}
                        placeholder="Todos"
                    />
                </div>
                <div className="cinputs-select-container">
                    <Select
                        label="Formato"
                        options={formats}
                        placeholder="Todos"
                    />
                </div>
                <div className="cinputs-button-container">
                    <Button variant="secondary">Pesquisar</Button>
                </div>
            </div>
        </div>
    );
}
