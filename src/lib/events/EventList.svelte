<script lang="ts">
    import Event from "./Event.svelte";
    import { getAllEvents } from "./events.remote";

    let events = await getAllEvents();
</script>
<style lang="scss">
    p {
        font-style: italic;
        color: var(--COLOR-SUBTEXT);
    }
</style>
{#if events.length > 0}
    {#each events as event, i (event.id)}
        <Event {...event} primary={i === 0} />
    {/each}
{:else}
    <p>Looks like nothing's planned at this time.</p>
{/if}