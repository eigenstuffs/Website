// ── Types ────────────────────────────────────────────────────────────

export interface SetEntry {
	weight: number;
	reps: number;
}

export interface LogEntry {
	id: string;
	date: string; // ISO date, e.g. "2026-02-08"
	day: string;  // e.g. "upper-a"
	exercise: string; // exercise key
	sets: SetEntry[];
}

export interface ExerciseDefinition {
	name: string;
	type: 'compound' | 'accessory';
	days: string[];
	defaultSets: number;
	defaultReps: string; // e.g. "6-8" or "10"
}

export interface WeeklyCheckins {
	[isoWeek: string]: {
		[dayKey: string]: string | null; // date string or null
	};
}

export interface WorkoutData {
	exercises: Record<string, ExerciseDefinition>;
	logs: LogEntry[];
	weeklyCheckins: WeeklyCheckins;
}

// ── Day definitions ──────────────────────────────────────────────────

export const DAY_LABELS: Record<string, string> = {
	'upper-a': 'Upper A — Aggressive',
	'lower-a': 'Lower A — Progressive',
	'upper-b': 'Upper B — Volume',
	'lower-b': 'Lower B — Hypertrophy'
};

export const DAY_ORDER = ['upper-a', 'lower-a', 'upper-b', 'lower-b'];

// ── Default exercise definitions (from the split) ────────────────────

export const DEFAULT_EXERCISES: Record<string, ExerciseDefinition> = {
	// Upper A
	'chest-press-a': {
		name: 'Chest Press (Top Set + Back-Off)',
		type: 'compound',
		days: ['upper-a'],
		defaultSets: 3,
		defaultReps: '6-12'
	},
	'lat-pulldown-a': {
		name: 'Lat Pulldown',
		type: 'compound',
		days: ['upper-a'],
		defaultSets: 3,
		defaultReps: '8'
	},
	'seated-row-a': {
		name: 'Seated Row',
		type: 'compound',
		days: ['upper-a'],
		defaultSets: 3,
		defaultReps: '10'
	},
	'rear-delt-fly-a': {
		name: 'Rear Delt Fly',
		type: 'accessory',
		days: ['upper-a'],
		defaultSets: 3,
		defaultReps: '12'
	},
	'arms-a': {
		name: 'Arms (Tri or Bi)',
		type: 'accessory',
		days: ['upper-a'],
		defaultSets: 2,
		defaultReps: '10-12'
	},

	// Upper B
	'chest-press-b': {
		name: 'Chest Press (Volume)',
		type: 'compound',
		days: ['upper-b'],
		defaultSets: 3,
		defaultReps: '8-10'
	},
	'lat-pulldown-b': {
		name: 'Lat Pulldown',
		type: 'compound',
		days: ['upper-b'],
		defaultSets: 3,
		defaultReps: '8-10'
	},
	'seated-row-b': {
		name: 'Seated Row',
		type: 'compound',
		days: ['upper-b'],
		defaultSets: 3,
		defaultReps: '10-12'
	},
	'shoulder-press': {
		name: 'Shoulder Press',
		type: 'compound',
		days: ['upper-b'],
		defaultSets: 2,
		defaultReps: '8'
	},
	'rear-delt-fly-b': {
		name: 'Rear Delt Fly',
		type: 'accessory',
		days: ['upper-b'],
		defaultSets: 3,
		defaultReps: '12-15'
	},
	'arms-b': {
		name: 'Arms (Pump)',
		type: 'accessory',
		days: ['upper-b'],
		defaultSets: 2,
		defaultReps: '12'
	},

	// Lower A
	'leg-press-a': {
		name: 'Leg Press',
		type: 'compound',
		days: ['lower-a'],
		defaultSets: 4,
		defaultReps: '8-12'
	},
	'seated-leg-curl-a': {
		name: 'Seated Leg Curl',
		type: 'compound',
		days: ['lower-a'],
		defaultSets: 4,
		defaultReps: '10'
	},
	'leg-extension-a': {
		name: 'Leg Extension',
		type: 'accessory',
		days: ['lower-a'],
		defaultSets: 3,
		defaultReps: '12'
	},
	'single-leg-press-a': {
		name: 'Single-Leg Leg Press',
		type: 'accessory',
		days: ['lower-a'],
		defaultSets: 2,
		defaultReps: '10'
	},
	'calves-a': {
		name: 'Calves (Leg Press)',
		type: 'accessory',
		days: ['lower-a'],
		defaultSets: 3,
		defaultReps: '15'
	},
	'abs-a': {
		name: 'Abs',
		type: 'accessory',
		days: ['lower-a'],
		defaultSets: 3,
		defaultReps: '8-10'
	},

	// Lower B
	'leg-press-b': {
		name: 'Leg Press',
		type: 'compound',
		days: ['lower-b'],
		defaultSets: 3,
		defaultReps: '8'
	},
	'seated-leg-curl-b': {
		name: 'Seated Leg Curl',
		type: 'compound',
		days: ['lower-b'],
		defaultSets: 3,
		defaultReps: '12'
	},
	'leg-extension-b': {
		name: 'Leg Extension',
		type: 'accessory',
		days: ['lower-b'],
		defaultSets: 3,
		defaultReps: '15'
	},
	'single-leg-press-b': {
		name: 'Single-Leg Press',
		type: 'accessory',
		days: ['lower-b'],
		defaultSets: 2,
		defaultReps: '12'
	},
	'calves-b': {
		name: 'Calves',
		type: 'accessory',
		days: ['lower-b'],
		defaultSets: 3,
		defaultReps: '15-20'
	},
	'abs-b': {
		name: 'Abs',
		type: 'accessory',
		days: ['lower-b'],
		defaultSets: 3,
		defaultReps: '10'
	}
};

// ── Utility functions ────────────────────────────────────────────────

export function generateId(): string {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getISOWeek(date: Date): string {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
	return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

export function getExercisesForDay(exercises: Record<string, ExerciseDefinition>, day: string): [string, ExerciseDefinition][] {
	return Object.entries(exercises).filter(([_, ex]) => ex.days.includes(day));
}

export function getLatestLog(logs: LogEntry[], exerciseKey: string): LogEntry | undefined {
	return [...logs]
		.filter(l => l.exercise === exerciseKey)
		.sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function getLastNLogs(logs: LogEntry[], exerciseKey: string, n: number): LogEntry[] {
	return [...logs]
		.filter(l => l.exercise === exerciseKey)
		.sort((a, b) => b.date.localeCompare(a.date))
		.slice(0, n);
}

/** Get the best (heaviest) set from a log entry */
export function getBestSet(log: LogEntry): SetEntry | null {
	if (!log.sets.length) return null;
	return log.sets.reduce((best, s) => (s.weight > best.weight || (s.weight === best.weight && s.reps > best.reps)) ? s : best);
}

/** Detect stagnation: returns 0 (progressing), 1 (watch), 2 (stagnant) */
export function getStagnationLevel(logs: LogEntry[], exerciseKey: string): number {
	const recent = getLastNLogs(logs, exerciseKey, 4);
	if (recent.length < 3) return 0; // not enough data

	const bestSets = recent.map(l => getBestSet(l)).filter(Boolean) as SetEntry[];
	if (bestSets.length < 3) return 0;

	// Check if best weight or reps improved across last 3 sessions
	const [latest, prev1, prev2] = bestSets;
	const latestScore = latest.weight * latest.reps;
	const prev1Score = prev1.weight * prev1.reps;
	const prev2Score = prev2.weight * prev2.reps;

	// Progressing if latest is better than at least one of the previous
	if (latestScore > prev1Score || latestScore > prev2Score) return 0;

	// Stagnant if 4+ sessions without improvement
	if (bestSets.length >= 4) {
		const prev3 = bestSets[3];
		const prev3Score = prev3.weight * prev3.reps;
		if (latestScore <= prev3Score) return 2;
	}

	return 1; // watch
}

export function createDefaultData(): WorkoutData {
	return {
		exercises: { ...DEFAULT_EXERCISES },
		logs: [],
		weeklyCheckins: {}
	};
}
