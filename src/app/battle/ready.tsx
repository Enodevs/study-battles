import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BattlePreviewCard } from '@/components/battle/battle-preview-card';
import { VersusRow } from '@/components/battle/versus-row';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MaxContentWidth } from '@/constants/theme';
import type { Difficulty, QuestionCount, Subject } from '@/types/battle';
import { selectionFeedback } from '@/utils/haptics';

export default function BattleReadyScreen() {
  const params = useLocalSearchParams<{
    subject: Subject;
    topic: string;
    difficulty: Difficulty;
    questionCount: string;
  }>();

  const subject = params.subject || 'Biology';
  const topic = params.topic || 'Cell division';
  const difficulty = params.difficulty || 'medium';
  const questionCount = (Number(params.questionCount) || 5) as QuestionCount;

  function handleChallengeFriend() {
    selectionFeedback();
    router.push('/battle/challenge');
  }

  function handleBattleSolo() {
    selectionFeedback();
    router.push({
      pathname: '/battle/play',
      params: {
        subject,
        topic,
      },
    });
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
          <Animated.View entering={FadeInDown.duration(380)} className="gap-2">
            <ThemedText variant="display" className="text-center">
              Battle Ready!
            </ThemedText>

            <ThemedText variant="caption" tone="muted" className="text-center">
              Questions are locked in. Now pick who you&apos;re up against.
            </ThemedText>
          </Animated.View>

          {/* Springs in rather than fading: the match-up is the moment. */}
          <Animated.View entering={ZoomIn.delay(120).springify().damping(13).stiffness(170)}>
            <VersusRow youName="You" opponentName="Opponent" opponentPending />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(220).duration(360)}>
            <BattlePreviewCard
              subject={subject}
              topic={topic}
              difficulty={difficulty}
              questionCount={questionCount}
            />
          </Animated.View>

          <View className="gap-3">
            <Animated.View entering={FadeInDown.delay(300).duration(360)}>
              <Button
                label="Challenge Friend"
                size="large"
                iconName="account-plus"
                onPress={handleChallengeFriend}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(360).duration(360)}>
              <Button
                label="Battle Solo"
                variant="secondary"
                size="large"
                iconName="play"
                onPress={handleBattleSolo}
              />
            </Animated.View>
          </View>

          <Animated.View entering={FadeIn.delay(460).duration(300)} className="items-center">
            <ThemedText
              variant="caption"
              tone="muted"
              accessibilityRole="button"
              onPress={() => {
                selectionFeedback();
                router.back();
              }}>
              Change the setup
            </ThemedText>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
