<script>
    import menuIcon from "../assets/menu_icon.svg";
    import Menu from "./Menu.svelte";

    let menuVisible = false;
</script>

<style>
    header {
        width: 100%;
        height: 5rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: #432c00;
        position: fixed;
        top: 0;
        z-index: 20;
    }

    button {
        padding: 0.25rem;
        border: none;
        border-radius: 50%;
        outline: none;
        cursor: pointer;
        user-select: none;
    }
    
    h1 {
        margin: 0 auto;
        font-size: 3.5rem;
        font-weight: normal;
        color: #fff;
        user-select: none;
    }
</style>

<header>
    <button class="click-ripple-effect" on:click={() => menuVisible = !menuVisible}>
        <img src={menuIcon} alt="menu"/>
    </button>
    <h1>SimpleLibrary</h1>
</header>
{#if menuVisible}
    <Menu/>
{/if}