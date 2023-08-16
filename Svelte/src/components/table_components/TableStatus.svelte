<script>
    import ProgressBar from "../ProgressBar.svelte";
    import errorIcon from "../../assets/error_icon.svg";

    export let loading = false;
    export let error = false;
    export let message = "";
</script>

<style>
    div {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    img {
        width: 2.8rem;
        height: auto;
    }

    p {
        color: #34302a;
        font-weight: 500;
        line-height: 1.5rem;
    }
</style>

<tbody>
    <tr>
        <td>
            <div>
                {#if error}
                    <img src={errorIcon} alt="Error"/>
                {:else if loading}
                    <ProgressBar/>
                {/if}
                <p>{message}</p>
            </div>
        </td>
    </tr>
</tbody>
