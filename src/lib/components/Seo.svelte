<script>
	import { page } from '$app/stores';

	/** Page title, without the site suffix. Omit on the home page. */
	export let title = '';
	export let description = '';
	/** Path to the share image, relative to the site root. */
	export let image = '/og.png';
	/** 'website' for index pages, 'article' for posts. */
	export let type = 'website';

	const SITE = 'Branden Bohrnsen';
	const ORIGIN = 'https://branden.zip';

	$: fullTitle = title ? `${title} — ${SITE}` : SITE;
	$: canonical = `${ORIGIN}${$page.url.pathname.replace(/\/$/, '') || '/'}`;
	$: imageUrl = image.startsWith('http') ? image : `${ORIGIN}${image}`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={SITE} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={fullTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
