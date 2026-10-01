import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeSection } from '@/components/home/practice-section';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MOCK_WEAK_TOPICS } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';

export default function PracticeScreen() {
  const tabBarHeight = useTabBarHeight();

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="gap-6 px-6 py-6"
          contentContainerStyle={{ paddingBottom: tabBarHeight + Spacing.xxl }}
          showsVerticalScrollIndicator={false}>
          <View className="gap-2">
            <ThemedText variant="display">Practice</ThemedText>
            <ThemedText variant="caption" tone="muted">
              Improve your weak areas with targeted drills
            </ThemedText>
          </View>

          <Button
            label="Start Random Practice"
            size="large"
            variant="secondary"
            iconName="lightning-bolt"
            onPress={() => router.push('/practice/cell-division')}
          />

          <View className="gap-3">
            <ThemedText variant="subheading">Weak Topics</ThemedText>
            <ThemedText variant="caption" tone="muted">
              Focus on these topics to improve your overall accuracy
            </ThemedText>
            <PracticeSection weakTopics={MOCK_WEAK_TOPICS} />
          </View>

          <View className="gap-3 rounded-card border border-border bg-surface p-6">
            <ThemedText variant="subheading">Practice Stats</ThemedText>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Total Questions
                </ThemedText>
                <ThemedText variant="bodyLarge">80</ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Correct Answers
                </ThemedText>
                <ThemedText variant="bodyLarge" tone="success">
                  54
                </ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Overall Accuracy
                </ThemedText>
                <ThemedText variant="bodyLarge">68%</ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
