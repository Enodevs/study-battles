import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';
import { getGreeting } from '@/utils/greeting';

export type HomeHeaderProps = {
  name: string;
  streakDays: number;
  onPressProfile?: () => void;
};

export function HomeHeader({ name, streakDays, onPressProfile }: HomeHeaderProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-start justify-between gap-4 pb-2">
      <View className="flex-1 gap-1.5">
        <ThemedText variant="caption" tone="muted">
          {getGreeting()}
        </ThemedText>
        <ThemedText variant="display">{name}</ThemedText>
        <StreakPill days={streakDays} />
      </View>

      <Pressable
        onPress={onPressProfile}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        className="h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-border bg-surface active:bg-surface-pressed">
        <Ionicons name="person" size={20} color={theme.muted} />
      </Pressable>
    </View>
  );
}

function StreakPill({ days }: { days: number }) {
  const theme = useTheme();

  return (
    <View className="mt-0.5 flex-row items-center gap-1.5 self-start rounded-full bg-surface px-4 py-1.5">
      <Ionicons name="flame" size={14} color={theme.streak} />
      <ThemedText variant="captionBold">{days} day streak</ThemedText>
    </View>
  );
}
