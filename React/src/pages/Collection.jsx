import { React, useState, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import CollectionInputs from "../components/collection_inputs/CollectionInputs";
import ContextMenu from "../components/context_menu/ContextMenu";
import BookDialog from "../dialogs/BookDialog";
import addIcon from "./assets/add_icon.svg";
import "./Collection.css";


export default function Collection() {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0, targetIndex: 0 });
    const [updateTargetIndex, setUpdateTargetIndex] = useState(null);
    const [showBookDialog, setShowBookDialog] = useState(false);
    const { books, handleQuery, createBook, updateBook } = useBooks(0);

    useEffect(() => {
        document.title = "LibMVC - Acervo"
    }, []);

    function handleRowClick(event, targetIndex) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setContextMenuPosition({ x: left, y: top + height, targetIndex });
        setShowContextMenu(true);
        event.stopPropagation();
    }

    function handleContextMenuClick(action) {
        switch(action) {
            case 0: {
                setUpdateTargetIndex(contextMenuPosition.targetIndex);
                setShowContextMenu(false);
                setShowBookDialog(true);
                break;
            }
        }
    }

    function handleBookDialogSubmit(bookData) {
        if(updateTargetIndex !== null) {
            updateBook(updateTargetIndex, bookData);
            setUpdateTargetIndex(null);
        }else {
            createBook(bookData);
        }
    }

    return (
        <div className={`collection-page${(showContextMenu) ? " collection-page-menu" : ""}`}>
            <div className="collection-header">
                <h2>Acervo</h2>
                <Button variant="primary" onClick={() => setShowBookDialog(true)}>
                    <div className="collection-add-button">
                        <img src={addIcon} alt="adicionar"/>
                        <span>Novo livro</span>
                    </div>
                </Button>
            </div>
            <CollectionInputs onSubmit={handleQuery}/>
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
                    {books.map((book, index) => (
                        <TableRow
                            key={book.id}
                            onClick={(e) => handleRowClick(e, index)}
                        >
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
                    onMenuClick={handleContextMenuClick}
                />
            )}
            {showBookDialog && (
                <BookDialog
                    updateTarget={(updateTargetIndex !== null) && books[updateTargetIndex]}
                    onClose={() => setShowBookDialog(false)}
                    onSubmit={handleBookDialogSubmit}
                />
            )}
        </div>
    )
}
