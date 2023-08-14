<script>
    import { useLocation, link } from "svelte-routing";
    import { cubicOut } from "svelte/easing";

    function menuSlideTransition(node, { duration = 300 }) {
        return {
            duration,
            css: (t) => `transform: translate(-${100 * (1 - cubicOut(t))}%)`
        }
    }

    let location = useLocation();
</script>

<style>
    nav {
        height: 100%;
        position: fixed;
        z-index: 10;
        background: linear-gradient(0deg, rgba(251, 187, 73, 0.08), rgba(251, 187, 73, 0.08)), #1f1b16;
        font-size: 2rem;
        transition: transform 0.3s ease-out;
    }

    ul {
        list-style: none;
    }

    li {
        color: #eae1d9;
        line-height: 1.25em;
        cursor: pointer;
    }

    li:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    li:not(:last-child) {
        border-bottom: 1px solid #4e4539;
    }

    a.selected{
        background-color: #4e4539;
        position: relative;
        cursor: default;
    }

    a.selected:hover {
        background-color: #4e4539;
        cursor: default;
    }

    a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0.8em 4em 0.8em 1em;
        text-decoration: none;
        color: #eae1d9;
    }

    a:visited {
        color: inherit;
    }
</style>

<nav transition:menuSlideTransition>
    <ul>
        <li>
            <a
                use:link 
                href="/collection"
                class:selected={$location.pathname === "/collection"}
                on:click
            >
                Acervo
            </a>
        </li>
        <li>
            <a
                use:link
                href="/loans"
                class:selected={$location.pathname === "/loans"}
                on:click
            >
                Empréstimos
            </a>
        </li>
    </ul>
</nav>