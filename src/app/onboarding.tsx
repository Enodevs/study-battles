import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { OptionSelector } from '@/components/ui/option-selector';
import { SelectableChip } from '@/components/ui/selectable-chip';
import { MaxContentWidth } from '@/constants/theme';
import { confirmFeedback } from '@/utils/haptics';

const STUDY_REASONS = [
  { label: 'Exams', value: 'exams' },
  { label: 'School', value: 'school' },
  { label: 'Self-learning', value: 'self-learning' },
  { label: 'Competition', value: 'competition' },
];

const SUBJECTS = [
  { label: 'Mathematics', value: 'Mathematics' },
  { label: 'Biology', value: 'Biology' },
  { label: 'Chemistry', value: 'Chemistry' },
  { label: 'Physics', value: 'Physics' },
  { label: 'History', value: 'History' },
  { label: 'English', value: 'English' },
];

const STAGGER_MS = 80;

function stagger(index: number) {
  return FadeInDown.delay(index * STAGGER_MS)
    .duration(400)
    .damping(20)
    .stiffness(140);
}

export default function OnboardingScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [reason, setReason] = useState<string>('');
  const [subjects, setSubjects] = useState<string[]>([]);

  const handleReasonSelect = (value: string) => {
    setReason(value);
  };

  const handleSubjectToggle = (value: string) => {
    if (subjects.includes(value)) {
      setSubjects(subjects.filter((s) => s !== value));
    } else {
      setSubjects([...subjects, value]);
    }
  };

  const handleContinue = () => {
    confirmFeedback();
    if (step === 1) {
      setStep(2);
    } else {
      // In a real app, save preferences to AsyncStorage
      router.replace('/(tabs)');
    }
  };

  const canContinue = step === 1 ? reason !== '' : subjects.length > 0;

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top', 'bottom']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="flex-1 gap-8 px-6 py-8"
          showsVerticalScrollIndicator={false}>
          {step === 1 ? (
            <Animated.View entering={FadeIn.duration(300)} className="flex-1 gap-8">
              <View className="items-center gap-4">
                <Animated.View
                  entering={stagger(0)}
                  className="h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <MaterialCommunityIcons name="sword-cross" size={40} color="#4F46E5" />
                </Animated.View>

                <Animated.View entering={stagger(1)} className="gap-2">
                  <ThemedText variant="display" className="text-center">
                    Welcome to Study Battles
                  </ThemedText>
                  <ThemedText variant="body" tone="muted" className="text-center">
                    Turn studying into a competition with your friends
                  </ThemedText>
                </Animated.View>
              </View>

              <Animated.View entering={stagger(2)} className="flex-1 gap-4">
                <ThemedText variant="heading">Why do you study?</ThemedText>

                <Animated.View entering={stagger(3)}>
                  <OptionSelector
                    options={STUDY_REASONS}
                    value={reason}
                    onChange={handleReasonSelect}
                    variant="wrap"
                    accessibilityLabel="Study reason"
                  />
                </Animated.View>
              </Animated.View>

              <Animated.View entering={stagger(7)}>
                <Button
                  label="Continue"
                  size="large"
                  disabled={!canContinue}
                  onPress={handleContinue}
                />
              </Animated.View>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeIn.duration(300)} className="flex-1 gap-8">
              <Animated.View entering={stagger(0)} className="gap-2">
                <ThemedText variant="display">Choose your subjects</ThemedText>
                <ThemedText variant="body" tone="muted">
                  Select the subjects you want to battle in
                </ThemedText>
              </Animated.View>

              <Animated.View entering={stagger(1)} className="flex-1">
                <View className="flex-row flex-wrap gap-2.5">
                  {SUBJECTS.map((subject, index) => {
                    const isSelected = subjects.includes(subject.value);
                    return (
                      <Animated.View key={subject.value} entering={stagger(2 + index)}>
                        <SelectableChip
                          label={subject.label}
                          selected={isSelected}
                          onPress={() => handleSubjectToggle(subject.value)}
                        />
                      </Animated.View>
                    );
                  })}
                </View>
              </Animated.View>

              <Animated.View entering={stagger(8)} className="gap-3">
                {!canContinue && (
                  <ThemedText variant="caption" tone="muted" className="text-center">
                    Select at least one subject to continue
                  </ThemedText>
                )}
                <View className="flex-row gap-3">
                  <Button
                    label="Back"
                    variant="secondary"
                    size="large"
                    onPress={() => setStep(1)}
                    className="flex-1"
                  />
                  <Button
                    label="Get Started"
                    size="large"
                    disabled={!canContinue}
                    onPress={handleContinue}
                    className="flex-1"
                  />
                </View>
              </Animated.View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
