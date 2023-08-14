<script>
    import { setContext } from "svelte";

    setContext('header', true);
</script>

<style>
    thead {
        position: sticky;
        top: 0;
        z-index: 1;
        box-shadow: 0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3);
    }
</style>

<thead>
    <slot/>
</thead>
