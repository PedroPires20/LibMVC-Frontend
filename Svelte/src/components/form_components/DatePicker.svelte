<script>
    export let name = "";
    export let label = "";
    export let supportingText = "";
    export let minDate = undefined;
    export let maxDate = undefined;
    export let required = false;
    export let errorMessage = "";
    export let formVariant = false;
    export let value = "";

    let active = false;
    let error = "";

    function handleBlur(event) {
        error = event.target.validationMessage || "";
        active = false;
    }

    function handleInvalid(event) {
        error = event.target.validationMessage || "";
    }
</script>

<style>
    .container {
        display: flex;
        flex-flow: column nowrap;
        font-size: 1rem;
        position: relative;
        gap: 0.5rem;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem 0.25rem 0 0;
        transition: all 0.2s;
    }

    .container:hover {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .container-form, .container-form:hover {
        box-shadow: none;
    }

    label {
        position: absolute;
        top: 0.3em;
        left: 1em;
        z-index: 1;
        font-size: 0.8em;
        color: #1f1b16;
        transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    }

    .container-active {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .container-active label {
        color: #4e4539;
    }

    .container-error label {
        color: #ba1a1a;
    }

    .container-active .container-error label {
        color: #ba1a1a;
    }

    .container-form.container-active {
        box-shadow: none;
    }


    .control {
        display: flex;
        flex-flow: row nowrap;
        background-color: #EFE0CF;
        border-radius: 0.25rem 0.25rem 0 0;
        position: relative;
        padding: 1.75em 1em 0.75em 1em;
    }

    .container-form .control {
        padding: 1.5em 1em 0.5em 1em;
    }

    .control input {
        border: none;
        outline: none;
        background: none;
        font-size: 1em;
        flex: 1 1;
    }

    .control-error input {
        color: #ba1a1a;
    }

    .control::before {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        right: 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.42);
        pointer-events: none;
        transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .control-error::before {
        border-bottom: 1px solid rgba(186, 26, 26, 0.42);
    }

    .container-active .control::before {
        border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    }

    .control::after {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        right: 0px;
        border-bottom: 2px solid rgba(78, 69, 57, 0.8);
        transform: scaleX(0);
        pointer-events: none;
        transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    }

    .control-error::after {
        border-bottom: 2px solid rgba(186, 26, 26, 0.8);
    }

    .container-active .control::after {
        transform: scaleX(1);
    }

    .support-message {
        padding: 0.5em 1em 0 1em;
        font-size: 0.75em;
        color: #4e4539;
    }

    .error-message {
        padding: 0.5em 1em 0 1em;
        font-size: 0.75em;
        color: #ba1a1a;
    }
</style>

<div
    class="container"
    class:container-form={formVariant}
    class:container-active={active}
    class:container-error={error}
>
    <label class:active for={name}>{label}</label>
    <div class="control" class:control-error={error}>
        <input
            type="date"
            min={minDate}
            max={maxDate}
            {required}
            bind:value
            on:focus={() => active = true}
            on:blur={handleBlur}
            on:invalid={handleInvalid}
        />
    </div>
    {#if error}
        <span class="error-message">{errorMessage || error}</span>
    {:else if supportingText}
        <span class="support-message">{supportingText}</span>
    {/if}
</div>
