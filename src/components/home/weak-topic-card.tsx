import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import type { WeakTopic } from '@/types/practice';
import { formatAccuracy, getAccuracyTone } from '@/utils/accuracy';

export type WeakTopicCardProps = {
  weakTopic: WeakTopic;
  onPress?: (weakTopic: WeakTopic) => void;
};

export function WeakTopicCard({ weakTopic, onPress }: WeakTopicCardProps) {
  const tone = getAccuracyTone(weakTopic.accuracy);

  return (
    <View className="gap-4 rounded-control border border-border bg-surface p-4">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-0.5">
          <ThemedText variant="bodyLarge" numberOfLines={1}>
            {weakTopic.topic}
          </ThemedText>
          <ThemedText variant="caption" tone="muted" numberOfLines={1}>
            {weakTopic.subject} · {weakTopic.questionsAnswered} questions
          </ThemedText>
        </View>

        <ThemedText variant="subheading" tone={tone} className="tabular-nums">
          {formatAccuracy(weakTopic.accuracy)}
        </ThemedText>
      </View>

      <ProgressBar value={weakTopic.accuracy} tone={tone} />

      <Button label="Practice" variant="secondary" onPress={() => onPress?.(weakTopic)} />
    </View>
  );
}
