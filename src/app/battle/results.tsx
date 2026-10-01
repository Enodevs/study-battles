import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type BattleResult = 'won' | 'lost' | 'draw';

export default function BattleResultsScreen() {
  const params = useLocalSearchParams<{
    score: string;
    correctCount: string;
    totalQuestions: string;
    opponentScore: string;
  }>();

  const theme = useTheme();
  const iconScale = useSharedValue(0);
  const confettiScale = useSharedValue(0);

  const score = Number(params.score) || 0;
  const correctCount = Number(params.correctCount) || 0;
  const totalQuestions = Number(params.totalQuestions) || 5;
  const opponentScore = Number(params.opponentScore) || 0;

  const incorrectCount = totalQuestions - correctCount;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Determine result
  const result: BattleResult =
    score > opponentScore ? 'won' : score < opponentScore ? 'lost' : 'draw';

  const resultConfig = {
    won: {
      title: 'YOU WON!',
      icon: 'trophy' as const,
      color: theme.success,
    },
    lost: {
      title: 'YOU LOST',
      icon: 'shield-off' as const,
      color: theme.danger,
    },
    draw: {
      title: 'DRAW',
      icon: 'equal' as const,
      color: theme.accent,
    },
  };

  const config = resultConfig[result];

  // Entrance animations
  useEffect(() => {
    iconScale.value = withSpring(1, {
      damping: 12,
      stiffness: 150,
    });

    if (result === 'won') {
      confettiScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.2, { damping: 8 }),
          withSpring(1, { damping: 10 })
        )
      );
    }
  }, [iconScale, confettiScale, result]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const confettiAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: confettiScale.value }],
  }));

  function handleRematch() {
    router.push('/battle/play');
  }

  function handlePracticeMistakes() {
    router.push('/practice/cell-division');
  }

  function handleDone() {
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="gap-8 px-6 py-8"
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}>
          {/* Result Icon */}
          <View className="items-center">
            <Animated.View style={iconAnimatedStyle}>
              <View
                className="h-24 w-24 items-center justify-center rounded-card"
                style={{ backgroundColor: `${config.color}20` }}>
                <MaterialCommunityIcons
                  name={config.icon}
                  size={56}
                  color={config.color}
                />
              </View>
            </Animated.View>

            {result === 'won' && (
              <Animated.View
                style={confettiAnimatedStyle}
                className="absolute -top-4">
                <ThemedText variant="display" className="text-4xl">
                  🎉
                </ThemedText>
              </Animated.View>
            )}
          </View>

          {/* Result Title */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)}>
            <ThemedText
              variant="display"
              className="text-center"
              style={{ color: config.color }}>
              {config.title}
            </ThemedText>
          </Animated.View>

          {/* Score Comparison */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="flex-row items-center justify-center gap-6">
            <View className="items-center gap-2">
              <ThemedText variant="caption" tone="muted">
                You
              </ThemedText>
              <ThemedText
                variant="display"
                tone="accent"
                className="tabular-nums">
                {score}
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                XP
              </ThemedText>
            </View>

            <ThemedText variant="title" tone="muted">
              —
            </ThemedText>

            <View className="items-center gap-2">
              <ThemedText variant="caption" tone="muted">
                Opponent
              </ThemedText>
              <ThemedText variant="display" tone="muted" className="tabular-nums">
                {opponentScore}
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                XP
              </ThemedText>
            </View>
          </Animated.View>

          {/* Divider */}
          <View className="h-px bg-border" />

          {/* Performance Stats */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(400)}
            className="gap-4">
            <View className="flex-row items-center justify-between">
              <ThemedText variant="body" tone="muted">
                Accuracy
              </ThemedText>
              <ThemedText variant="bodyLarge" className="tabular-nums">
                {accuracy}%
              </ThemedText>
            </View>

            <View className="flex-row items-center justify-between">
              <ThemedText variant="body" tone="muted">
                Correct
              </ThemedText>
              <ThemedText variant="bodyLarge" className="tabular-nums">
                {correctCount} / {totalQuestions}
              </ThemedText>
            </View>

            <View className="flex-row items-center justify-between">
              <ThemedText variant="body" tone="muted">
                XP Earned
              </ThemedText>
              <ThemedText variant="bodyLarge" tone="accent" className="tabular-nums">
                +{score}
              </ThemedText>
            </View>
          </Animated.View>

          {/* Weak Topic (only show if there were mistakes) */}
          {incorrectCount > 0 && (
            <>
              <View className="h-px bg-border" />

              <Animated.View
                entering={FadeInDown.delay(400).duration(400)}
                className="rounded-control border border-border bg-surface p-4">
                <View className="mb-2 flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={20}
                    color={theme.streak}
                  />
                  <ThemedText variant="bodyLarge">Needs practice</ThemedText>
                </View>
                <ThemedText variant="body" tone="muted">
                  Cell Division
                </ThemedText>
                <ThemedText variant="caption" tone="muted" className="mt-1">
                  {incorrectCount} incorrect {incorrectCount === 1 ? 'answer' : 'answers'}
                </ThemedText>
              </Animated.View>
            </>
          )}

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(400)}
            className="gap-3">
            <Button
              label="Rematch"
              size="large"
              onPress={handleRematch}
              icon={
                <MaterialCommunityIcons
                  name="refresh"
                  size={20}
                  color={theme.accentFg}
                />
              }
            />

            {incorrectCount > 0 && (
              <Button
                label="Practice Mistakes"
                variant="secondary"
                size="large"
                onPress={handlePracticeMistakes}
                icon={
                  <MaterialCommunityIcons
                    name="school"
                    size={20}
                    color={theme.fg}
                  />
                }
              />
            )}

            <Button
              label="Done"
              variant="secondary"
              onPress={handleDone}
              className="self-center px-12"
            />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

