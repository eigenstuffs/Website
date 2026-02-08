import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { createHash } from 'crypto';

export const config = {
	runtime: 'nodejs20.x'
};

function getPassword(): string {
	// Try dynamic env first, fall back to process.env
	const fromDynamic = env.NOTES_PASSWORD;
	const fromProcess = typeof process !== 'undefined' ? process.env.NOTES_PASSWORD : undefined;
	return (fromDynamic || fromProcess || '').trim();
}

function getSessionToken(): string {
	return createHash('sha256')
		.update(`notes-session:${getPassword()}`)
		.digest('hex');
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (cookies.get('notes_session') === getSessionToken()) {
		return json({ authenticated: true });
	}
	return json({ authenticated: false }, { status: 401 });
};

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { password } = await request.json();
	const storedPassword = getPassword();

	if (!storedPassword) {
		// Debug: check what env keys exist (names only, no values)
		const dynamicKeys = Object.keys(env)
			.filter(k => /(NOTE|GIST|GITHUB|VERCEL|NODE)/.test(k))
			.sort();
		const processKeys = typeof process !== 'undefined'
			? Object.keys(process.env)
				.filter(k => /(NOTE|GIST|GITHUB|VERCEL|NODE)/.test(k))
				.sort()
			: [];
		const runtimeInfo = typeof process !== 'undefined'
			? {
				nodeVersion: process.version,
				vercel: process.env.VERCEL || null,
				vercelEnv: process.env.VERCEL_ENV || null,
				vercelRegion: process.env.VERCEL_REGION || null,
				vercelUrl: process.env.VERCEL_URL || null
			}
			: { nodeVersion: null, vercel: null, vercelEnv: null, vercelRegion: null, vercelUrl: null };
		return json({
			error: 'NOTES_PASSWORD env var is not set',
			debug: { dynamicKeys, processKeys, runtimeInfo }
		}, { status: 500 });
	}

	if (password !== storedPassword) {
		return json({
			error: 'Invalid password',
			debug: {
				inputLength: password?.length,
				storedLength: storedPassword.length,
				inputType: typeof password,
				match: password === storedPassword
			}
		}, { status: 401 });
	}

	cookies.set('notes_session', getSessionToken(), {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 7
	});

	return json({ success: true });
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('notes_session', { path: '/' });
	return json({ success: true });
};
