<script>
    import { setContext } from "svelte";

    export let menuActive = false;

    setContext('header', false);
</script>

<style>
    .table-card {
        flex: 1 1 auto;
        display: flex;
        min-width: 25rem;
        background: linear-gradient(0deg, rgba(126, 87, 0, 0.05), rgba(126, 87, 0, 0.05)), #fffaff;
        border-radius: 12px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
        font-size: 1rem;
        overflow: auto;
        position: relative;
    }

    table {
        width: 100%;
        height: fit-content;
        border-collapse: collapse;
    }

    .menu-active {
        overflow: hidden;
        position: relative;
    }

    .menu-active table::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.15);
        position: absolute;
        top: 0;
        left: 0;
    }
</style>

<div class="table-card" class:menu-active={menuActive}>
    <table>
        <slot/>
    </table>
</div>
