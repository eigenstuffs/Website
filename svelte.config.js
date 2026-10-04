import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Set a string explicitly so the adapter emits a valid Vercel function config.
		adapter: adapter({ runtime: 'nodejs24.x' })
	}
};

export default config;
