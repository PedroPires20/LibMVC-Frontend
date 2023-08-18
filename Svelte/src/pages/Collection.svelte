<script>
    import CollectionInputs from "../components/CollectionInputs.svelte";
    import TableCard from "../components/table_components/TableCard.svelte";
    import TableHeader from "../components/table_components/TableHeader.svelte";
    import TableBody from "../components/table_components/TableBody.svelte";
    import TableRow from "../components/table_components/TableRow.svelte";
    import TableCell from "../components/table_components/TableCell.svelte";
    import Button from "../components/Button.svelte";
    import addIcon from "../assets/add_icon.svg";
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
    <CollectionInputs/>
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
            <TableRow>
                <TableCell>
                    8550804606
                </TableCell>
                <TableCell minWidth="15rem" wrap>
                    Arquitetura limpa: O guia do artesão para estrutura e design de software
                </TableCell>
                <TableCell wrap>
                    Robert C. Martin
                </TableCell>
                <TableCell minWidth="12rem" wrap>
                    Computação; Informática; Mídias Digitais
                </TableCell>
                <TableCell>
                    Alta Books
                </TableCell>
                <TableCell>
                    1ª edição
                </TableCell>
                <TableCell>
                    Físico (capa comum)
                </TableCell>
                <TableCell>
                    23/04/2019
                </TableCell>
                <TableCell>
                    436
                </TableCell>
                <TableCell>
                    9
                </TableCell>
                <TableCell minWidth="20rem" wrap>
                    As regras universais de arquitetura de software aumentam dramaticamente a produtividade dos desenvolvedores ao longo da vida dos sistemas de software. Agora, aproveitando o sucesso dos seus best-sellers "Código Limpo" e "O Codificador Limpo", o lendário artesão de software Robert C. Martin (“Uncle Bob”) vai revelar essas regras e ajudar o leitor a aplicá-las.
                </TableCell>
                <TableCell>
                    Estante 2, prateleira 1 seção 6
                </TableCell>
            </TableRow>
        </TableBody>
    </TableCard>
</main>