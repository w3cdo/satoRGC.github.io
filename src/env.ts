import { building } from "$app/env";
import { defineEnvVars } from "@sveltejs/kit/env";
import z from "zod";

function optionalWhenBuilding<T extends z.ZodType>(i: T) {
    return building ? z.optional(i) : i
}

export const variables = defineEnvVars({
    BOT_TOKEN: {schema: optionalWhenBuilding(z.string())},
    GUILD_ID: {public: true, schema: optionalWhenBuilding(z.string())},
    INVITE_CODE: {public: true, schema: optionalWhenBuilding(z.string())}
})