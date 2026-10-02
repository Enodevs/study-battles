import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Share, View } from 'react-native';
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
    battleId?: string;
    shareCode?: string;
  }>();

  const subject = params.subject || 'Biology';
  const topic = params.topic || 'Cell division';
  const difficulty = params.difficulty || 'medium';
  const questionCount = (Number(params.questionCount) || 5) as QuestionCount;
  const shareCode = params.shareCode;

  async function handleChallengeFriend() {
    selectionFeedback();
    
    if (!shareCode) {
      router.push('/battle/challenge');
      return;
    }

    try {
      await Share.share({
        message: `Join my Study Battle on Study Battles!\n\nSubject: ${subject}\nTopic: ${topic}\n\nCode: ${shareCode}`,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  }

  function handleBattleSolo() {
    selectionFeedback();
    router.push({
      pathname: '/battle/play',
      params: {
        subject,
        topic,
        battleId: params.battleId,
        shareCode: params.shareCode,
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

          {shareCode && (
            <Animated.View entering={FadeInDown.delay(260).duration(360)} className="gap-2">
              <ThemedText variant="captionBold" tone="muted" className="text-center uppercase tracking-[1px]">
                Share Code
              </ThemedText>
              <View className="rounded-control border-2 border-dashed border-accent/30 bg-accent/5 p-4">
                <ThemedText variant="heading" tone="accent" className="text-center tracking-wider">
                  {shareCode}
                </ThemedText>
              </View>
            </Animated.View>
          )}

          <View className="gap-3">
            <Animated.View entering={FadeInDown.delay(300).duration(360)}>
              <Button
                label={shareCode ? "Share with Friend" : "Challenge Friend"}
                size="large"
                iconName={shareCode ? "share-variant" : "account-plus"}
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
