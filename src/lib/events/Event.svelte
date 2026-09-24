<script lang="ts">
	import { GuildScheduledEventStatus } from "discord-api-types/v10";
    import { INVITE_CODE } from "$app/env/public"
	import type { SimplifiedEvent } from "./events.remote";
	import relativeTime from "./relativeTime";

    let { name, status, scheduled_start_time, scheduled_end_time, id, description, primary = false }: SimplifiedEvent & { primary?: boolean } = $props()
</script>
<style>
    .description {
        font-weight: 600;
        font-size: var(--FONT-SIZE-SMALL);
        color: var(--COLOR-SUBTEXT);
        display: block;
    }
    h3 {
        font-size: var(--FONT-SIZE-REGULAR);
        margin: 0;
        text-decoration: underline;
    }
    p {
        margin: 0;
        color: var(--COLOR-SUBTEXT);
    }
    .event {
        transition: 0.15s transform;
        padding: .5em 0;
        --background: transparent;
        border-image: conic-gradient(var(--background) 0 0) fill 0/0/0 100vw;
        transform: translateX(0px);
    }
    .event.primary {
        --background: var(--COLOR-HIGHLIGHT-BACKGROUND)
    }
    a:hover, a:focus-visible {
        .event {
            transform: translateX(.5em);
            transition-timing-function: cubic-bezier(.08,.69,.51,2);
        }
    }
</style>
<a href="https://discord.com/app/invite-with-guild-onboarding/{INVITE_CODE}?event={id}">
    <div class="event {primary ? "primary" : ""}">
        <span class="description">
            {#if status === GuildScheduledEventStatus.Active}
                Happening now
                {#if scheduled_end_time}
                    &bull; Ends {relativeTime((new Date(scheduled_end_time).getTime() - Date.now()) / 1000)}
                {/if}
            {:else}
                <!-- look into using temporal in the future -->
                {#if primary}
                    <strong>Up next</strong> &bull;
                {/if}
                {relativeTime((new Date(scheduled_start_time).getTime() - Date.now()) / 1000)}
            {/if}
        </span>
        <h3>
            {name}
        </h3>
        {#if description}
            <p>
                {description.length > 100 ? description.slice(0, 100)+"..." : description}
            </p>
        {/if}
    </div>
</a>