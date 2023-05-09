import { React, useEffect } from "react";
import SearchBox from "../components/search_box/SearchBox";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell } from "../components/table_card/TableCard";
import addIcon from "../assets/add_icon.svg";
import "./Collection.css";


export default function Collection() {
    useEffect(() => {
        document.title = "LibMVC - Acervo"
    }, []);

    return (
        <div className="collection-page">
            <div className="collection-header">
                <h2>Acervo</h2>
                <Button variant="primary">
                    <div className="collection-add-button">
                        <img src={addIcon} alt="adicionar"/>
                        <span>Novo livro</span>
                    </div>
                </Button>
            </div>
            <div className="collection-input-card">
                <div className="collection-input-titles">
                    <h3>Pesquisa no acervo:</h3>
                    <h3>Refine sua busca:</h3>
                </div>
                <div className="collection-inputs">
                    <div className="collection-search-box-container">
                        <SearchBox/>
                    </div>
                    <div className="collection-select-container">
                        <Select label="Autor" placeholder="Todos"/>
                    </div>
                    <div className="collection-select-container">
                        <Select label="Categoria" placeholder="Todos"/>
                    </div>
                    <div className="collection-select-container">
                        <Select label="Editora" placeholder="Todos"/>
                    </div>
                    <div className="collection-select-container">
                        <Select label="Formato" placeholder="Todos"/>
                    </div>
                    <div className="collection-button-container">
                        <Button variant="secondary">Pesquisar</Button>
                    </div>
                </div>
            </div>
            <div className="collection-table-container">
                <TableCard>
                    <TableHeader>
                        <TableRow>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Autor(es)</TableCell>
                            <TableCell>Categorias</TableCell>
                            <TableCell>Editora</TableCell>
                            <TableCell>Edição</TableCell>
                            <TableCell>Formato</TableCell>
                            <TableCell>Páginas</TableCell>
                            <TableCell>Cópias</TableCell>
                            <TableCell>Localização</TableCell>
                        </TableRow>
                    </TableHeader>
                </TableCard>
            </div>
        </div>
    )
}
