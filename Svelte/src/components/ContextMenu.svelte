<script>
    import { createEventDispatcher } from "svelte";
    import checkIcon from "../assets/check_icon.svg";
    import deleteIcon from "../assets/delete_icon.svg";
    import editIcon from "../assets/edit_icon.svg";

    export let position = {};
    export let loanVariant = false;

    const dispatch = createEventDispatcher();
    const CLOSE_EVENT = "menuclose";
    let menuContainerElement;

    function handleDocumentClick(event) {
        if(menuContainerElement && !menuContainerElement.contains(event.target)) {
            dispatch(CLOSE_EVENT, {});
        }
    }
</script>

<style>
    .menu-container {
        display: flex;
        flex-flow: column nowrap;
        gap: 2rem;
        width: fit-content;
        height: fit-content;
        background: linear-gradient(0deg, rgba(126, 87, 0, 0.05), rgba(126, 87, 0, 0.05)), #fffbff;
        box-shadow: 0px 0.628472px 1.25694px rgba(0, 0, 0, 0.3), 0px 1.25694px 3.77083px 1.25694px rgba(0, 0, 0, 0.15);
        padding: 1.5rem;
        border-radius: 1.5rem;
        position: absolute;
        z-index: 6;
    }

    .option {
        display: flex;
        flex-flow: row nowrap;
        gap: 1rem;
        align-items: center;
        justify-content: flex-start;
    }

    .button-container {
        background: linear-gradient(0deg, rgba(251, 187, 73, 0.11), rgba(251, 187, 73, 0.11)), #1F1B16;
        box-shadow: 0px 1.93345px 3.8669px 1.45009px rgba(0, 0, 0, 0.15), 0px 0.483362px 1.45009px rgba(0, 0, 0, 0.3);
        border-radius: 0.85rem;

    }

    button {
        padding: 1em;
        outline: none;
        border: none;
        background: none;
    }

    img {
        width: 1.5rem;
        height: 1.5rem;
    }

    label {
        font-size: 0.88em;
        font-weight: 500;
        color: #000;
        line-height: 1.25rem;
        user-select: none;
    }
</style>

<svelte:document on:click={handleDocumentClick}/>

<div
    class="menu-container"
    role="menu"
    tabindex="0"
    style="top: {position && position.y}; left: {position && position.x}"
    bind:this={menuContainerElement}
>
    <div class="option">
        <div class="button-container">
            <button
                id="cm-edit-btn"
                class="click-ripple-effect"
                on:click={() => dispatch(CLOSE_EVENT, { option: 0 })}
            >
                <img src={editIcon} alt="editar"/>
            </button>
        </div>
        <label for="cm-edit-btn">Editar</label>
    </div>
    <div class="option">
        <div class="button-container">
            <button
                id="cm-delete-btn"
                class="click-ripple-effect"
                on:click={() => dispatch(CLOSE_EVENT, { option: 1 })}
            >
                <img src={(loanVariant) ? checkIcon : deleteIcon} alt={(loanVariant) ? "editar" : "apagar"}/>
            </button>
        </div>
        <label for="cm-delete-btn">{(loanVariant) ? "Finalizar" : "Apagar"}</label>
    </div>
</div>
