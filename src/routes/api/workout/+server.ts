import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isAuthenticated, gistFetch, getEnv } from '$lib/server/auth';

export const config = {
	runtime: 'nodejs20.x'
};

const DATA_FILENAME = 'workout_data.json';

function workoutGistFetch(method: string = 'GET', body?: Record<string, unknown>) {
	return gistFetch(getEnv('WORKOUT_GIST_ID'), method, body);
}

// GET - fetch workout data from the gist
export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const gistId = getEnv('WORKOUT_GIST_ID');
	if (!gistId) {
		return json({ error: 'WORKOUT_GIST_ID not configured' }, { status: 500 });
	}

	const res = await workoutGistFetch();
	if (!res.ok) {
		return json({ error: 'Failed to fetch workout data' }, { status: 500 });
	}

	const gist = await res.json();
	const file = gist.files?.[DATA_FILENAME];

	if (!file || !file.content) {
		// Return empty default structure
		return json({
			data: {
				exercises: {},
				logs: [],
				weeklyCheckins: {}
			}
		});
	}

	try {
		const data = JSON.parse(file.content);
		return json({ data });
	} catch {
		return json({ error: 'Invalid workout data format' }, { status: 500 });
	}
};

// PUT - update workout data
export const PUT: RequestHandler = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const gistId = getEnv('WORKOUT_GIST_ID');
	if (!gistId) {
		return json({ error: 'WORKOUT_GIST_ID not configured' }, { status: 500 });
	}

	const { data } = await request.json();
	if (!data) {
		return json({ error: 'Data is required' }, { status: 400 });
	}

	const res = await workoutGistFetch('PATCH', {
		files: {
			[DATA_FILENAME]: {
				content: JSON.stringify(data, null, 2)
			}
		}
	});

	if (!res.ok) {
		return json({ error: 'Failed to save workout data' }, { status: 500 });
	}

	return json({ success: true });
};
