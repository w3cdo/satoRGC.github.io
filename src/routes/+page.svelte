<script lang="ts">
	import EventList from "#lib/events/EventList.svelte";
    import {INVITE_CODE} from "$app/env/public"
</script>
<style lang="scss">
</style>
<h1>
    A community for rhythm games at Sato
</h1>
<p>
    We play rhythm games competitively and casually and develop engineering skills
    by building controllers and refurbishing arcade cabinets.
</p>
<p>
    You should join our <a href="https://discord.gg/{INVITE_CODE}" class="link">Discord</a> to be notified
    of events, announcements, when and where the next meeting happens, and what it's about.
</p>
<EventList />