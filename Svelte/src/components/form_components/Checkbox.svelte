<script>
    import checkIcon from "../../assets/check_icon_small.svg";

    export let name = '';
    export let label = '';
    export let supportingText = '';
    export let value = undefined;
</script>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.4rem;
    }

    .input {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        padding-left: 1rem;
    }

    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: fit-content;
        background-color: #fff;
        border: 1px solid rgba(78, 69, 57, 0.8);
        border-radius: 0.25rem;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .checkmark-state {
        width: 1.2em;
        height: 1.2em;
    }

    .input-checked > button {
        background-color: #7e5700;
    }

    button img {
        width: 1rem;
        height: 1rem;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    .input-checked > button img {
        opacity: 1;
    }

    label {
        font-size: 1rem;
        color: #1f1b16;
        line-height: 1.2rem;
    }

    span {
        padding: 0.5em 1em 0 1em;
        font-size: 0.75em;
        color: #4e4539;
    }
</style>

<div class="container">
    <div class="input" class:input-checked={value}>
        <button
            name={name}
            on:click|preventDefault={() => value = !value}
        >
            <div class="checkmark-state click-ripple-effect-light">
                <img src={checkIcon} alt="marcado"/>
            </div>
        </button>
        <label for={name}>{label}</label>
    </div>
    {#if supportingText}
        <span>{supportingText}</span>
    {/if}
</div>
