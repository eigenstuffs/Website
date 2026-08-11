/** Time-keyed sky palettes for the procedural sky band. */

export type Vec3 = [number, number, number];

export type SkyPalette = {
	/** Hour of day (0–24) */
	hour: number;
	sunX: number;
	sunY: number;
	sunBloom: number;
	sunGlow: Vec3;
	skyZenith: Vec3;
	skyMid: Vec3;
	skyLow: Vec3;
	starAmt: number;
	cirrusAmt: number;
	cirrusTint: Vec3;
	/** Near coastal range silhouette */
	landNear: Vec3;
	/** Far coastal range */
	landFar: Vec3;
	/** Water body color under reflections */
	seaBody: Vec3;
};

export const SKY_STOPS: SkyPalette[] = [
	{
		hour: 0,
		sunX: 0.72,
		sunY: -0.32,
		sunBloom: 0.14,
		sunGlow: [0.55, 0.65, 0.95],
		skyZenith: [0.05, 0.06, 0.14],
		skyMid: [0.1, 0.12, 0.24],
		skyLow: [0.22, 0.24, 0.4],
		starAmt: 1,
		cirrusAmt: 0.35,
		cirrusTint: [0.4, 0.45, 0.62],
		landNear: [0.04, 0.05, 0.1],
		landFar: [0.08, 0.09, 0.16],
		seaBody: [0.06, 0.08, 0.16]
	},
	{
		hour: 5,
		sunX: 0.08,
		sunY: -0.06,
		sunBloom: 0.3,
		sunGlow: [1, 0.55, 0.48],
		skyZenith: [0.14, 0.14, 0.3],
		skyMid: [0.32, 0.24, 0.44],
		skyLow: [0.88, 0.52, 0.46],
		starAmt: 0.5,
		cirrusAmt: 0.72,
		cirrusTint: [0.92, 0.72, 0.86],
		landNear: [0.12, 0.08, 0.14],
		landFar: [0.28, 0.16, 0.22],
		seaBody: [0.18, 0.12, 0.22]
	},
	{
		hour: 6.5,
		sunX: 0.1,
		sunY: 0.1,
		sunBloom: 0.42,
		sunGlow: [1, 0.62, 0.45],
		skyZenith: [0.3, 0.34, 0.6],
		skyMid: [0.9, 0.56, 0.64],
		skyLow: [1, 0.74, 0.58],
		starAmt: 0.06,
		cirrusAmt: 0.88,
		cirrusTint: [1.05, 0.86, 0.9],
		landNear: [0.22, 0.12, 0.16],
		landFar: [0.48, 0.28, 0.32],
		seaBody: [0.28, 0.18, 0.28]
	},
	{
		hour: 8,
		sunX: 0.2,
		sunY: 0.3,
		sunBloom: 0.22,
		sunGlow: [1, 0.8, 0.52],
		skyZenith: [0.24, 0.44, 0.8],
		skyMid: [0.52, 0.7, 0.92],
		skyLow: [0.96, 0.88, 0.78],
		starAmt: 0,
		cirrusAmt: 0.82,
		cirrusTint: [1.02, 0.99, 0.96],
		landNear: [0.28, 0.32, 0.28],
		landFar: [0.45, 0.5, 0.48],
		seaBody: [0.22, 0.36, 0.48]
	},
	{
		hour: 12,
		sunX: 0.58,
		sunY: 0.95,
		sunBloom: 0.11,
		sunGlow: [1, 0.98, 0.92],
		skyZenith: [0.2, 0.5, 0.9],
		skyMid: [0.42, 0.7, 0.96],
		skyLow: [0.82, 0.92, 0.99],
		starAmt: 0,
		cirrusAmt: 0.78,
		cirrusTint: [1, 1, 1],
		landNear: [0.32, 0.38, 0.3],
		landFar: [0.5, 0.56, 0.52],
		seaBody: [0.18, 0.4, 0.55]
	},
	{
		hour: 16,
		sunX: 0.8,
		sunY: 0.44,
		sunBloom: 0.22,
		sunGlow: [1, 0.82, 0.45],
		skyZenith: [0.24, 0.42, 0.74],
		skyMid: [0.58, 0.66, 0.84],
		skyLow: [0.96, 0.84, 0.66],
		starAmt: 0,
		cirrusAmt: 0.82,
		cirrusTint: [1.05, 0.96, 0.9],
		landNear: [0.3, 0.28, 0.22],
		landFar: [0.48, 0.42, 0.36],
		seaBody: [0.22, 0.34, 0.46]
	},
	{
		hour: 18.5,
		sunX: 0.9,
		sunY: 0.14,
		sunBloom: 0.44,
		sunGlow: [1, 0.55, 0.32],
		skyZenith: [0.22, 0.24, 0.5],
		skyMid: [0.84, 0.46, 0.54],
		skyLow: [1, 0.64, 0.4],
		starAmt: 0.04,
		cirrusAmt: 0.92,
		cirrusTint: [1.1, 0.84, 0.76],
		landNear: [0.2, 0.1, 0.12],
		landFar: [0.42, 0.22, 0.24],
		seaBody: [0.24, 0.14, 0.22]
	},
	{
		hour: 20,
		sunX: 0.92,
		sunY: -0.04,
		sunBloom: 0.32,
		sunGlow: [1, 0.48, 0.4],
		skyZenith: [0.12, 0.12, 0.3],
		skyMid: [0.34, 0.24, 0.46],
		skyLow: [0.8, 0.5, 0.52],
		starAmt: 0.55,
		cirrusAmt: 0.68,
		cirrusTint: [0.88, 0.68, 0.82],
		landNear: [0.1, 0.07, 0.12],
		landFar: [0.22, 0.14, 0.22],
		seaBody: [0.12, 0.1, 0.2]
	},
	{
		hour: 22,
		sunX: 0.76,
		sunY: -0.28,
		sunBloom: 0.15,
		sunGlow: [0.6, 0.68, 0.95],
		skyZenith: [0.06, 0.07, 0.16],
		skyMid: [0.1, 0.12, 0.24],
		skyLow: [0.24, 0.26, 0.42],
		starAmt: 1,
		cirrusAmt: 0.4,
		cirrusTint: [0.42, 0.48, 0.64],
		landNear: [0.05, 0.06, 0.12],
		landFar: [0.1, 0.11, 0.18],
		seaBody: [0.07, 0.09, 0.18]
	},
	{
		hour: 24,
		sunX: 0.72,
		sunY: -0.32,
		sunBloom: 0.14,
		sunGlow: [0.55, 0.65, 0.95],
		skyZenith: [0.05, 0.06, 0.14],
		skyMid: [0.1, 0.12, 0.24],
		skyLow: [0.22, 0.24, 0.4],
		starAmt: 1,
		cirrusAmt: 0.35,
		cirrusTint: [0.4, 0.45, 0.62],
		landNear: [0.04, 0.05, 0.1],
		landFar: [0.08, 0.09, 0.16],
		seaBody: [0.06, 0.08, 0.16]
	}
];

function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
	return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Decimal hour in [0, 24). */
export function hourOfDay(date: Date): number {
	return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

/** Apply scrub offset in hours, wrap into [0, 24). */
export function wrapHour(hour: number): number {
	return ((hour % 24) + 24) % 24;
}

export function paletteAtHour(hour: number): SkyPalette {
	const h = wrapHour(hour);
	const stops = SKY_STOPS;

	let i0 = 0;
	for (let i = 0; i < stops.length - 1; i++) {
		if (h >= stops[i].hour && h <= stops[i + 1].hour) {
			i0 = i;
			break;
		}
	}

	const a = stops[i0];
	const b = stops[i0 + 1];
	const span = b.hour - a.hour || 1;
	const t = (h - a.hour) / span;

	return {
		hour: h,
		sunX: lerp(a.sunX, b.sunX, t),
		sunY: lerp(a.sunY, b.sunY, t),
		sunBloom: lerp(a.sunBloom, b.sunBloom, t),
		sunGlow: lerpVec3(a.sunGlow, b.sunGlow, t),
		skyZenith: lerpVec3(a.skyZenith, b.skyZenith, t),
		skyMid: lerpVec3(a.skyMid, b.skyMid, t),
		skyLow: lerpVec3(a.skyLow, b.skyLow, t),
		starAmt: lerp(a.starAmt, b.starAmt, t),
		cirrusAmt: lerp(a.cirrusAmt, b.cirrusAmt, t),
		cirrusTint: lerpVec3(a.cirrusTint, b.cirrusTint, t),
		landNear: lerpVec3(a.landNear, b.landNear, t),
		landFar: lerpVec3(a.landFar, b.landFar, t),
		seaBody: lerpVec3(a.seaBody, b.seaBody, t)
	};
}

export function cssGradientFromPalette(p: SkyPalette): string {
	const toRgb = (v: Vec3) =>
		`rgb(${Math.round(v[0] * 255)}, ${Math.round(v[1] * 255)}, ${Math.round(v[2] * 255)})`;
	return `linear-gradient(180deg, ${toRgb(p.skyZenith)} 0%, ${toRgb(p.skyMid)} 40%, ${toRgb(p.skyLow)} 70%, #ffffff 100%)`;
}
