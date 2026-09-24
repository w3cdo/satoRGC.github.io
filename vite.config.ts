import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import {readFile, writeFile} from "node:fs/promises"
import subsetFont from 'subset-font';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
			extensions: ['.svelte', '.svx', '.md'],
			experimental: { remoteFunctions: true }
		}),
		{
			name: "rgc-subset-font",
			async generateBundle(this, opt, bundle) {
				// this is dumb but it'll woooorrkk
				// also pretty unoptimized
				const charset = Object.values(bundle).filter(e => "code" in e).map(e => e.code).join(" ");
				for (const [name, obj] of Object.entries(bundle)) {
					if (!name.endsWith(".ttf") || ("code" in obj))
						continue
					// TODO: use woff2 for compression
					console.log(`subsetting font ${name}`)
					obj.source = await subsetFont(obj.source, charset, {
						targetFormat: "sfnt"
					})
				}
			}
		}
	]
});
