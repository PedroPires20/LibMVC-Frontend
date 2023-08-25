<script>
    import { createEventDispatcher, onMount } from "svelte";
    import DialogBox from "../components/DialogBox.svelte";
    import StateDialog from "./StateDialog.svelte";
    import Input from "../components/form_components/Input.svelte";
    import Select from "../components/form_components/Select.svelte";
    import DatePicker from "../components/form_components/DatePicker.svelte";
    import TextArea from "../components/form_components/TextArea.svelte";
    import { createBookFields } from "../stores/book_fields_store";

    const DEFAULT_BOOK_DATA = {
        isbn: "",
        title: "",
        author: "",
        categories: "",
        publisher: "",
        edition: "",
        format: "",
        date: "",
        pages: "",
        copies: "",
        description: "",
        location: ""
    };
    const NEW_CATEGORY_LABEL = "Nova categoria";
    const dispatch = createEventDispatcher();

    export let updateTarget = undefined;
    export let saveStatus = { saving: false, error: false };

    let { categories } = createBookFields();
    let addCategory = false;
    let newCategory = "";
    let bookData = DEFAULT_BOOK_DATA;

    onMount(() => {
        if(updateTarget) {
            bookData = updateTarget.toFormData();
        }
    })

    function handleCategoryAdd(event) {
        if(event.key === "Enter") {
            if(newCategory && newCategory !== "") {
                categories.appendCategory(newCategory);
                if(!bookData.categories.includes(newCategory)) {
                    bookData.categories = [...bookData.categories, newCategory];
                }
            }
            newCategory = "";
            addCategory = false;
        }else if(event.key === "Escape") {
            addCategory = false;
            newCategory = "";
        }
    }

    function handleFormSubmit(event) {
        const formElement = event.target;
        if(!formElement.checkValidity()) {
            const firstInvalidInput = formElement.querySelector(":invalid");
            firstInvalidInput && firstInvalidInput.focus();
        }else {
            dispatch("formsubmit", bookData);
        }
    }

    $: isUpdateDialog = !!updateTarget;
    $: categoryOptions = [...$categories.fieldData, NEW_CATEGORY_LABEL];
    $: if(bookData.categories.includes(NEW_CATEGORY_LABEL)) {
        bookData.categories = bookData.categories.filter((category) => category !== NEW_CATEGORY_LABEL);
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
    {#if !saveStatus.saving && !saveStatus.error}
        <div class="container">
            <h3>{(isUpdateDialog) ? "Editar livro" : "Adicionar novo livro"}</h3>
            <p>
                {(isUpdateDialog) ? "Edite, abaixo, as informações desejadas e confirme suas alterações"
                    : "Preencha as informações abaixo para cadastrar um novo livro"}
            </p>
            <form
                name="book-dialog-form"
                novalidate
                on:submit|preventDefault={(event) => handleFormSubmit(event)}
            >
                <Input
                    name="isbn"
                    type="text"
                    label="ISBN"
                    supportingText="Entre o ISBN do livro"
                    required
                    bind:value={bookData.isbn}
                />
                <Input
                    name="title"
                    type="text"
                    label="Título"
                    supportingText="Entre o título do livro"
                    required
                    bind:value={bookData.title}
                />
                <Input
                    name="author"
                    type="text"
                    label="Autor(es)"
                    supportingText="Entre o(s) autor(es) do livro"
                    required
                    bind:value={bookData.author}
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
                        bind:value={bookData.categories}
                    />
                {/if}
                <Input
                    name="publisher"
                    type="text"
                    label="Editora"
                    supportingText="Entre a editora do livro"
                    bind:value={bookData.publisher}
                />
                <Input
                    name="edition"
                    type="text"
                    label="Edição"
                    supportingText="Entre a edição do livro"
                    bind:value={bookData.edition}
                />
                <Input
                    name="format"
                    type="text"
                    label="Formato"
                    supportingText="Entre o formato do livro"
                    bind:value={bookData.format}
                />
                <DatePicker
                    name="date"
                    label="Data de publicação"
                    supportingText="Selecione a data de publicação do livro"
                    formVariant
                    bind:value={bookData.date}
                />
                <Input
                    name="pages"
                    type="number"
                    label="Páginas"
                    supportingText="Entre o número de páginas do livro"
                    minValue="1"
                    required
                    bind:value={bookData.pages}
                />
                <Input
                    name="copies"
                    type="number"
                    label="Cópias"
                    supportingText="Entre o número de cópias disponíveis do livro"
                    minValue="1"
                    required
                    bind:value={bookData.copies}
                />
                <TextArea
                    name="description"
                    label="Descrição"
                    supportingText="Entre uma breve descrição para o livro"
                    bind:value={bookData.description}
                />
                <Input
                    name="location"
                    type="text"
                    label="Localização"
                    supportingText="Entre a localização do livro no acervo"
                    bind:value={bookData.location}
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
    {:else}
        <StateDialog
            variant={(saveStatus.error) ? "error" : "load"}
            heading={(saveStatus.error) ? "Erro" : "Salvando"}
            message={(saveStatus.error) ? "Ocorreu um erro ao salvar as alterações no sistema." : "As alterações estão sendo processadas pelo sistema"}
            detailsSummary={(saveStatus.errorMessage && saveStatus.errorMessage !== "") && "Detalhes do erro"}
            detailsContent={saveStatus.errorMessage}
            on:dialogclose
        />
    {/if}
</DialogBox>
