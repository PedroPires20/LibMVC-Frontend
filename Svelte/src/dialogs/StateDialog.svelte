<script>
    import { createEventDispatcher } from "svelte";
    import Spinner from "../components/Spinner.svelte";
    import successIcon from "../assets/success_icon.svg";
    import deleteIcon from "../assets/delete_icon_dialog.svg";
    import errorIcon from "../assets/error_icon.svg";

    const dispatch = createEventDispatcher();

    export let variant = "";
    export let heading = "";
    export let message = "";
    export let detailsSummary = "";
    export let detailsContent = "";
    export let buttonLabels = ["Ok"];

    let iconPath;
    let altMessage;

    $: switch(variant) {
        case "success": iconPath = successIcon; altMessage = "sucesso"; break;
        case "delete": iconPath = deleteIcon; altMessage = "apagar"; break;
        case "error": iconPath = errorIcon; altMessage = "erro"; break;
        default: iconPath = successIcon; altMessage = "";
    }
</script>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        width: 25rem;
        font-size: 1rem;
    }

    img {
        width: 3.5rem;
        height: 3.5rem;
    }

    h3 {
        font-size: 1.5em;
        font-weight: 500;
        color: #1f1b16;
        line-height: 1em;
    }

    p {
        font-size: 0.85em;
        font-weight: 400;
        line-height: 1.25em;
        color: #4e4539;
        padding-bottom: 0.8em;
    }

    details {
        width: 100%;
        align-self: flex-start;
        border-top: 1px solid rgb(210, 196, 180);
        padding: 1.5em 2em;
    }

    details summary {
        font-size: 0.88em;
        line-height: 1.5em;
        color: #4e4539;
        cursor: pointer;
    }
    
    .details-content {
        margin-top: 0.5em;
        padding: 0.8em 2em;
        background-color: #EFE0CF;
        box-shadow: inset 0 4px 8px rgba(0,0,0,0.2);
        overflow: auto;
        max-height: calc(100vh - 40rem);
    }

    .dialog-buttons {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-items: flex-end;
        gap: 0.8em;
        padding-right: 0.8em;
        align-self: flex-end;
    }

    .dialog-buttons button {
        border: none;
        border-radius: 0.6em;
        font-size: 0.8em;
        font-weight: 500;
        color: #8d4f00;
        padding: 0.5em;
        background-color: transparent;
        cursor: pointer;
    }
</style>

<div class="container">
    {#if variant !== "load"}
        <img src={iconPath} alt={altMessage}/>
    {/if}
    <h3>{heading}</h3>
    {#each message.split('\n') as line}
        <p>{line}</p>
    {/each}
    {#if detailsSummary}
        <details>
            <summary>{detailsSummary}</summary>
            <div class="details-content">
                {detailsContent}
            </div>
        </details>
    {/if}
    {#if variant === "load"}
        <Spinner/>
    {:else}
        <div class="dialog-buttons">
            {#each buttonLabels as label, index}
                <button
                    class="click-ripple-effect-light"
                    on:click={() => dispatch("dialogclose", index)}
                >
                    {label}
                </button>
            {/each}
        </div>
    {/if}
</div>
