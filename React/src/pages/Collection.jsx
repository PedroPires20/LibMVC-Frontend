import { React, useState, useEffect } from "react";
import { useBooks } from "../hooks/useBooks";
import Button from "../components/button/Button";
import { TableCard, TableHeader, TableRow, TableCell, TableData } from "../components/table_card/TableCard";
import TableStatus from "../components/table_status/TableStatus";
import CollectionInputs from "../components/collection_inputs/CollectionInputs";
import ContextMenu from "../components/context_menu/ContextMenu";
import BookDialog from "../dialogs/BookDialog";
import DialogBox from "../components/dialog_box/DialogBox";
import StateDialog from "../dialogs/StateDialog";
import addIcon from "./assets/add_icon.svg";
import "./Collection.css";


export default function Collection() {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0, targetIndex: 0 });
    const [targetBookIndex, setTargetBookIndex] = useState(null);
    const [showBookDialog, setShowBookDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState({ deleting: false, error: false });
    const { books, loadStatus, queryBooks, createBook, updateBook, deleteBook } = useBooks();

    useEffect(() => {
        document.title = "SimpleLibrary - Acervo"
    }, []);

    function handleRowClick(event, targetIndex) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        setContextMenuPosition({ x: left, y: top + height, targetIndex });
        setShowContextMenu(true);
        event.stopPropagation();
    }

    function handleContextMenuClick(action) {
        setTargetBookIndex(contextMenuPosition.targetIndex);
        setShowContextMenu(false);
        if(action === 0) {
            setShowBookDialog(true);
        }else if(action === 1) {
            setShowDeleteDialog(true);
        }
    }

    function handleBookDialogSubmit(bookData) {
        if(targetBookIndex !== null) {
            setTargetBookIndex(null);
            return updateBook(targetBookIndex, bookData);
        }else {
            return createBook(bookData);
        }
    }

    async function handleDeleteDialog(option) {
        if(option === 0  && targetBookIndex !== null) {
            setDeleteStatus({ deleting: true, error: false });
            setTargetBookIndex(null);
            let deleteStatus = await deleteBook(targetBookIndex);
            if(deleteStatus.error) {
                setDeleteStatus({ deleting: false, error: true, errorMessage: deleteStatus.errorMessage });
                return;
            }else {
                setDeleteStatus({ deleting: false, error: false });
            }
        }
        setShowDeleteDialog(false);
    }

    return (
        <div className={`collection-page${(showContextMenu) ? " collection-page-menu" : ""}`}>
            <div className="collection-header">
                <h2>Acervo</h2>
                <Button
                    variant="primary"
                    onClick={() => setShowBookDialog(true)}
                    disabled={loadStatus.loading || loadStatus.error}
                >
                    <div className="collection-add-button">
                        <img src={addIcon} alt="adicionar"/>
                        <span>Novo livro</span>
                    </div>
                </Button>
            </div>
            <CollectionInputs onSubmit={queryBooks} disabled={loadStatus.loading || loadStatus.error}/>
            <TableCard menuActive={showContextMenu}>
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
                {(loadStatus.loading || loadStatus.error || books.length === 0) ? (
                    <TableStatus
                        error={loadStatus.error}
                        loading={loadStatus.loading}
                        message={(loadStatus.loading) ? "Carregando dados do acervo..." :
                        ((loadStatus.error) ? "Ocorreu um erro ao recuperar os dados do acervo. Por favor, tente novamente." :
                        "Nenhum livro foi encontrado")}
                    />
                ) : (
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
                )}
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
                    updateTarget={(targetBookIndex !== null) && books[targetBookIndex]}
                    onClose={() => setShowBookDialog(false)}
                    onSubmit={handleBookDialogSubmit}
                />
            )}
            {showDeleteDialog && (
                <DialogBox>
                    {(!deleteStatus.deleting && !deleteStatus.error) ? (
                        <StateDialog
                            variant="delete"
                            heading="Apagar Livro?"
                            message={`Deseja remover o livro "${books[targetBookIndex].title}" do acervo?\nUma vez excluído, as informações desse livro não poderão ser recuperadas!`}
                            buttonLabels={["Sim", "Não"]}
                            onClose={handleDeleteDialog}
                        />
                    ) : (
                        <StateDialog
                            variant={(deleteStatus.error) ? "error" : "load"}
                            heading={(deleteStatus.error) ? "Erro" : "Salvando"}
                            message={(deleteStatus.error) ? "Ocorreu um erro ao salvar as alterações no sistema." : "As alterações estão sendo processadas pelo sistema"}
                            detailsSummary={(deleteStatus.errorMessage && deleteStatus.errorMessage !== "") && "Detalhes do erro"}
                            detailsContent={deleteStatus.errorMessage}
                            onClose={() => {
                                setShowDeleteDialog(false);
                                setDeleteStatus({ deleting: false, error: false });
                            }}
                        />  
                    )}
                </DialogBox>
            )}
        </div>
    )
}
