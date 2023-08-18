<script>
    import clearIcon from "../../assets/cancel_icon.svg";

    export let name = "";
    export let label = "";
    export let options = [];
    export let optionValues = [];
    export let placeholder = "";
    export let multiple = false;
    export let formVariant = false;
    export let errorMessage = "Por favor, selecione uma opção";
    export let disabled = false;
    export let required = false;
    export let value = undefined;

    let active = false;
    let selectedIndexes = [];
    let error = "";
    let selectElement;

    function handleKeyDown(event) {
        if(event.key === "Enter") {
            active = false;
        }
    }

    function handleDocumentClick(event) {
        if(!selectElement?.contains(event.target)) {
            active = false;
        }
    }

    function handleOptionClick(event, optionIndex) {
        if(disabled) {
            active = false;
            event.stopPropagation();
            return;
        }
        if(multiple) {
            if(selectedIndexes.includes(optionIndex)) {
                selectedIndexes = selectedIndexes.filter((selectedIndex) => selectedIndex !== optionIndex);
            }else {
                selectedIndexes = [...selectedIndexes, optionIndex];
            }
            value = selectedIndexes.map((selectedIndex) => optionValuesMap[selectedIndex]);
        }else {
            selectedIndexes = [optionIndex];
            active = false;
            value = optionValuesMap[optionIndex];
            event.stopPropagation();
        }
    }

    function handleReset() {
        active = false;
        selectedIndexes = []
        value = (multiple) ? [] : "";
    }

    $: optionValuesMap = (optionValues.length > 0) ? optionValues : options;
    $: inputValue = (selectedIndexes.length > 0) ?
        selectedIndexes.map((selectedIndex) => options[selectedIndex]).join("; ") : "";
    $: {
        if(Array.isArray(value)) {
            selectedIndexes = value.map((optionValue) => optionValuesMap.indexOf(optionValue));
        }else if(value !== undefined && value !== "") {
            selectedIndexes = [optionValuesMap.indexOf(value)];
        }else {
            selectedIndexes = [];
        }
    }
</script>

<style>
    .container {
        font-size: 1rem;
        background-color: #efe0cf;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
        border-radius: 0.25rem 0.25rem 0 0;
        transition: all 0.2s;
        position: relative;
    }

    .container:hover {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .container-active {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
        transform: translateY(1px);
        border-radius: 0.25rem;
        z-index: 5;
    }

    .container-form {
        box-shadow: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.42)
    }

    .container.container-form:hover {
        box-shadow: none;
    }

    .input {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        transition: all 0.2s;
    }

    .container-active .input {
        border-bottom: 2px solid #4e4539;
    }

    .container-error .input {
        border-bottom: 1px solid rgba(186, 26, 26, 0.42);
    }

    .header {
        display: flex;
        flex-flow: column nowrap;
        gap: 0.5em;
        flex: 1 1;
        cursor: pointer;
        overflow: hidden;
    }

    .name {
        font-size: 0.8em;
        color: #1f1b16
    }

    .container-active .name {
        color: #4e4539;
        
    }

    .container-error .name {
        color: #ba1a1a;
    }

    .selected-option {
        font-size: 1em;
        color: #1f1b16;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        user-select: none;
        pointer-events: none;
    }

    .selected-option::placeholder {
        font-size: 1em;
        color: #1f1b16;
    }


    .container-error .selected-option::placeholder {
        color: #ba1a1a;
    }

    .container button {
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }

    .container button:hover {
        filter: brightness(125%);
    }

    .container button:focus {
        filter: brightness(150%);
    }

    .container button:active {
        filter: brightness(80%);
    }

    .container img {
        width: 1.5em;
        height: auto;
        flex: 0;
    }

    .item-list-container {
        position: relative;
    }

    .item-list {
        list-style: none;
        width: 100%;
        max-height: 20em;
        padding: 0.5em 0;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #fff;
        border-radius: 0 0 0.25em 0.25em;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .item-list li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5em 1em;
        text-decoration: none;
        border-bottom: 1px solid #d8ccbf;
    }

    .item-list li:last-child {
        border: none;
    }

    .item-list li.item-selected {
        background-color: rgba(239, 224, 207, 0.55);
        font-style: italic;
    }
</style>

<svelte:body on:click={handleDocumentClick}/>

<div
    role="menu"
    tabindex="0"
    class="container"
    class:container-form={formVariant}
    class:container-active={active}
    class:container-error={error}
    on:click={() => active = true}
    on:keydown={handleKeyDown}
    bind:this={selectElement}
>
    <div class="input">
        <div class="header">
            <div class="name">{label}</div>
            <input
                class="selected-option"
                type="text"
                {name}
                {required}
                placeholder={(error && errorMessage) ? errorMessage : placeholder}
                value={inputValue}
                on:invalid={() => error = errorMessage}
            />
        </div>
        <button on:click|preventDefault|stopPropagation={handleReset}>
            <img src={clearIcon} alt="redefinir"/>
        </button>
    </div>
    {#if active}
        <div class="item-list-container">
            <ul class="item-list">
                {#each options as option, index}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li
                        role="menuitem"
                        class="click-ripple-effect-light"
                        class:item-selected={selectedIndexes.includes(index)}
                        on:click={(event) => handleOptionClick(event, index)}
                    >
                        {option}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
