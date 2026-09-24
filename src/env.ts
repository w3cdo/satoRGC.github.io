import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    BOT_TOKEN: {},
    GUILD_ID: {public: true},
    INVITE_CODE: {public: true}
})