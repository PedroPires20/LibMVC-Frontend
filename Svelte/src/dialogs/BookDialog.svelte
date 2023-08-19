<script>
    import { createEventDispatcher } from "svelte";
    import DialogBox from "../components/DialogBox.svelte";
    import Input from "../components/form_components/Input.svelte";
    import Select from "../components/form_components/Select.svelte";
    import DatePicker from "../components/form_components/DatePicker.svelte";
    import TextArea from "../components/form_components/TextArea.svelte";

    const NEW_CATEGORY_LABEL = "Nova categoria";
    const dispatch = createEventDispatcher();

    export let updateTarget = undefined;

    let bookCategories = ['a'];
    let selectedCategories = [];
    let addCategory = false;
    let newCategory = "";

    function handleCategoryAdd(event) {
        if(event.key === "Enter") {
            if(newCategory && !bookCategories.includes(newCategory)) {
                bookCategories = [...bookCategories, newCategory];
                selectedCategories = [...selectedCategories, newCategory];
            }
            newCategory = "";
            addCategory = false;
        }else if(event.key === "Escape") {
            addCategory = false;
        }
    }

    $: isUpdateDialog = !!updateTarget;
    $: categoryOptions = [...bookCategories, NEW_CATEGORY_LABEL];
    $: if(selectedCategories.includes(NEW_CATEGORY_LABEL)) {
        selectedCategories = selectedCategories.filter((category) => category !== NEW_CATEGORY_LABEL);
        addCategory = true;
    }
</script>

<style>
    .container {
        width: 25rem;
        height: 70vh;
        overflow-y: auto;
        font-size: 1rem;
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
        gap: 0.85em;
        padding: 0.8em 0.5em 0.8em 0;
        position: relative;
    }

    .buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        gap: 0.6em;
    }
    .buttons button {
        border: none;
        border-radius: 1em;
        font-size: 0.8em;
        font-weight: 500;
        color: #8d4f00;
        padding: 0.5em;
    }
</style>

<DialogBox>
    <div class="container">
        <h3>{(isUpdateDialog) ? "Editar livro" : "Adicionar novo livro"}</h3>
        <p>
            {(isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
                : "Preencha as informações abaixo para cadastrar um novo livro"}
        </p>
        <form name="book-dialog-form" novalidate on:submit|preventDefault>
            <Input
                name="isbn"
                type="text"
                label="ISBN"
                supportingText="Entre o ISBN do livro"
                required
            />
            <Input
                name="title"
                type="text"
                label="Título"
                supportingText="Entre o título do livro"
                required
            />
            <Input
                name="author"
                type="text"
                label="Autor(es)"
                supportingText="Entre o(s) autor(es) do livro"
                required
            />
            {#if addCategory}
                <Input
                    name="new-category"
                    type="text"
                    label="Nova categoria"
                    supportingText="Entre o rótulo da nova categoria e pressione enter"
                    autofocus
                    bind:value={newCategory}
                    on:keydown={handleCategoryAdd} 
                />
            {:else}
                <Select
                    name="categories"
                    label="Categorias"
                    placeholder="Entre a(s) categoria(s) do livro"
                    options={categoryOptions}
                    formVariant
                    multiple
                    bind:value={selectedCategories}
                />
            {/if}
            <Input
                name="publisher"
                type="text"
                label="Editora"
                supportingText="Entre a editora do livro"
            />
            <Input
                name="edition"
                type="text"
                label="Edição"
                supportingText="Entre a edição do livro"
            />
            <Input
                name="format"
                type="text"
                label="Formato"
                supportingText="Entre o formato do livro"
            />
            <DatePicker
                name="date"
                label="Data de publicação"
                supportingText="Selecione a data de publicação do livro"
                formVariant
            />
            <Input
                name="pages"
                type="number"
                label="Páginas"
                supportingText="Entre o número de páginas do livro"
                minValue="1"
                required
            />
            <Input
                name="copies"
                type="number"
                label="Cópias"
                supportingText="Entre o número de cópias disponíveis do livro"
                minValue="1"
                required
            />
            <TextArea
                name="description"
                label="Descrição"
                supportingText="Entre uma breve descrição para o livro"
            />
            <Input
                name="location"
                type="text"
                label="Localização"
                supportingText="Entre a localização do livro no acervo"
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
