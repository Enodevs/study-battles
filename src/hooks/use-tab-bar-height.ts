import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing, TabBarContentHeight } from '@/constants/theme';

/**
 * Real on-screen height of the tab bar. `TabBarContainer` pads itself with the
 * same expression, so scrollable screens can reserve exactly the right space
 * instead of a hardcoded per-platform guess.
 */
export function useTabBarHeight() {
  const insets = useSafeAreaInsets();

  return TabBarContentHeight + Math.max(insets.bottom, Spacing.sm);
}
