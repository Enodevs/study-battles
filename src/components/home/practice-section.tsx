import { View } from 'react-native';

import { SectionHeader } from '@/components/home/section-header';
import { WeakTopicCard } from '@/components/home/weak-topic-card';
import { ThemedText } from '@/components/themed-text';
import type { WeakTopic } from '@/types/practice';

export type PracticeSectionProps = {
  weakTopics: WeakTopic[];
  onPressTopic?: (weakTopic: WeakTopic) => void;
  onPressSeeAll?: () => void;
};

export function PracticeSection({
  weakTopics,
  onPressTopic,
  onPressSeeAll,
}: PracticeSectionProps) {
  return (
    <View className="gap-4">
      <SectionHeader
        title="Keep improving"
        actionLabel={weakTopics.length > 0 ? 'See all' : undefined}
        onPressAction={onPressSeeAll}
      />

      {weakTopics.length === 0 ? (
        <EmptyPractice />
      ) : (
        <View className="gap-2">
          {weakTopics.map((weakTopic) => (
            <WeakTopicCard key={weakTopic.id} weakTopic={weakTopic} onPress={onPressTopic} />
          ))}
        </View>
      )}
    </View>
  );
}

function EmptyPractice() {
  return (
    <View className="items-center gap-1 rounded-control border border-dashed border-border px-6 py-8">
      <ThemedText variant="captionBold">Nothing to fix yet</ThemedText>
      <ThemedText variant="caption" tone="muted" className="text-center">
        Finish a battle and we&apos;ll show the topics you struggled with.
      </ThemedText>
    </View>
  );
}
