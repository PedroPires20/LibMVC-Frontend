<script>
    import SearchBox from "./SearchBox.svelte";
    import Select from "./form_components/Select.svelte";
    import Button from "./Button.svelte";
</script>

<style>
    .input-card {
        display: flex;
        flex-flow: column nowrap;
        padding: 1.5rem;
        background: linear-gradient(0deg, rgba(126, 87, 0, 0.05), rgba(126, 87, 0, 0.05)), #fffbff;
        box-shadow: 0px 2.32778px 4.65556px rgba(0, 0, 0, 0.3), 0px 4.65556px 13.9667px 4.65556px rgba(0, 0, 0, 0.15);
        border-radius: 1.75rem;
        flex: 0;
    }

    .titles {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        padding: 0.5rem 1.5rem;
    }

    .titles h3 {
        font-size: 1.4rem;
        font-weight: 500;
        color: #1f1b16;
        line-height: 1.75rem;
    }

    .titles h3:nth-child(2) {
        margin: auto;
    }

    .inputs {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-around;
        gap: 1.2rem;
        padding: 1rem;
    }

    .search-box-container {
        flex: 1 1;
        max-width: 20rem;
    }

    .select-container {
        width: 15rem;
    }

    .buttons-container {
        flex: 0;
        display: flex;
        flex-flow: row nowrap;
        gap: 1.2em;
    }
</style>

<div class="input-card">
    <div class="titles">
        <h3>Pesquisa no acervo:</h3>
        <h3>Refine sua busca:</h3>
    </div>
    <div class="inputs">
        <div class="search-box-container">
            <SearchBox/>
        </div>
        <div class="select-container">
            <Select
                name="author"
                label="Autor"
                placeholder="Todos"
            />
        </div>
        <div class="select-container">
            <Select
                name="categories"
                label="Categoria"
                placeholder="Todas"
                multiple
            />
        </div>
        <div class="select-container">
            <Select
                name="publisher"
                label="Editora"
                placeholder="Todas"
            />
        </div>
        <div class="select-container">
            <Select
                name="format"
                label="Formato"
                placeholder="Todos"
            />
        </div>
        <div class="buttons-container">
            <Button variant="secondary">
                Redefinir
            </Button>
            <Button variant="secondary">
                Pesquisar
            </Button>
        </div>
    </div>
</div>
