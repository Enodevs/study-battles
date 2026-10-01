import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GenerationStageRow,
  type StageState,
} from '@/components/battle/generation-stage-row';
import { ThemedText } from '@/components/themed-text';
import { ProgressBar } from '@/components/ui/progress-bar';
import { subjectColor } from '@/constants/battle-options';
import { MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Difficulty, Subject } from '@/types/battle';
import { withAlpha } from '@/utils/color';
import { confirmFeedback } from '@/utils/haptics';

type GenerationStage = {
  label: string;
  /** What the bar reads once this stage is under way. */
  progress: number;
  duration: number;
};

const STAGES: GenerationStage[] = [
  { label: 'Writing the questions', progress: 0.3, duration: 1000 },
  { label: 'Tuning the difficulty', progress: 0.6, duration: 1000 },
  { label: 'Balancing the battle', progress: 0.85, duration: 800 },
  { label: 'Packing your challenge', progress: 1, duration: 700 },
];

/** Long enough for the finished state to register before the screen changes. */
const COMPLETION_PAUSE_MS = 700;

const MASCOT = 132;
const HALO = 184;

export default function GeneratingBattleScreen() {
  const params = useLocalSearchParams<{
    subject: Subject;
    topic: string;
    difficulty: Difficulty;
    questionCount: string;
  }>();

  const theme = useTheme();
  const [stageIndex, setStageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bob = useSharedValue(0);
  const pop = useSharedValue(0);
  const halo = useSharedValue(0);

  const battle = useMemo(
    () => ({
      subject: params.subject || 'Biology',
      topic: params.topic || 'Cell division',
      difficulty: params.difficulty || 'medium',
      questionCount: params.questionCount || '5',
    }),
    [params.subject, params.topic, params.difficulty, params.questionCount]
  );

  const stage = STAGES[stageIndex];
  const tint = subjectColor(battle.subject) ?? theme.accent;

  // Idle motion: the comet drifts and the halo breathes until the work is done.
  useEffect(() => {
    if (isComplete) {
      bob.set(withTiming(0, { duration: 240 }));
      pop.set(withSequence(withSpring(1, { damping: 9, stiffness: 220 }), withSpring(0)));
      return;
    }

    bob.set(
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1100, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    halo.set(
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [isComplete, bob, pop, halo]);

  // Stage machine. Swap the timer for the real generator and the UI follows.
  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      if (stageIndex < STAGES.length - 1) {
        setStageIndex(stageIndex + 1);
        return;
      }

      setIsComplete(true);
      confirmFeedback();
    }, STAGES[stageIndex].duration);

    return () => clearTimeout(timer);
  }, [stageIndex, isComplete]);

  // `replace`, so Back from the next screen never lands here again.
  useEffect(() => {
    if (!isComplete) return;

    const timer = setTimeout(() => {
      router.replace({ pathname: '/battle/ready', params: battle });
    }, COMPLETION_PAUSE_MS);

    return () => clearTimeout(timer);
  }, [isComplete, battle]);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: bob.get() * -10 },
      { rotate: `${-4 + bob.get() * 8}deg` },
      { scale: 1 + pop.get() * 0.22 },
    ],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + halo.get() * 0.5,
    transform: [{ scale: 0.9 + halo.get() * 0.14 }],
  }));

  function stageState(index: number): StageState {
    if (isComplete || index < stageIndex) return 'done';
    return index === stageIndex ? 'active' : 'pending';
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="grow justify-center gap-8 px-6 py-8"
          showsVerticalScrollIndicator={false}>
          <View className="items-center">
            <Animated.View
              style={[
                styles.halo,
                { backgroundColor: withAlpha(tint, 0.16) },
                haloStyle,
              ]}
            />

            <Animated.View entering={FadeIn.duration(360)} style={mascotStyle}>
              <Image
                source={require('@/assets/images/comet-creature.webp')}
                style={styles.mascot}
                contentFit="contain"
              />
            </Animated.View>
          </View>

          <Animated.View entering={FadeInDown.delay(80).duration(360)} className="gap-2">
            <ThemedText variant="title" className="text-center">
              {isComplete ? 'Battle ready!' : 'Building your battle'}
            </ThemedText>

            <ThemedText variant="caption" tone="muted" className="text-center">
              {battle.subject} · {battle.topic} · {battle.questionCount} questions
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(160).duration(360)} className="gap-2">
            <View className="flex-row items-center justify-between">
              <ThemedText variant="captionBold" tone="muted" className="uppercase tracking-[1px]">
                Progress
              </ThemedText>

              <ThemedText variant="captionBold" className="tabular-nums" style={{ color: tint }}>
                {Math.round((isComplete ? 1 : stage.progress) * 100)}%
              </ThemedText>
            </View>

            <ProgressBar value={isComplete ? 1 : stage.progress} color={tint} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(240).duration(360)} className="gap-3.5">
            {STAGES.map((item, index) => (
              <GenerationStageRow
                key={item.label}
                label={item.label}
                state={stageState(index)}
                color={tint}
              />
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(320).duration(360)}>
            <ThemedText variant="caption" tone="muted" className="text-center">
              {isComplete ? 'Get ready to compete' : "Your opponent won't know what's coming"}
            </ThemedText>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  halo: {
    position: 'absolute',
    width: HALO,
    height: HALO,
    borderRadius: HALO / 2,
    // Centres the halo on the mascot without taking part in the layout.
    top: (MASCOT - HALO) / 2,
  },
  mascot: {
    width: MASCOT,
    height: MASCOT,
  },
});
