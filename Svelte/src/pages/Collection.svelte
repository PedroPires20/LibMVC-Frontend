<script>
    import { onMount } from "svelte";
    import CollectionInputs from "../components/CollectionInputs.svelte";
    import TableStatus from "../components/table_components/TableStatus.svelte";
    import TableCard from "../components/table_components/TableCard.svelte";
    import TableHeader from "../components/table_components/TableHeader.svelte";
    import TableBody from "../components/table_components/TableBody.svelte";
    import TableRow from "../components/table_components/TableRow.svelte";
    import TableCell from "../components/table_components/TableCell.svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import BookDialog from "../dialogs/BookDialog.svelte";
    import DialogBox from "../components/DialogBox.svelte";
    import StateDialog from "../dialogs/StateDialog.svelte";
    import Button from "../components/Button.svelte";
    import addIcon from "../assets/add_icon.svg";
    import { createBooks } from "../stores/book_store";
    import { createBookFields } from "../stores/book_fields_store";

    let {
        loadStatus,
        selectedBooks,
        queryBooks,
        createBook,
        updateBook,
        deleteBook
    } = createBooks();
    let { refreshBookFields, ...bookFields } = createBookFields();

    let showContextMenu = false;
    let contextMenuPosition = { x: 0, y: 0, targetIndex: null };
    let showBookDialog = false;
    let showDeleteDialog = false;
    let saveStatus = { saving: false, error: false };

    onMount(queryBooks);

    function getStatusMessage(loadStatus) {
        if(loadStatus.loading) {
            return "Carregando dados do acervo...";
        }
        if(loadStatus.error) {
            return "Ocorreu um erro ao recuperar os dados do acervo. Por favor, tente novamente.";
        }
        return "Nenhum livro foi encontrado";
    }

    function getDeleteStateDialogProps(saveStatus) {
        if(saveStatus.error) {
            return {
                variant: "error",
                heading: "Erro",
                message: "Ocorreu um erro ao salvar as alterações no sistema.",
                detailsSummary: saveStatus.errorMessage && "Detalhes do erro",
                detailsContent: saveStatus.errorMessage,
                buttonLabels: ["Ok"]
            };
        }
        if(saveStatus.saving) {
            return {
                variant: "load",
                heading: "Salvando",
                message: "As alterações estão sendo processadas pelo sistema"
            };
        }
        return {
            variant: "delete",
            heading: "Apagar Livro?",
            message: `Deseja remover o livro "${$selectedBooks[contextMenuPosition.targetIndex].title}" do acervo?\nUma vez excluído, as informações desse livro não poderão ser recuperadas!`,
            buttonLabels: ["Sim", "Não"]
        };
    }

    function handleRowClick(event, targetIndex) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        contextMenuPosition = { x: left, y: top + height, targetIndex };
        showContextMenu = true;
        event.stopPropagation();
    }

    function handleContextMenuClose(event) {
        const option = event.detail?.option;
        if(option === 0) {
            showContextMenu = false;
            showBookDialog = true;
        }else if(option === 1) {
            showContextMenu = false;
            showDeleteDialog = true;
        }else {
            showContextMenu = false;
            contextMenuPosition.targetIndex = null;
        }
    }
    
    async function handleBookFormSubmit(event) {
        const formData = event.detail;
        saveStatus.saving = true;
        let result;
        if(contextMenuPosition.targetIndex) {
            result = await updateBook(contextMenuPosition.targetIndex, formData);
        }else {
            result = await createBook(formData);
        }
        refreshBookFields();
        if(result.error) {
            saveStatus = {
                saving: false,
                error: true,
                errorMessage: result.errorMessage
            };
        }else {
            showBookDialog = false;
            saveStatus = { saving: false, error: false };
            contextMenuPosition.targetIndex = null;
        }
    }

    async function handleDeleteDialogClose(event) {
        const action = event.detail;
        if(action === 0 && !saveStatus.error && contextMenuPosition.targetIndex) {
            saveStatus.saving = true;
            let result = await deleteBook(contextMenuPosition.targetIndex);
            if(result.error) {
                saveStatus = {
                    saving: false,
                    error: true,
                    errorMessage: result.errorMessage
                };
                contextMenuPosition.targetIndex = null;
                return;
            }
        }
        refreshBookFields();
        showDeleteDialog = false;
        saveStatus = { saving: false, error: false };
        contextMenuPosition.targetIndex = null;
    }
</script>

<style>
    .header {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .header h2 {
        font-size: 2.8rem;
        font-weight: 500;
        color: #372F24;
        flex: 0;
    }

    .add-button {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.4rem;
    }

    .add-button img {
        width: 1.5rem;
        height: 1.5rem;
    }
</style>

<svelte:head>
    <title>SimpleLibrary - Acervo</title>
</svelte:head>

<main class="page-container">
    <div class="header">
        <h2>Acervo</h2>
        <Button
            disabled={$loadStatus.loading || $loadStatus.error}
            on:click={() => showBookDialog = true}
        >
            <div class="add-button">
                <img src={addIcon} alt="adicionar"/>
                <span>Novo livro</span>
            </div>
        </Button>
    </div>
    <CollectionInputs
        {...bookFields}
        on:submit={(event) => {
            const { query, filters } = event.detail;
            queryBooks(query, filters);
        }}
    />
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
        <TableBody>
            {#if $loadStatus.loading || $loadStatus.error || !$selectedBooks?.length}
                <TableStatus
                    loading={$loadStatus.loading}
                    error={$loadStatus.error}
                    message={getStatusMessage($loadStatus)}
                />
            {:else}
                {#each $selectedBooks as book, index}
                    <TableRow on:click={(event) => handleRowClick(event, index)}>
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
                            {book.edition}
                        </TableCell>
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
                {/each}
            {/if}
        </TableBody>
    </TableCard>
    {#if showContextMenu}
        <ContextMenu
            position={contextMenuPosition}
            on:menuclose={handleContextMenuClose}
        />
    {/if}
    {#if showBookDialog}
        <BookDialog
            {saveStatus}
            updateTarget={$selectedBooks[contextMenuPosition.targetIndex]}
            on:formsubmit={handleBookFormSubmit}
            on:dialogclose={() => {
                showBookDialog = false;
                saveStatus = { saving: false, error: false };
            }}
        />
    {/if}
    {#if showDeleteDialog}
        <DialogBox>
            <StateDialog
                {...getDeleteStateDialogProps(saveStatus)}
                on:dialogclose={handleDeleteDialogClose}
            />
        </DialogBox>
    {/if}
</main>