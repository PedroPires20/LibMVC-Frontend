<script>
    import Button from "../components/Button.svelte";
    import LoanInputs from "../components/LoanInputs.svelte";
    import TableCard from "../components/table_components/TableCard.svelte";
    import TableHeader from "../components/table_components/TableHeader.svelte";
    import TableBody from "../components/table_components/TableBody.svelte";
    import TableRow from "../components/table_components/TableRow.svelte";
    import TableCell from "../components/table_components/TableCell.svelte";
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
        color: #372f24;
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
    <title>SimpleLibrary - Empréstimos</title>
</svelte:head>

<main class="page-container">
    <div class="header">
        <h2>Empréstimos</h2>
        <Button>
            <div class="add-button">
                <img src={addIcon} alt="novo"/>
                <span>Novo empréstimo</span>
            </div>
        </Button>
    </div>
    <LoanInputs/>
    <TableCard>
        <TableHeader>
            <TableRow>
                <TableCell>Leitor</TableCell>
                <TableCell>Tel Contato</TableCell>
                <TableCell>Obra</TableCell>
                <TableCell>Data empréstimo</TableCell>
                <TableCell>Duração</TableCell>
                <TableCell>Data devolução</TableCell>
                <TableCell>Dias restantes</TableCell>
                <TableCell>Atrasado</TableCell>
                <TableCell>Renovação</TableCell>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableCell>
                Alice
            </TableCell>
            <TableCell>
                (38) 1111-1111
            </TableCell>
            <TableCell minWidth="15rem" wrap>
                Refatoração: Aperfeiçoando o Design de Códigos Existentes
            </TableCell>
            <TableCell>
                22/05/2023
            </TableCell>
            <TableCell>
                10
            </TableCell>
            <TableCell>
                01/06/2023
            </TableCell>
            <TableCell>
                -78
            </TableCell>
            <TableCell>
                Sim
            </TableCell>
            <TableCell>
                Sim
            </TableCell>
        </TableBody>
    </TableCard>
</main>