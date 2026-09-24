import { query } from "$app/server";
import { GUILD_ID } from "$app/env/public"
import { BOT_TOKEN } from "$app/env/private"
import type { APIGuildScheduledEvent } from "discord-api-types/v10";

// strip a few things from the event so we don't put out like,
// member info or anything
function simplifyEvent({id, name, description, scheduled_start_time, scheduled_end_time, status, image}: APIGuildScheduledEvent) {
    return {
        id,
        name,
        description,
        scheduled_start_time,
        scheduled_end_time,
        status,
        image: image ? `https://cdn.discordapp.com/guild-events/${id}/${image}.png` : undefined
    }
}
export type SimplifiedEvent = ReturnType<typeof simplifyEvent>

// TODO: actual proper ttl-cache
let staleEvents: {expire: number, data: APIGuildScheduledEvent[]} = {expire: 0, data: []};

async function fetchEvents() {
    const eventsRequest = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/scheduled-events`, {
        headers: { "User-Agent": "DiscordBot (satoRGC-web, 1.0)" ,"Authorization": `Bot ${BOT_TOKEN}` }
    })
    if (!eventsRequest.ok) throw eventsRequest;
    return eventsRequest.json()
}

export const getAllEvents = query(async () => {
    // TODO: add proper ratelimiting instead
    if (staleEvents.expire < Date.now())
        staleEvents = { expire: Date.now() + 30*60*60*1000, data: await fetchEvents() }
    return staleEvents.data.map(simplifyEvent)
})