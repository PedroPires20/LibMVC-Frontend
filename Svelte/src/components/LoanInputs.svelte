<script>
    import Select from "./form_components/Select.svelte";
    import DatePicker from "./form_components/DatePicker.svelte";
    import Button from "./Button.svelte";
</script>

<style>
    .filters-card {
        display: flex;
        flex-flow: column nowrap;
        padding: 1.5rem;
        background: linear-gradient(0deg, rgba(126, 87, 0, 0.05), rgba(126, 87, 0, 0.05)), #fffbff;
        box-shadow: 0px 2.32778px 4.65556px rgba(0, 0, 0, 0.3), 0px 4.65556px 13.9667px 4.65556px rgba(0, 0, 0, 0.15);
        border-radius: 1.75rem;
        flex: 0;
    }

    .filters-card h3 {
        font-size: 1.4rem;
        font-weight: 500;
        color: #1f1b16;
        line-height: 1.75rem;
    }

    .inputs {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-around;
        gap: 1.2rem;
        padding: 1rem;
    }

    .input-container {
        width: 12rem;
    }

    .buttons-container {
        flex: 0;
        display: flex;
        flex-flow: row nowrap;
        gap: 1.2em;
    }
</style>

<div class="filters-card">
    <h3>Filtros</h3>
    <div class="inputs">
        <div class="input-container">
            <Select
                name="reader"
                label="Leitor"
                placeholder="Todos"
            />
        </div>
        <div class="input-container">
            <Select
                name="bookTitle"
                label="Obra"
                placeholder="Todas"
            />
        </div>
        <div class="input-container">
            <DatePicker
                name="startDate"
                label="Data empréstimo"
                placeholder="Todas"
            />
        </div>
        <div class="input-container">
            <DatePicker
                name="endDate"
                label="Data devolução"
                placeholder="Todas"
            />
        </div>
        <div class="input-container">
            <Select
                name="late"
                label="Atrasado"
                placeholder="Todos"
                options={["Sim", "Não"]}
                optionValues={[true, false]}
            />
        </div>
        <div class="input-container">
            <Select
                name="renew"
                label="Renovação"
                placeholder="Todos"
                options={["Sim", "Não"]}
                optionValues={[true, false]}
            />
        </div>
        <div class="buttons-container">
            <Button variant="secondary">
                Redefinir
            </Button>
            <Button variant="secondary">
                Aplicar  
            </Button>
        </div>
    </div>
</div>
