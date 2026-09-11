import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BackButton } from '@/components/ui/back-button';
import { MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Placeholder landing spot for `/battle/create`, so the flow is walkable.
 * The real generation screen is the next thing to build.
 */
export default function GenerateBattleScreen() {
  const theme = useTheme();
  const { subject, topic, difficulty, questionCount } = useLocalSearchParams<{
    subject: string;
    topic: string;
    difficulty: string;
    questionCount: string;
  }>();

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <View className="px-6 pt-2">
          <BackButton />
        </View>

        <View className="flex-1 items-center justify-center gap-4 px-6">
          <ActivityIndicator size="large" color={theme.accent} />

          <ThemedText variant="title" className="text-center">
            Generating…
          </ThemedText>

          <ThemedText variant="caption" tone="muted" className="text-center">
            {questionCount} {difficulty} questions on {topic} ({subject})
          </ThemedText>
        </View>
      </SafeAreaView>
    </View>
  );
}
