import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { createHash } from 'crypto';

function getPassword(): string {
	return (env.NOTES_PASSWORD || '').trim();
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
		return json({ error: 'NOTES_PASSWORD env var is not set' }, { status: 500 });
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
