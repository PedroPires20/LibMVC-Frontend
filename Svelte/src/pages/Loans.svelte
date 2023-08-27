<script>
    import { onMount } from "svelte";
    import Button from "../components/Button.svelte";
    import LoanInputs from "../components/LoanInputs.svelte";
    import TableCard from "../components/table_components/TableCard.svelte";
    import TableHeader from "../components/table_components/TableHeader.svelte";
    import TableBody from "../components/table_components/TableBody.svelte";
    import TableRow from "../components/table_components/TableRow.svelte";
    import TableCell from "../components/table_components/TableCell.svelte";
    import TableStatus from "../components/table_components/TableStatus.svelte";
    import LoanDialog from "../dialogs/LoanDialog.svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import addIcon from "../assets/add_icon.svg";
    import { createLoans } from "../stores/loan_store";
    import { createLoanFields } from "../stores/loan_fields_store";

    let { loadStatus, selectedLoans, fetchLoans, createLoan }  = createLoans();
    let { refreshLoanFields, ...loanFields } = createLoanFields();
    
    let showContextMenu = false;
    let contextMenuPosition = { x: 0, y: 0, targetIndex: null };
    let showLoanDialog = false;
    let saveStatus = { saving: false, error: false };

    onMount(fetchLoans);

    function getStatusMessage(loadStatus) {
        if(loadStatus.loading) {
            return "Carregando dados dos empréstimos...";
        }
        if(loadStatus.error) {
            return "Ocorreu um erro ao recuperar os dados dos empréstimos. Por favor, tente novamente.";
        }
        return "Nenhum empréstimo foi encontrado";
    }

    function handleRowClick(event, targetIndex) {
        const { top, left, width, height } = event.target.getBoundingClientRect();
        contextMenuPosition = { x: left, y: top + height, targetIndex };
        showContextMenu = true;
        event.stopPropagation();
    }

    function handleContextMenuClose(event) {
        showContextMenu = false;
        contextMenuPosition.targetIndex = null;
    }

    async function handleLoanFormSubmit(event) {
        const formData = event.detail;
        saveStatus.saving = true;
        let result;
        result = await createLoan(formData);
        if(result.error) {
            saveStatus = {
                saving: false,
                error: true,
                errorMessage: result.errorMessage
            };
        }else {
            showLoanDialog = false;
            saveStatus = { saving: false, error: false };
        }
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
        <Button on:click={() => showLoanDialog = true}>
            <div class="add-button">
                <img src={addIcon} alt="novo"/>
                <span>Novo empréstimo</span>
            </div>
        </Button>
    </div>
    <LoanInputs
        {...loanFields}
        on:submit={(event) => {
            const { filters } = event.detail;
            fetchLoans(filters);
        }}
    />
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
            {#if $loadStatus.loading || $loadStatus.error || !$selectedLoans?.length}
                <TableStatus
                    loading={$loadStatus.loading}
                    error={$loadStatus.error}
                    message={getStatusMessage($loadStatus)}
                />
            {:else}
                {#each $selectedLoans as loan, index}
                    <TableRow on:click={(event) => handleRowClick(event, index)}>
                        <TableCell>
                            {loan.reader}
                        </TableCell>
                        <TableCell>
                            {loan.phone}
                        </TableCell>
                        <TableCell minWidth="15rem" wrap>
                            {loan.bookTitle}
                        </TableCell>
                        <TableCell>
                            {loan.startDate}
                        </TableCell>
                        <TableCell>
                            {loan.duration}
                        </TableCell>
                        <TableCell>
                            {loan.endDate}
                        </TableCell>
                        <TableCell>
                            {loan.daysRemaining}
                        </TableCell>
                        <TableCell>
                            {loan.late}
                        </TableCell>
                        <TableCell>
                            {loan.renew}
                        </TableCell>
                    </TableRow>
                {/each}
            {/if}
        </TableBody>
    </TableCard>
    {#if showContextMenu}
        <ContextMenu
            position={contextMenuPosition}
            loanVariant
            on:menuclose={handleContextMenuClose}
        />
    {/if}
    {#if showLoanDialog}
        <LoanDialog
            {saveStatus}
            on:formsubmit={handleLoanFormSubmit}
            on:dialogclose={() => showLoanDialog = false}
        />
    {/if}
</main>