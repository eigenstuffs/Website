import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Vercel picks the runtime on deploy; locally the adapter rejects Node > 22
		// unless one is named.
		adapter: adapter({ runtime: process.env.VERCEL ? undefined : 'nodejs22.x' })
	}
};

export default config;
