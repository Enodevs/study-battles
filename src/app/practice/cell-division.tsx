import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
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
import { MOCK_QUESTIONS } from '@/constants/mock-questions';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/utils/cn';

const FEEDBACK_DELAY = 2000;
const POINTS_PER_QUESTION = 10;

type AnswerState = 'idle' | 'correct' | 'incorrect';

export default function PracticeCellDivisionScreen() {
  const theme = useTheme();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [correctCount, setCorrectCount] = useState(0);

  const shakeAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const isLocked = answerState !== 'idle';
  const totalQuestions = MOCK_QUESTIONS.length;
  const topic = 'Cell Division';

  function handleAnswer(index: number) {
    if (isLocked) return;

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestion.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      setCorrectCount((prev) => prev + 1);

      scaleAnimation.value = withSequence(
        withSpring(1.05, { damping: 10 }),
        withSpring(1)
      );
    } else {
      setAnswerState('incorrect');

      shakeAnimation.value = withSequence(
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear })
      );
    }

    setTimeout(nextQuestion, FEEDBACK_DELAY);
  }

  function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerState('idle');
    } else {
      // Calculate final XP including current question
      const finalCorrect = answerState === 'correct' ? correctCount + 1 : correctCount;
      const xp = finalCorrect * POINTS_PER_QUESTION;
      router.replace({
        pathname: '/practice/complete',
        params: {
          topic,
          correct: String(finalCorrect),
          total: String(totalQuestions),
          xp: String(xp),
        },
      });
    }
  }

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }],
  }));

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

          <View className="w-10" />
        </View>

        <ScrollView
          contentContainerClassName="gap-6 px-6 py-6"
          contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
          showsVerticalScrollIndicator={false}>
          {/* Topic */}
          <View className="items-center gap-1">
            <ThemedText variant="caption" tone="muted">
              Practice
            </ThemedText>
            <ThemedText variant="bodyLarge">{topic}</ThemedText>
          </View>

          {/* Progress */}
          <View className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <View
              className="h-full rounded-full bg-accent"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
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

                  <ThemedText variant="body" className="flex-1">
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
          {isLocked && (
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

          {/* Score */}
          <View className="items-center pt-4">
            <ThemedText variant="caption" tone="muted">
              Correct answers
            </ThemedText>
            <ThemedText variant="heading" tone="accent" className="tabular-nums">
              {correctCount} / {currentQuestionIndex + 1}
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
