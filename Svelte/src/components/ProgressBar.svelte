<script>
    export let width = "25rem";
    export let value;

    $: indefinite = (typeof value !== "number") || value < 0 || value > 100;
</script>

<style>
    div {
        width: 25rem;
        height: 0.3rem;
        background-color: #efe0cf;
        position: relative;
        overflow: hidden;
    }

    div::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: var(--filled-width);
        height: 100%;
        background-color: #7e5700;

    }

    div.indefinite::before {
        width: 100%;
        animation: move-indefinite-progress-bar 1.5s ease-in-out infinite;
    }

    @keyframes move-indefinite-progress-bar {
        0% {
        transform: translateX(-100%);
        }
        100% {
        transform: translateX(100%);
        }
    }
</style>

<div class:indefinite style:width style:--filled-width={value + "%"}/>
