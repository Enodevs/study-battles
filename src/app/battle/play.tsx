import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { MOCK_USER } from '@/constants/mock-data';
import { getQuestionsBySubject } from '@/constants/mock-questions';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ensureAuthenticated } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Subject } from '@/types/battle';
import { cn } from '@/utils/cn';

const TIMER_DURATION = 15;
const FEEDBACK_DELAY = 2000;
const POINTS_CORRECT = 100;
const POINTS_SPEED_BONUS = 20;

type AnswerState = 'idle' | 'correct' | 'incorrect' | 'timeout';

export default function BattlePlayScreen() {
  const params = useLocalSearchParams<{ 
    subject?: Subject; 
    topic?: string;
    battleId?: string;
    shareCode?: string;
  }>();
  const subject = params.subject || 'Biology';
  const topic = params.topic || 'Cell division';
  const battleId = params.battleId;
  
  // Get questions for the selected subject
  const MOCK_QUESTIONS = getQuestionsBySubject(subject);
  
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentName, setOpponentName] = useState('Opponent');
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);

  const shakeAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const isLocked = answerState !== 'idle';
  const totalQuestions = MOCK_QUESTIONS.length;

  // Fetch battle players on mount
  useEffect(() => {
    if (!battleId) return;

    async function fetchPlayers() {
      try {
        const user = await ensureAuthenticated();
        
        const { data: players, error } = await supabase
          .from('battle_players')
          .select('*')
          .eq('battle_id', battleId);

        if (error) {
          console.error('Failed to fetch players:', error);
          return;
        }

        if (players && players.length > 0) {
          // Find my player record
          const myPlayer = players.find((p: any) => p.user_id === user.id);
          if (myPlayer) {
            setMyPlayerId(myPlayer.id);
            setScore(myPlayer.score || 0);
            setCorrectCount(myPlayer.correct_answers || 0);
          }

          // Find opponent
          const opponent = players.find((p: any) => p.user_id !== user.id);
          if (opponent) {
            setOpponentName(opponent.display_name || 'Opponent');
            setOpponentScore(opponent.score || 0);
          }
        }
      } catch (err) {
        console.error('Error fetching players:', err);
      }
    }

    fetchPlayers();
  }, [battleId]);

  // Timer
  useEffect(() => {
    if (isLocked) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0.1) {
          handleTimeout();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLocked, currentQuestionIndex]);

  function handleTimeout() {
    if (isLocked) return;
    setAnswerState('timeout');
    setTimeout(nextQuestion, FEEDBACK_DELAY);
  }

  function handleAnswer(index: number) {
    if (isLocked) return;

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      const speedBonus = timeRemaining > 10 ? POINTS_SPEED_BONUS : 0;
      const newScore = score + POINTS_CORRECT + speedBonus;
      const newCorrectCount = correctCount + 1;
      
      setScore(newScore);
      setCorrectCount(newCorrectCount);

      // Update score in Supabase if we have a player ID
      if (battleId && myPlayerId) {
        supabase
          .from('battle_players')
          .update({ 
            score: newScore,
            correct_answers: newCorrectCount,
          })
          .eq('id', myPlayerId)
          .then(({ error }: { error: any }) => {
            if (error) console.error('Failed to update score:', error);
          });
      }

      // Success animation
      scaleAnimation.value = withSequence(
        withSpring(1.05, { damping: 10 }),
        withSpring(1)
      );
    } else {
      setAnswerState('incorrect');

      // Shake animation
      shakeAnimation.value = withSequence(
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear })
      );
    }

    // Mock opponent scoring if no real battle
    if (!battleId) {
      const timeSeed = Math.floor(timeRemaining * 10) % 41;
      const opponentPoints = timeSeed + 60;
      setOpponentScore((prev) => prev + opponentPoints);
    }

    setTimeout(nextQuestion, FEEDBACK_DELAY);
  }

  function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerState('idle');
      setTimeRemaining(TIMER_DURATION);
    } else {
      // Navigate to results
      router.replace({
        pathname: '/battle/results',
        params: {
          score: String(score),
          correctCount: String(correctCount),
          totalQuestions: String(totalQuestions),
          opponentScore: String(opponentScore),
        },
      });
    }
  }

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }],
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
  }));

  const timerProgress = timeRemaining / TIMER_DURATION;
  const timerColor =
    timerProgress > 0.5 ? theme.success : timerProgress > 0.25 ? theme.streak : theme.danger;

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        {/* Header */}
        <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-surface-pressed">
            <Ionicons name="arrow-back" size={24} color={theme.fg} />
          </Pressable>

          <ThemedText variant="bodyLarge">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </ThemedText>

          <View className="flex-row items-center gap-2">
            <Ionicons name="flash" size={20} color={timerColor} />
            <ThemedText
              variant="bodyLarge"
              className="tabular-nums"
              style={{ color: timerColor }}>
              {Math.ceil(timeRemaining)}s
            </ThemedText>
          </View>
        </View>

        <ScrollView
          contentContainerClassName="gap-6 px-6 py-6"
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}>
          {/* Battle Info */}
          <View className="items-center gap-1">
            <ThemedText variant="caption" tone="muted">
              {subject} · {topic}
            </ThemedText>
          </View>

          {/* Timer Progress Bar */}
          <View className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <Animated.View
              className="h-full rounded-full"
              style={[
                scaleStyle,
                {
                  width: `${timerProgress * 100}%`,
                  backgroundColor: timerColor,
                },
              ]}
            />
          </View>

          {/* Question */}
          <Animated.View style={shakeStyle}>
            <ThemedText variant="title" className="text-center">
              {currentQuestion.question}
            </ThemedText>
          </Animated.View>

          {/* Answer Options */}
          <View className="gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = isLocked && isCorrect;
              const showIncorrect = isLocked && isSelected && !isCorrect;

              return (
                <Pressable
                  key={index}
                  onPress={() => handleAnswer(index)}
                  disabled={isLocked}
                  className={cn(
                    'min-h-[72px] flex-row items-center gap-4 rounded-control border-2 px-6 py-4',
                    isLocked ? 'opacity-100' : 'active:scale-[0.98]',
                    showCorrect && 'border-success bg-success/10',
                    showIncorrect && 'border-danger bg-danger/10',
                    !showCorrect && !showIncorrect && 'border-border bg-surface'
                  )}>
                  <View
                    className={cn(
                      'h-8 w-8 items-center justify-center rounded-full',
                      showCorrect && 'bg-success',
                      showIncorrect && 'bg-danger',
                      !showCorrect && !showIncorrect && 'bg-bg'
                    )}>
                    <ThemedText
                      variant="label"
                      tone={showCorrect || showIncorrect ? 'accentFg' : 'fg'}>
                      {String.fromCharCode(65 + index)}
                    </ThemedText>
                  </View>

                  <ThemedText
                    variant="body"
                    className="flex-1"
                    tone={showCorrect || showIncorrect ? 'fg' : 'fg'}>
                    {option}
                  </ThemedText>

                  {showCorrect && (
                    <Ionicons name="checkmark-circle" size={24} color={theme.success} />
                  )}
                  {showIncorrect && (
                    <Ionicons name="close-circle" size={24} color={theme.danger} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Explanation */}
          {isLocked && answerState !== 'timeout' && (
            <Animated.View
              entering={undefined}
              className={cn(
                'rounded-control border-2 p-4',
                answerState === 'correct'
                  ? 'border-success bg-success/5'
                  : 'border-danger bg-danger/5'
              )}>
              <ThemedText variant="captionBold" className="mb-2">
                {answerState === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                {currentQuestion.explanation}
              </ThemedText>
            </Animated.View>
          )}

          {answerState === 'timeout' && (
            <Animated.View
              entering={undefined}
              className="rounded-control border-2 border-muted bg-muted/5 p-4">
              <ThemedText variant="captionBold" className="mb-2">
                ⏱ Time&apos;s up!
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                {currentQuestion.explanation}
              </ThemedText>
            </Animated.View>
          )}

          {/* Scores */}
          <View className="flex-row items-center justify-center gap-8 pt-4">
            <View className="items-center gap-1">
              <ThemedText variant="caption" tone="muted">
                {MOCK_USER.name}
              </ThemedText>
              <ThemedText variant="heading" tone="accent" className="tabular-nums">
                {score}
              </ThemedText>
            </View>

            <View className="h-12 w-px bg-border" />

            <View className="items-center gap-1">
              <ThemedText variant="caption" tone="muted">
                {opponentName}
              </ThemedText>
              <ThemedText variant="heading" tone="muted" className="tabular-nums">
                {opponentScore}
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
