/**
 * Single source of truth for every colour in the app.
 *
 * Two consumers read from here:
 *   - `tailwind.config.js` turns these into CSS custom properties, so class
 *     names like `bg-surface` resolve per colour scheme.
 *   - `src/constants/theme.ts` re-exports the raw values for APIs that need a
 *     JavaScript colour (vector icons, the React Navigation theme).
 *
 * Keep this file CommonJS — `tailwind.config.js` requires it at build time.
 */

/** Semantic token -> hex value, per colour scheme. Both schemes must share keys. */
const palette = {
  light: {
    bg: '#FFFFFF',
    surface: '#F0F0F3',
    surfacePressed: '#E0E1E6',
    fg: '#11181C',
    muted: '#60646C',
    border: '#E4E4E7',
    accent: '#4F46E5',
    accentPressed: '#4338CA',
    accentFg: '#FFFFFF',
    // The bottom edge a chunky button sits on. Always darker than its face, in
    // both schemes, or the control stops reading as raised.
    accentShadow: '#3730A3',
    surfaceShadow: '#CFD0D7',
    streak: '#F97316',
    success: '#15803D',
    danger: '#DC2626',
  },
  dark: {
    bg: '#0B0B0D',
    surface: '#212225',
    surfacePressed: '#2E3135',
    fg: '#ECEDEE',
    muted: '#B0B4BA',
    border: '#2A2B2E',
    accent: '#6366F1',
    // Brighter than `accent` on purpose: on a dark ground, pressed reads as "lit up".
    accentPressed: '#818CF8',
    accentFg: '#FFFFFF',
    accentShadow: '#3730A3',
    surfaceShadow: '#0E0F11',
    streak: '#FB923C',
    success: '#4ADE80',
    danger: '#F87171',
  },
};

/** `surfacePressed` -> `surface-pressed`, matching the CSS custom property naming. */
function toKebabCase(key) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * `#4F46E5` -> `'79 70 229'`. Tailwind needs bare channels so the
 * `<alpha-value>` placeholder can add an opacity modifier (`bg-accent/50`).
 */
function toRgbChannels(hex) {
  const value = parseInt(hex.slice(1), 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

/** The full custom-property set for one scheme, ready for `addBase` or `vars()`. */
function cssVars(scheme) {
  return Object.fromEntries(
    Object.entries(palette[scheme]).map(([key, hex]) => [
      `--color-${toKebabCase(key)}`,
      toRgbChannels(hex),
    ])
  );
}

module.exports = { palette, cssVars };
