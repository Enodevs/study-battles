import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export type BattleCtaProps = {
  onPress?: () => void;
};

export function BattleCta({ onPress }: BattleCtaProps) {
  const theme = useTheme();

  return (
    <View className="gap-6 rounded-card border border-border bg-surface p-8">
      <View className="h-[52px] w-[52px] items-center justify-center rounded-control bg-bg">
        <MaterialCommunityIcons name="sword-cross" size={22} color={theme.accent} />
      </View>

      <View className="gap-2">
        <ThemedText variant="title">Ready for a battle?</ThemedText>
        <ThemedText variant="caption" tone="muted">
          Pick a topic, generate questions, and challenge a friend.
        </ThemedText>
      </View>

      <Button label="Create Battle" size="large" onPress={onPress} className="mt-0.5 self-stretch" />
    </View>
  );
}
