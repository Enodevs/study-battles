/**
 * Helpers for the per-subject accent colours, which are plain hex literals
 * rather than theme tokens — a subject keeps its identity in both schemes.
 */

/** Splits `#4F46E5` into its three 0-255 channels. */
function channels(hex: string) {
  const value = parseInt(hex.slice(1), 16);

  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

/** `'#22C55E', 0.12` -> `'rgba(34, 197, 94, 0.12)'`. */
export function withAlpha(hex: string, alpha: number) {
  return `rgba(${channels(hex).join(', ')}, ${alpha})`;
}

/**
 * Scales every channel towards black. Used for the bottom edge a chunky
 * control rests on, which has to stay darker than the face it carries.
 */
export function shade(hex: string, factor: number) {
  return `rgb(${channels(hex)
    .map((value) => Math.round(value * factor))
    .join(', ')})`;
}
