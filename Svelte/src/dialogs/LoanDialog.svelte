<script>
    import { createEventDispatcher } from "svelte";
    import DialogBox from "../components/DialogBox.svelte";
    import Input from "../components/form_components/Input.svelte";
    import Checkbox from "../components/form_components/Checkbox.svelte";
    import Select from "../components/form_components/Select.svelte";
    import DatePicker from "../components/form_components/DatePicker.svelte";

    const dispatch = createEventDispatcher();

    export let updateTarget = undefined;

    $: isUpdateDialog = !!updateTarget;
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
        <form name="loan-dialog-form" novalidate on:submit|preventDefault>
            <Input
                name="reader"
                type="text"
                label="Leitor"
                supportingText="Entre o nome do leitor"
                required
            />
            <Input
                name="phone"
                type="text"
                label="Telefone"
                supportingText="Entre o telefone de contato do leitor"
                validationPattern="\(\d{2,5}\)\s*9?\d{4}-?\d{4}"
                errorMessage="Por favor, entre um número de telefone válido"
                required
            />
            <Select
                name="bookId"
                label="Livro"
                placeholder="Selecione o livro a ser emprestado"
                errorMessage="Por favor, selecione um livro"
                formVariant
                required
            />
            <DatePicker
                name="startDate"
                label="Data de início"
                formVariant
                required
            />
            <Input
                name="duration"
                type="number"
                label="Duração"
                supportingText="Entre a duração do empréstimo (em dias)"
                minValue="1"
                required
            />
            <Checkbox
                name="renew"
                label="Renovação"
                supportingText="Marque essa opção se estiver registrando a renovação de um empréstimo anterior"
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