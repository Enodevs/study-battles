/**
 * Design tokens for anything that cannot go through a Tailwind class name:
 * vector icon colours, the React Navigation theme, and layout maths.
 *
 * Colour values themselves live in `./palette.js` — that file is the single
 * source shared with `tailwind.config.js`, so a class name and a JS value can
 * never drift apart.
 */

import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';
import { vars } from 'nativewind';
import { Platform } from 'react-native';

import { cssVars, palette } from './palette';

export const Colors = palette;

export type ColorScheme = keyof typeof palette;
export type ThemeColor = keyof (typeof palette)['light'];

/** Custom-property overrides applied at the root of the tree, per scheme. */
export const ThemeVars: Record<ColorScheme, ReturnType<typeof vars>> = {
  light: vars(cssVars('light')),
  dark: vars(cssVars('dark')),
};

/**
 * Semantic colours a piece of content can be tinted with — a subset of the
 * palette. Backgrounds and borders are excluded: they never read as a "tone".
 */
export type Tone = 'fg' | 'muted' | 'accent' | 'accentFg' | 'streak' | 'success' | 'danger';

/**
 * Tone -> class name. Written out in full rather than interpolated because
 * Tailwind's content scanner only sees complete literals.
 */
export const ToneText: Record<Tone, string> = {
  fg: 'text-fg',
  muted: 'text-muted',
  accent: 'text-accent',
  accentFg: 'text-accent-fg',
  streak: 'text-streak',
  success: 'text-success',
  danger: 'text-danger',
};

export const ToneBackground: Record<Tone, string> = {
  fg: 'bg-fg',
  muted: 'bg-muted',
  accent: 'bg-accent',
  accentFg: 'bg-accent-fg',
  streak: 'bg-streak',
  success: 'bg-success',
  danger: 'bg-danger',
};

/**
 * Matches Tailwind's default spacing scale (`gap-2` === `Spacing.sm`), so
 * layout done in class names and layout done in JS agree.
 */
export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 64,
} as const;

/** Mirrors `theme.borderRadius` in `tailwind.config.js`. */
export const Radius = {
  chip: 10,
  control: 16,
  card: 20,
  full: 9999,
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const MaxContentWidth = 800;

/**
 * The `micro` step of the type scale, as a plain style object. The tab bar
 * animates its label colour, so it needs a style rather than a class name —
 * and the tab bar height maths needs the line height.
 */
export const MicroTextStyle = { fontSize: 11, lineHeight: 14, fontWeight: '800' } as const;

/** The rounded highlight that sits behind the active tab's icon. */
export const TabBarIndicatorHeight = 36;

/**
 * Height of the tab bar above its safe-area padding: top padding, the icon
 * indicator, the gap, then the label. Screens add their own bottom inset with
 * `useTabBarHeight()` rather than guessing a per-platform constant.
 */
export const TabBarContentHeight =
  Spacing.sm + TabBarIndicatorHeight + Spacing.xs + MicroTextStyle.lineHeight;

/** React Navigation only reads `colors`, so keep the rest of its preset intact. */
export function createNavigationTheme(scheme: ColorScheme): Theme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const colors = palette[scheme];

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.accent,
      background: colors.bg,
      card: colors.bg,
      text: colors.fg,
      border: colors.border,
      notification: colors.danger,
    },
  };
}
