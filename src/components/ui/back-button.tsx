import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, type Href } from 'expo-router';
import { Pressable } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { selectionFeedback } from '@/utils/haptics';

export type BackButtonProps = {
  /** Where to land if this screen was opened directly and has nothing to pop. */
  fallbackHref?: Href;
};

export function BackButton({ fallbackHref = '/' }: BackButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => {
        selectionFeedback();
        if (router.canGoBack()) {
          router.back();
          return;
        }
        // Deep link or refresh: there is no history to pop.
        router.replace(fallbackHref);
      }}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={8}
      className="h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-surface active:scale-95 active:bg-surface-pressed">
      <MaterialCommunityIcons name="chevron-left" size={26} color={theme.fg} />
    </Pressable>
  );
}
