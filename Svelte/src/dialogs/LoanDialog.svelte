<script>
    import { createEventDispatcher, onMount } from "svelte";
    import DialogBox from "../components/DialogBox.svelte";
    import Input from "../components/form_components/Input.svelte";
    import Checkbox from "../components/form_components/Checkbox.svelte";
    import Select from "../components/form_components/Select.svelte";
    import DatePicker from "../components/form_components/DatePicker.svelte";
    import { createBooks } from "../stores/book_store";

    const dispatch = createEventDispatcher();
    const FIELD_LOADING_MESSAGE = "Carregando...";
    const FIELD_LOADING_ERROR = "Ocorreu um erro ao carregar as opções do filtro";
    const DEFAULT_LOAN_DATA = {
        reader: "",
        phone: "",
        bookId: "",
        startDate: "",
        duration: "",
        renew: false
    };

    export let updateTarget = undefined;

    let { loadStatus, selectedBooks, queryBooks } = createBooks();
    let loanData = DEFAULT_LOAN_DATA;
    let bookOptions;

    onMount(() => {
        if(updateTarget) {
            loanData = updateTarget.toFormData();
        }
        queryBooks();
    });

    function handleFormSubmit(event) {
        const formElement = event.target;
        if(!formElement.checkValidity()) {
            const firstInvalidInput = formElement.querySelector(":invalid");
            firstInvalidInput && firstInvalidInput.focus();
        }else {
            dispatch("formsubmit", loanData);
        }
    }

    $: isUpdateDialog = !!updateTarget;
    $: {
        if($loadStatus.loading) {
            bookOptions = [FIELD_LOADING_MESSAGE];
        }else if($loadStatus.error) {
            bookOptions = [FIELD_LOADING_ERROR];
        }else {
            bookOptions = $selectedBooks.map((book) => book.title);
        }
    }
</script>

<style>
    .container {
        width: 25rem;
        height: 70vh;
        overflow-y: auto;
        font-size: 1rem;
        display: flex;
        flex-flow: column nowrap;
    }

    h3 {
        font-size: 1.5em;
        font-weight: 500;
        line-height: 2em;
        color: #1f1b16;
    }

    p {
        font-size: 0.85em;
        font-weight: 400;
        line-height: 1.25em;
        color: #4e4539;
    }

    form {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        gap: 0.85em;
        padding: 0.8em 0.5em 0.8em 0;
        position: relative;
        flex: 1 1;
    }

    .buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        gap: 0.6em;
        padding-right: 0.5em;
    }
    .buttons button {
        border: none;
        border-radius: 1em;
        font-size: 0.8em;
        font-weight: 500;
        color: #8d4f00;
        padding: 0.5em;
        cursor: pointer;
    }
</style>

<DialogBox>
    <div class="container">
        <h3>{(isUpdateDialog) ? "Editar empréstimo" : "Novo empréstimo"}</h3>
        <p>
            {(isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
                : "Preencha as informações abaixo para cadastrar um novo empréstimo no sistema"}
        </p>
        <form
            name="loan-dialog-form"
            novalidate
            on:submit|preventDefault={handleFormSubmit}
        >
            <Input
                name="reader"
                type="text"
                label="Leitor"
                supportingText="Entre o nome do leitor"
                required
                bind:value={loanData.reader}
            />
            <Input
                name="phone"
                type="text"
                label="Telefone"
                supportingText="Entre o telefone de contato do leitor"
                validationPattern={"\\(\\d{2,5}\\)\\s*9?\\d{4}-?\\d{4}"}
                errorMessage="Por favor, entre um número de telefone válido"
                required
                bind:value={loanData.phone}
            />
            <Select
                name="bookId"
                label="Livro"
                placeholder="Selecione o livro a ser emprestado"
                errorMessage="Por favor, selecione um livro"
                options={bookOptions}
                optionValues={$selectedBooks.map((book) => book.id)}
                disabled={$loadStatus.loading || $loadStatus.error}
                formVariant
                required
                bind:value={loanData.bookId}
            />
            <DatePicker
                name="startDate"
                label="Data de início"
                formVariant
                required
                bind:value={loanData.startDate}
            />
            <Input
                name="duration"
                type="number"
                label="Duração"
                supportingText="Entre a duração do empréstimo (em dias)"
                minValue="1"
                required
                bind:value={loanData.duration}
            />
            <Checkbox
                name="renew"
                label="Renovação"
                supportingText="Marque essa opção se estiver registrando a renovação de um empréstimo anterior"
                bind:value={loanData.renew}
            />
            <div class="buttons">
                <button
                    class="click-ripple-effect-light"
                    on:click|preventDefault={() => dispatch("dialogclose")}
                >
                    Cancelar
                </button>
                <button class="click-ripple-effect-light">
                    Confirmar
                </button>
            </div>
        </form>
    </div>
</DialogBox>