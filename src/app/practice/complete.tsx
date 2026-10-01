import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
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
import { MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function PracticeCompleteScreen() {
  const params = useLocalSearchParams<{
    topic?: string;
    correct?: string;
    total?: string;
    xp?: string;
  }>();

  const theme = useTheme();
  const iconScale = useSharedValue(0);
  const sparkleScale = useSharedValue(0);

  const topic = params.topic || 'Cell Division';
  const correct = Number(params.correct) || 4;
  const total = Number(params.total) || 5;
  const xp = Number(params.xp) || 40;

  useEffect(() => {
    iconScale.value = withSpring(1, {
      damping: 12,
      stiffness: 150,
    });

    sparkleScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.2, { damping: 8 }),
        withSpring(1, { damping: 10 })
      )
    );
  }, [iconScale, sparkleScale]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const sparkleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sparkleScale.value }],
  }));

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <View className="flex-1 items-center justify-center gap-8 px-6">
          {/* Icon */}
          <View className="items-center">
            <Animated.View style={iconAnimatedStyle}>
              <View className="h-28 w-28 items-center justify-center rounded-card bg-success/20">
                <MaterialCommunityIcons
                  name="check-circle"
                  size={64}
                  color={theme.success}
                />
              </View>
            </Animated.View>

            <Animated.View
              style={sparkleAnimatedStyle}
              className="absolute -top-4">
              <ThemedText variant="display" className="text-4xl">
                ✨
              </ThemedText>
            </Animated.View>
          </View>

          {/* Title */}
          <Animated.View entering={FadeInUp.delay(100).duration(400)}>
            <ThemedText variant="display" tone="success" className="text-center">
              Practice Complete!
            </ThemedText>
          </Animated.View>

          {/* Stats */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="items-center gap-6">
            <View className="items-center gap-2">
              <ThemedText variant="heading" className="tabular-nums">
                {correct} / {total} correct
              </ThemedText>
              <ThemedText variant="title" tone="accent" className="tabular-nums">
                +{xp} XP
              </ThemedText>
            </View>

            <View className="items-center gap-1">
              <ThemedText variant="caption" tone="muted">
                You&apos;ve strengthened:
              </ThemedText>
              <ThemedText variant="bodyLarge">{topic}</ThemedText>
            </View>
          </Animated.View>

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(400)}
            className="w-full gap-3">
            <Button
              label="Practice Again"
              size="large"
              onPress={() => router.push('/practice/cell-division')}
              icon={
                <MaterialCommunityIcons
                  name="refresh"
                  size={20}
                  color={theme.accentFg}
                />
              }
            />

            <Button
              label="Back to Home"
              variant="secondary"
              size="large"
              onPress={() => router.replace('/')}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
