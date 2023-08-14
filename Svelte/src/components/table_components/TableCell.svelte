<script>
    import { getContext } from "svelte";

    export let align = "center";
    export let valign = "center";
    export let wrap = false;
    export let minWidth = "10rem";

    let isHeader = getContext('header');

    $: elementStyles = `
        ${(align && align !== "center") ? `text-align: ${align};` : ""}
        ${(valign && valign !== "center") ? `vertical-align: ${valign};` : ""}
        ${(wrap) ? "white-space: normal;" : ""}
        ${(wrap) ? `min-width: ${minWidth};` : ""}
    `.trim().replace(/\n\s*/, ' ');
</script>

<style>
    th, td {
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        padding: 1em 0.8em;
        cursor: default;
    }

    th {
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #b06400;
        font-size: 1.4em;
        font-weight: 500;
        color: #fff;
        line-height: 1.5em;
        white-space: nowrap;
        padding: 0.25em 1em;
        user-select: none;
    }

    td {
        font-size: 0.85em;
        border-bottom: 1px solid #9b8f80;
    }
</style>

{#if isHeader}
<th style={elementStyles}>
    <slot/>
</th>
{:else}
<td style={elementStyles}>
    <slot/>
</td>
{/if}
