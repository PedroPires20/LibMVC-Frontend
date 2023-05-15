import { React, useState, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import SearchBox from "../components/search_box/SearchBox";
import Select from "../components/select/Select";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import ContextMenu from "../components/context_menu/ContextMenu";
import addIcon from "./assets/add_icon.svg";
import "./Collection.css";


export default function Collection() {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const { books } = useBooks(0);

    useEffect(() => {
        document.title = "LibMVC - Acervo"
    }, []);

    function handleRowClick(event) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setContextMenuPosition({ x: left, y: top + height });
        setShowContextMenu(true);
        event.stopPropagation();
    }

    return (
        <div className={`collection-page${(showContextMenu) ? " collection-page-menu" : ""}`}>
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
            <TableCard>
                <TableHeader>
                    <TableRow>
                        <TableCell>ISBN</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Autor(es)</TableCell>
                        <TableCell>Categorias</TableCell>
                        <TableCell>Editora</TableCell>
                        <TableCell>Edição</TableCell>
                        <TableCell>Formato</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Páginas</TableCell>
                        <TableCell>Cópias</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Localização</TableCell>
                    </TableRow>
                </TableHeader>
                <TableData>
                    {books.map((book) => (
                        <TableRow key={book.id} onClick={handleRowClick}>
                            <TableCell>
                                {book.isbn}
                            </TableCell>
                            <TableCell minWidth="15rem" wrap>
                                {book.title}
                            </TableCell>
                            <TableCell wrap>
                                {book.author}
                            </TableCell>
                            <TableCell minWidth="12rem" wrap>
                                {book.categories}
                            </TableCell>
                            <TableCell>
                                {book.publisher}
                            </TableCell>
                            <TableCell>
                                {book.edition}</TableCell>
                            <TableCell>
                                {book.format}
                            </TableCell>
                            <TableCell>
                                {book.date}
                            </TableCell>
                            <TableCell>
                                {book.pages}
                            </TableCell>
                            <TableCell>
                                {book.copies}
                            </TableCell>
                            <TableCell minWidth="20rem" wrap>
                                {book.description}
                            </TableCell>
                            <TableCell>
                                {book.location}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableData>
            </TableCard>
            {showContextMenu && (
                <ContextMenu
                    position={contextMenuPosition}
                    onMenuClose={() => setShowContextMenu(false)}
                />
            )}
        </div>
    )
}
