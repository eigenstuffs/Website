/** Time-keyed sky palettes for the procedural sky band. */

export type Vec3 = [number, number, number];

export type SkyPalette = {
	/** Hour of day (0–24) */
	hour: number;
	/** Sun position, normalized: x in [0,1] across the band, y in [0,1] up the band. */
	sunX: number;
	sunY: number;
	/** 0 = tight highlight, 1 = broad diffuse glow. */
	sunBloom: number;
	sunGlow: Vec3;
	skyZenith: Vec3;
	skyMid: Vec3;
	skyLow: Vec3;
	starAmt: number;
	cirrusAmt: number;
	cirrusTint: Vec3;
};

export const SKY_STOPS: SkyPalette[] = [
	{
		hour: 0,
		sunX: 0.78,
		sunY: -0.35,
		sunBloom: 0.16,
		sunGlow: [0.3, 0.36, 0.55],
		skyZenith: [0.04, 0.05, 0.1],
		skyMid: [0.07, 0.08, 0.16],
		skyLow: [0.13, 0.14, 0.24],
		starAmt: 1,
		cirrusAmt: 0.22,
		cirrusTint: [0.22, 0.26, 0.38]
	},
	{
		hour: 5,
		sunX: 0.14,
		sunY: -0.1,
		sunBloom: 0.34,
		sunGlow: [0.85, 0.45, 0.38],
		skyZenith: [0.1, 0.11, 0.22],
		skyMid: [0.24, 0.21, 0.34],
		skyLow: [0.55, 0.36, 0.36],
		starAmt: 0.45,
		cirrusAmt: 0.5,
		cirrusTint: [0.6, 0.44, 0.52]
	},
	{
		hour: 6.5,
		sunX: 0.18,
		sunY: 0.1,
		sunBloom: 0.46,
		sunGlow: [1, 0.62, 0.42],
		skyZenith: [0.26, 0.33, 0.54],
		skyMid: [0.62, 0.52, 0.6],
		skyLow: [0.94, 0.68, 0.52],
		starAmt: 0.05,
		cirrusAmt: 0.7,
		cirrusTint: [0.95, 0.78, 0.76]
	},
	{
		hour: 8,
		sunX: 0.28,
		sunY: 0.34,
		sunBloom: 0.24,
		sunGlow: [1, 0.85, 0.62],
		skyZenith: [0.25, 0.44, 0.72],
		skyMid: [0.48, 0.63, 0.83],
		skyLow: [0.82, 0.84, 0.82],
		starAmt: 0,
		cirrusAmt: 0.62,
		cirrusTint: [0.98, 0.97, 0.96]
	},
	{
		hour: 12,
		sunX: 0.52,
		sunY: 0.86,
		sunBloom: 0.12,
		sunGlow: [1, 0.98, 0.92],
		skyZenith: [0.21, 0.44, 0.76],
		skyMid: [0.4, 0.62, 0.86],
		skyLow: [0.72, 0.83, 0.92],
		starAmt: 0,
		cirrusAmt: 0.55,
		cirrusTint: [1, 1, 1]
	},
	{
		hour: 16,
		sunX: 0.74,
		sunY: 0.42,
		sunBloom: 0.24,
		sunGlow: [1, 0.86, 0.56],
		skyZenith: [0.24, 0.42, 0.7],
		skyMid: [0.48, 0.6, 0.78],
		skyLow: [0.85, 0.8, 0.72],
		starAmt: 0,
		cirrusAmt: 0.6,
		cirrusTint: [1, 0.96, 0.92]
	},
	{
		hour: 18.5,
		sunX: 0.84,
		sunY: 0.12,
		sunBloom: 0.48,
		sunGlow: [1, 0.52, 0.3],
		skyZenith: [0.2, 0.24, 0.46],
		skyMid: [0.58, 0.4, 0.5],
		skyLow: [0.96, 0.6, 0.4],
		starAmt: 0.04,
		cirrusAmt: 0.75,
		cirrusTint: [1, 0.78, 0.7]
	},
	{
		hour: 20,
		sunX: 0.88,
		sunY: -0.08,
		sunBloom: 0.36,
		sunGlow: [0.95, 0.44, 0.34],
		skyZenith: [0.11, 0.12, 0.26],
		skyMid: [0.26, 0.21, 0.38],
		skyLow: [0.56, 0.34, 0.38],
		starAmt: 0.5,
		cirrusAmt: 0.5,
		cirrusTint: [0.62, 0.46, 0.56]
	},
	{
		hour: 22,
		sunX: 0.82,
		sunY: -0.3,
		sunBloom: 0.18,
		sunGlow: [0.32, 0.38, 0.56],
		skyZenith: [0.05, 0.06, 0.13],
		skyMid: [0.08, 0.09, 0.18],
		skyLow: [0.15, 0.16, 0.27],
		starAmt: 1,
		cirrusAmt: 0.26,
		cirrusTint: [0.24, 0.28, 0.4]
	},
	{
		hour: 24,
		sunX: 0.78,
		sunY: -0.35,
		sunBloom: 0.16,
		sunGlow: [0.3, 0.36, 0.55],
		skyZenith: [0.04, 0.05, 0.1],
		skyMid: [0.07, 0.08, 0.16],
		skyLow: [0.13, 0.14, 0.24],
		starAmt: 1,
		cirrusAmt: 0.22,
		cirrusTint: [0.22, 0.26, 0.38]
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
	// Smoothstep the blend so palette changes ease in and out of each stop.
	const raw = (h - a.hour) / span;
	const t = raw * raw * (3 - 2 * raw);

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
		cirrusTint: lerpVec3(a.cirrusTint, b.cirrusTint, t)
	};
}

/** CSS fallback for browsers without WebGL. `pageBg` is the color the band settles into. */
export function cssGradientFromPalette(p: SkyPalette, pageBg = '#ffffff'): string {
	const toRgb = (v: Vec3) =>
		`rgb(${Math.round(Math.min(1, v[0]) * 255)}, ${Math.round(Math.min(1, v[1]) * 255)}, ${Math.round(
			Math.min(1, v[2]) * 255
		)})`;
	return `linear-gradient(180deg, ${toRgb(p.skyZenith)} 0%, ${toRgb(p.skyMid)} 42%, ${toRgb(
		p.skyLow
	)} 72%, ${pageBg} 100%)`;
}
