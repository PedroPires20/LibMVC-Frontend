<script>
    import { onMount } from "svelte";
    import CollectionInputs from "../components/CollectionInputs.svelte";
    import TableStatus from "../components/table_components/TableStatus.svelte";
    import TableCard from "../components/table_components/TableCard.svelte";
    import TableHeader from "../components/table_components/TableHeader.svelte";
    import TableBody from "../components/table_components/TableBody.svelte";
    import TableRow from "../components/table_components/TableRow.svelte";
    import TableCell from "../components/table_components/TableCell.svelte";
    import Button from "../components/Button.svelte";
    import addIcon from "../assets/add_icon.svg";
    import { createBooks } from "../stores/book_store";
    import { createBookFields } from "../stores/book_fields_store";

    let { loadStatus, selectedBooks, queryBooks } = createBooks();
    let { refreshBookFields, ...bookFields } = createBookFields();

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
        <Button>
            <div class="add-button">
                <img src={addIcon} alt="adicionar"/>
                <span>Novo livro</span>
            </div>
        </Button>
    </div>
    <CollectionInputs {...bookFields}/>
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
                {#each $selectedBooks as book}
                    <TableRow>
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
</main>