import { React } from "react";
import SearchBox from "../search_box/SearchBox";
import Select from "../select/Select";
import Button from "../button/Button";
import "./CollectionInputs.css";


export default function CollectionInputs() {
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
                    <Select label="Autor" placeholder="Todos"/>
                </div>
                <div className="cinputs-select-container">
                    <Select label="Categoria" placeholder="Todos"/>
                </div>
                <div className="cinputs-select-container">
                    <Select label="Editora" placeholder="Todos"/>
                </div>
                <div className="cinputs-select-container">
                    <Select label="Formato" placeholder="Todos"/>
                </div>
                <div className="cinputs-button-container">
                    <Button variant="secondary">Pesquisar</Button>
                </div>
            </div>
        </div>
    );
}
