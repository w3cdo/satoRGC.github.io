<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import Navbar from "./Navbar.svelte"
	import "#lib/root.scss"
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="og:site_name" content="satoRGC" />
</svelte:head>

<style>
	main {
		padding: 1em;
		overflow-x: hidden;
	}
</style>
<Navbar />
<main>
	{@render children()}
</main>