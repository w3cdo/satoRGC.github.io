<script lang="ts">
	import EventList from "#lib/events/EventList.svelte";
    import {INVITE_CODE} from "$app/env/public"
</script>
<style lang="scss">
</style>
<svelte:head>
    <title>satoRGC</title>
    <meta name="og:title" content="A community for rhythm games at Sato" />
    <meta name="og:description" content="satoRGC is Sato Academy's rhythm game club. We engage in both competitive and casual play in addition to building controllers and refurbishing arcade cabinets." />
    <meta name="theme-color" content="#FFDDFF" />
</svelte:head>
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