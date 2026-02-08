import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthenticated, gistFetch, getEnv } from '$lib/server/auth';

export const config = {
	runtime: 'nodejs20.x'
};

const META_FILENAME = '.notes-meta.json';

function notesGistFetch(method: string = 'GET', body?: Record<string, unknown>) {
	return gistFetch(getEnv('GIST_ID'), method, body);
}

function parseMeta(content: string | undefined): Record<string, number> {
	if (!content) return {};
	try {
		const parsed = JSON.parse(content);
		if (parsed && typeof parsed === 'object' && typeof parsed.updatedAt === 'object') {
			return parsed.updatedAt as Record<string, number>;
		}
		return {};
	} catch {
		return {};
	}
}

async function loadMeta(): Promise<Record<string, number>> {
	const res = await notesGistFetch();
	if (!res.ok) return {};
	const gist = await res.json();
	const metaContent = gist.files?.[META_FILENAME]?.content;
	return parseMeta(metaContent);
}

function buildMetaContent(updatedAt: Record<string, number>) {
	return JSON.stringify({ updatedAt }, null, 2);
}

// GET - fetch all notes from the gist
export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const res = await notesGistFetch();
	if (!res.ok) {
		return json({ error: 'Failed to fetch notes' }, { status: 500 });
	}

	const gist = await res.json();
	const metaUpdatedAt = parseMeta(gist.files?.[META_FILENAME]?.content);
	const notes = Object.entries(gist.files || {})
		.filter(([filename]) => filename !== META_FILENAME)
		.map(([filename, file]: [string, { content?: string }]) => ({
			filename,
			content: (file as { content?: string }).content || '',
			lastEdited: metaUpdatedAt[filename] || 0
		}))
		.sort((a, b) => b.lastEdited - a.lastEdited);

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

	const updatedAt = await loadMeta();
	updatedAt[filename] = Date.now();

	const res = await notesGistFetch('PATCH', {
		files: {
			[filename]: {
				content: content || `# ${filename.replace(/\.md$/, '')}\n`
			},
			[META_FILENAME]: {
				content: buildMetaContent(updatedAt)
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

	const updatedAt = await loadMeta();
	const now = Date.now();
	updatedAt[newFilename || filename] = now;
	if (newFilename && newFilename !== filename) {
		delete updatedAt[filename];
	}

	const res = await notesGistFetch('PATCH', {
		files: {
			[filename]: fileUpdate,
			[META_FILENAME]: {
				content: buildMetaContent(updatedAt)
			}
		}
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

	const updatedAt = await loadMeta();
	delete updatedAt[filename];

	const res = await notesGistFetch('PATCH', {
		files: {
			[filename]: null,
			[META_FILENAME]: {
				content: buildMetaContent(updatedAt)
			}
		}
	});

	if (!res.ok) {
		return json({ error: 'Failed to delete note' }, { status: 500 });
	}

	return json({ success: true });
};
