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
      className="h-11 w-11 items-center justify-center rounded-full border border-border bg-surface active:bg-surface-pressed">
      <MaterialCommunityIcons name="chevron-left" size={26} color={theme.fg} />
    </Pressable>
  );
}
