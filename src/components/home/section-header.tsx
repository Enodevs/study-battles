import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onPressAction }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <ThemedText variant="heading">{title}</ThemedText>

      {actionLabel ? (
        <Pressable
          onPress={onPressAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={Spacing.sm}
          className="active:opacity-60">
          <ThemedText variant="captionBold" tone="accent">
            {actionLabel}
          </ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}
