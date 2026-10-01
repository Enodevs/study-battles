import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ChallengeFriendScreen() {
  const theme = useTheme();
  const iconScale = useSharedValue(0);

  useEffect(() => {
    iconScale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  }, [iconScale]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  function handleCopyChallenge() {
    // Mock copy action
    alert('Challenge link copied! (This is a demo)');
  }

  function handleStartSolo() {
    router.push('/battle/play');
  }

  function handleBackHome() {
    router.replace('/');
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <View className="flex-1 items-center justify-center gap-8 px-6">
          {/* Icon */}
          <Animated.View style={iconAnimatedStyle}>
            <View className="h-28 w-28 items-center justify-center rounded-card bg-accent/20">
              <MaterialCommunityIcons
                name="account-multiple-plus"
                size={64}
                color={theme.accent}
              />
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View
            entering={FadeInUp.delay(100).duration(400)}
            className="items-center gap-2">
            <ThemedText variant="display" className="text-center">
              Battle Created!
            </ThemedText>
            <ThemedText variant="body" tone="muted" className="text-center">
              Share this challenge with your friend
            </ThemedText>
          </Animated.View>

          {/* Mock Challenge Code */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            className="w-full rounded-control border-2 border-dashed border-border bg-surface p-6">
            <ThemedText variant="caption" tone="muted" className="mb-2 text-center">
              Challenge Code
            </ThemedText>
            <ThemedText variant="heading" tone="accent" className="text-center">
              BATTLE-2026
            </ThemedText>
          </Animated.View>

          {/* Actions */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(400)}
            className="w-full gap-3">
            <Button
              label="Copy Challenge Link"
              size="large"
              onPress={handleCopyChallenge}
              icon={
                <MaterialCommunityIcons
                  name="content-copy"
                  size={20}
                  color={theme.accentFg}
                />
              }
            />

            <Button
              label="Start Solo Battle"
              variant="secondary"
              size="large"
              onPress={handleStartSolo}
              icon={
                <MaterialCommunityIcons name="play" size={20} color={theme.fg} />
              }
            />

            <Button
              label="Back to Home"
              variant="secondary"
              onPress={handleBackHome}
              className="self-center px-12"
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
