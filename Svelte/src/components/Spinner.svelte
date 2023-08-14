<script>
    export let diameter = "65px";
    export let color = "#7e5700";
</script>

<style>
    @keyframes spinner-rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes spinner-dash-draw {
        0% {
            stroke-dashoffset: 188;
            transform: rotate(0);
        }

        50% {
        stroke-dashoffset: 47;
        transform: rotate(135deg);
        }

        100% {
        stroke-dashoffset: 187;
        transform: rotate(450deg);
        }
    }

    svg {
        animation: spinner-rotation 1.5s linear infinite;
    }

    circle {
        stroke-dasharray: 188;
        stroke-dashoffset: 0;
        transform-origin: center;
        animation: spinner-dash-draw 1.5s ease-in-out infinite;
    }
</style>

<svg viewBox="0 0 66 66" width={diameter} height={diameter}>
    <circle
        fill="none"
        stroke={color}
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
    />
</svg>
