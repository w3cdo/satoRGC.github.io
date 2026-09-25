<script lang="ts">
	import { GuildScheduledEventStatus } from "discord-api-types/v10";
    import { INVITE_CODE } from "$app/env/public"
	import type { SimplifiedEvent } from "./events.remote";
	import relativeTime from "./relativeTime";

    let { name, status, scheduled_start_time, scheduled_end_time, id, description, primary = false, image }: SimplifiedEvent & { primary?: boolean } = $props()
</script>
<style lang="scss">
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
        transform: translateX(0px);
    }
    .accessory {
        position: absolute;
        object-fit: cover;
        left: -1em;
        top: 0;
        // I dislike this
        width: calc(100% + 2em);
        height: 100%;
        opacity: 0.05;
    }
    a {
        display: block;
        position: relative;
    }
    @keyframes pulsing {
        0% {
            box-shadow: 0px 0px 1em var(--COLOR-HIGHLIGHT-TEXT);
        }
        100% {
            box-shadow: 0px 0px 2em var(--COLOR-HIGHLIGHT-TEXT);
        }
    }
    a.primary {
        --background: var(--COLOR-HIGHLIGHT-BACKGROUND);
        border-image: conic-gradient(var(--background) 0 0) fill 0/0/0 100vw;
        background: var(--background);
        margin: 0.5em 0;
        .accessory {
            opacity: 0.1;
            // put box-shadow on accessory because it's the only one
            // that bleeds out of the padding
            box-shadow: 0px 0px 1em var(--COLOR-HIGHLIGHT-TEXT);
            animation: 5s linear alternate pulsing infinite;
        }
    }
    a:hover, a:focus-visible {
        .event {
            transform: translateX(.5em);
            transition-timing-function: cubic-bezier(.08,.69,.51,2);
        }
    }
</style>
<a class={primary ? "primary" : ""} href="https://discord.com/app/invite-with-guild-onboarding/{INVITE_CODE}?event={id}">
    {#if image}
        <img src={image} alt="" class="accessory">
    {/if}
    <div class="event">
        <span class="description">
            <!-- this is not pretty -->
            {#if status === GuildScheduledEventStatus.Active || (status === GuildScheduledEventStatus.Scheduled && Date.now() > new Date(scheduled_start_time).getTime())}
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
                {description.length > 150 ? description.slice(0, 150)+"..." : description}
            </p>
        {/if}
    </div>
</a>