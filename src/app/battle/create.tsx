import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BattlePreviewCard } from '@/components/battle/battle-preview-card';
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
import type { Difficulty, QuestionCount, Subject } from '@/types/battle';
import { confirmFeedback } from '@/utils/haptics';

/** Each block slides in just after the one above it. */
const STAGGER_MS = 50;

/** How many characters are left before the counter starts warning. */
const TOPIC_WARNING_SLACK = 10;

function stagger(index: number) {
  return FadeInDown.delay(index * STAGGER_MS)
    .duration(300)
    .damping(20)
    .stiffness(140);
}

export default function CreateBattleScreen() {
  const insets = useSafeAreaInsets();

  const [subject, setSubject] = useState<Subject>(DEFAULT_SUBJECT);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [questionCount, setQuestionCount] = useState<QuestionCount>(DEFAULT_QUESTION_COUNT);

  const trimmedTopic = topic.trim();
  // Nothing can be generated without a topic, so that is the one gate.
  const canCreate = trimmedTopic.length > 0;
  const nearTopicLimit = trimmedTopic.length > MAX_TOPIC_LENGTH - TOPIC_WARNING_SLACK;

  function handleCreate() {
    confirmFeedback();

    router.push({
      pathname: '/battle/generating',
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
            keyboardDismissMode="on-drag"
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
                hint={`${trimmedTopic.length}/${MAX_TOPIC_LENGTH}`}
                hintTone={nearTopicLimit ? 'streak' : 'muted'}>
                <TextField
                  value={topic}
                  onChangeText={setTopic}
                  iconName="pencil-outline"
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

            <Animated.View entering={stagger(5)} className="gap-3">
              <ThemedText
                variant="captionBold"
                tone="muted"
                className="uppercase tracking-[1px]">
                Your battle
              </ThemedText>

              <BattlePreviewCard
                subject={subject}
                topic={trimmedTopic}
                difficulty={difficulty}
                questionCount={questionCount}
              />
            </Animated.View>
          </ScrollView>

          <View
            className="gap-3 border-t border-border px-6 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, Spacing.lg) }}>
            {!canCreate ? (
              <Animated.View entering={FadeIn.duration(200)}>
                <ThemedText variant="caption" tone="muted" className="text-center">
                  Add a topic to continue
                </ThemedText>
              </Animated.View>
            ) : null}

            <Button
              label="Create Battle"
              size="large"
              iconName="sword-cross"
              disabled={!canCreate}
              onPress={handleCreate}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
