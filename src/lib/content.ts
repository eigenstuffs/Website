/** Site content shared by the home page and the section pages. */

export const freeSystemsUrl = 'https://freesystems.substack.com/';

export const robloxEssayUrl = 'https://freesystems.substack.com/p/inside-the-roblox-casino';

export const email = 'bohrnsen@umich.edu';

export const officeHoursUrl = 'https://calendly.com/bohrnsen-umich/office-hours';

export const contactLinks = [
	{ label: 'README', href: '/readme' },
	{ label: 'CV', href: '/cv' },
	{ label: 'GitHub', href: 'https://github.com/eigenstuffs' },
	{ label: 'X', href: 'https://x.com/eigenstuffs' }
];

/** True for links that leave the site (and so open in a new tab). */
export const isExternal = (href: string) => /^https?:/.test(href);
