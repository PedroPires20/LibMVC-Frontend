<script>
    export let variant = "primary";
    export let disabled = false;

    variant = (/primary|secondary/.test(variant)) ? variant : "primary";
</script>

<style>
    button {
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5em;
        letter-spacing: 0.01em;
        text-align: center;
        padding: 0.65em 1.5em;
        border: none;
        border-radius: 100px;
        outline: none;
        overflow: hidden;
        position: relative;
    }

    button:disabled {
        color: #1F1B16;
        opacity: 0.4;
    }

    /* Adding click-ripple effect (the after element represents the state layer) */

    button::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        border-radius: inherit;
        background-color: rgba(255, 255, 255, 0.0);
        background-position: center;
        transition: background 0.5s;
    }

    button:hover::after {
        background: rgba(255, 255, 255, 0.1) radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.1) 1%) center/15000%;
    }

    button:focus:after {
        background: rgba(255, 255, 255, 0.24) radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.24) 1%) center/15000%;
    }

    button:active::after {
        background-color: rgba(255, 255, 255, 0.38);
        background-size: 100%;
        transition: background 0s;
    }

    button:disabled::after {
        display: none;
    }

    /* Defining the available button styles (variating background colors) */

    .primary {
        background-color: #604100;
        color: #fff;
        box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3);
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .secondary {
        background-color: #fbbb49;
        color: #432c00;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
    }

</style>

<button
    class={variant}
    disabled={disabled}
    aria-disabled={disabled}
    on:click
>
    <slot/>
</button>