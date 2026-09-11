/**
 * Reads the colour scheme from NativeWind, which is the same source that drives
 * `dark:` variants and the themed custom properties — so a JS colour can never
 * disagree with what the class names render.
 *
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme as useNativeWindColorScheme } from 'nativewind';

import { Colors, type ColorScheme } from '@/constants/theme';

/** NativeWind reports `undefined` before the scheme is resolved; treat that as light. */
export function useColorScheme(): ColorScheme {
  const { colorScheme } = useNativeWindColorScheme();

  return colorScheme === 'dark' ? 'dark' : 'light';
}

/** Raw colour values, for props that take a colour instead of a class name. */
export function useTheme() {
  return Colors[useColorScheme()];
}
