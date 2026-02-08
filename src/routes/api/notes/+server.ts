import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { createHash } from 'crypto';

function getEnv(key: string): string {
	return env[key] || (typeof process !== 'undefined' ? process.env[key] : '') || '';
}

function getSessionToken(): string {
	return createHash('sha256')
		.update(`notes-session:${getEnv('NOTES_PASSWORD').trim()}`)
		.digest('hex');
}

function isAuthenticated(cookies: { get: (name: string) => string | undefined }): boolean {
	return cookies.get('notes_session') === getSessionToken();
}

async function gistFetch(method: string = 'GET', body?: Record<string, unknown>) {
	return await fetch(`https://api.github.com/gists/${getEnv('GIST_ID')}`, {
		method,
		headers: {
			Authorization: `token ${getEnv('GITHUB_TOKEN')}`,
			Accept: 'application/vnd.github.v3+json',
			...(body ? { 'Content-Type': 'application/json' } : {})
		},
		...(body ? { body: JSON.stringify(body) } : {})
	});
}

// GET - fetch all notes from the gist
export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const res = await gistFetch();
	if (!res.ok) {
		return json({ error: 'Failed to fetch notes' }, { status: 500 });
	}

	const gist = await res.json();
	const notes = Object.entries(gist.files || {}).map(
		([filename, file]: [string, { content?: string }]) => ({
			filename,
			content: (file as { content?: string }).content || ''
		})
	);

	return json({ notes });
};

// POST - create a new note
export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { filename, content } = await request.json();
	if (!filename) {
		return json({ error: 'Filename is required' }, { status: 400 });
	}

	const res = await gistFetch('PATCH', {
		files: {
			[filename]: {
				content: content || `# ${filename.replace(/\.md$/, '')}\n`
			}
		}
	});

	if (!res.ok) {
		return json({ error: 'Failed to create note' }, { status: 500 });
	}

	return json({ success: true });
};

// PUT - update a note (content and/or rename)
export const PUT: RequestHandler = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { filename, content, newFilename } = await request.json();
	if (!filename) {
		return json({ error: 'Filename is required' }, { status: 400 });
	}

	const fileUpdate: Record<string, string> = { content };
	if (newFilename && newFilename !== filename) {
		fileUpdate.filename = newFilename;
	}

	const res = await gistFetch('PATCH', {
		files: { [filename]: fileUpdate }
	});

	if (!res.ok) {
		return json({ error: 'Failed to update note' }, { status: 500 });
	}

	return json({ success: true });
};

// DELETE - remove a note from the gist
export const DELETE: RequestHandler = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { filename } = await request.json();
	if (!filename) {
		return json({ error: 'Filename is required' }, { status: 400 });
	}

	const res = await gistFetch('PATCH', {
		files: { [filename]: null }
	});

	if (!res.ok) {
		return json({ error: 'Failed to delete note' }, { status: 500 });
	}

	return json({ success: true });
};
