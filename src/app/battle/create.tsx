import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { OptionSelector } from '@/components/ui/option-selector';
import { TextField } from '@/components/ui/text-field';
import {
  DEFAULT_DIFFICULTY,
  DEFAULT_QUESTION_COUNT,
  DEFAULT_SUBJECT,
  DIFFICULTY_OPTIONS,
  MAX_TOPIC_LENGTH,
  QUESTION_COUNT_OPTIONS,
  SUBJECT_OPTIONS,
} from '@/constants/battle-options';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Difficulty, QuestionCount, Subject } from '@/types/battle';
import { confirmFeedback } from '@/utils/haptics';

/** Each block slides in just after the one above it. */
const STAGGER_MS = 40;

function stagger(index: number) {
  return FadeInDown.delay(index * STAGGER_MS)
    .duration(320)
    .springify()
    .damping(18);
}

export default function CreateBattleScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [subject, setSubject] = useState<Subject>(DEFAULT_SUBJECT);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [questionCount, setQuestionCount] = useState<QuestionCount>(DEFAULT_QUESTION_COUNT);

  const trimmedTopic = topic.trim();
  // Nothing can be generated without a topic, so that is the one gate.
  const canCreate = trimmedTopic.length > 0;

  function handleCreate() {
    confirmFeedback();

    router.push({
      pathname: '/battle/generate',
      params: {
        subject,
        topic: trimmedTopic,
        difficulty,
        questionCount: String(questionCount),
      },
    });
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View className="px-6 pt-2">
            <BackButton />
          </View>

          <ScrollView
            contentContainerClassName="gap-7 px-6 pb-8 pt-5"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Animated.View entering={stagger(0)} className="gap-2">
              <ThemedText variant="display">Create a Battle</ThemedText>
              <ThemedText variant="caption" tone="muted">
                Pick your ground. We&apos;ll generate the questions.
              </ThemedText>
            </Animated.View>

            <Animated.View entering={stagger(1)}>
              <Field label="Subject">
                <OptionSelector
                  accessibilityLabel="Subject"
                  options={SUBJECT_OPTIONS}
                  value={subject}
                  onChange={setSubject}
                  variant="wrap"
                />
              </Field>
            </Animated.View>

            <Animated.View entering={stagger(2)}>
              <Field
                label="Topic"
                hint={`${trimmedTopic.length}/${MAX_TOPIC_LENGTH}`}>
                <TextField
                  value={topic}
                  onChangeText={setTopic}
                  placeholder="e.g. Cell division"
                  maxLength={MAX_TOPIC_LENGTH}
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="done"
                  accessibilityLabel="Topic"
                />
              </Field>
            </Animated.View>

            <Animated.View entering={stagger(3)}>
              <Field label="Difficulty">
                <OptionSelector
                  accessibilityLabel="Difficulty"
                  options={DIFFICULTY_OPTIONS}
                  value={difficulty}
                  onChange={setDifficulty}
                />
              </Field>
            </Animated.View>

            <Animated.View entering={stagger(4)}>
              <Field label="Questions">
                <OptionSelector
                  accessibilityLabel="Number of questions"
                  options={QUESTION_COUNT_OPTIONS}
                  value={questionCount}
                  onChange={setQuestionCount}
                />
              </Field>
            </Animated.View>
          </ScrollView>

          <View
            className="border-t border-border px-6 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, Spacing.lg) }}>
            <Button
              label="Create Battle"
              size="large"
              disabled={!canCreate}
              onPress={handleCreate}
              icon={
                <MaterialCommunityIcons
                  name="sword-cross"
                  size={20}
                  color={theme.accentFg}
                />
              }
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
