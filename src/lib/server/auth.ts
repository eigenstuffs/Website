import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';

export function getEnv(key: string): string {
	return env[key] || (typeof process !== 'undefined' ? process.env[key] : '') || '';
}

export function getPassword(): string {
	return getEnv('NOTES_PASSWORD').trim();
}

export function getSessionToken(): string {
	return createHash('sha256')
		.update(`notes-session:${getPassword()}`)
		.digest('hex');
}

export function isAuthenticated(cookies: { get: (name: string) => string | undefined }): boolean {
	return cookies.get('notes_session') === getSessionToken();
}

export async function gistFetch(gistId: string, method: string = 'GET', body?: Record<string, unknown>) {
	return await fetch(`https://api.github.com/gists/${gistId}`, {
		method,
		headers: {
			Authorization: `token ${getEnv('GITHUB_TOKEN')}`,
			Accept: 'application/vnd.github.v3+json',
			...(body ? { 'Content-Type': 'application/json' } : {})
		},
		...(body ? { body: JSON.stringify(body) } : {})
	});
}
