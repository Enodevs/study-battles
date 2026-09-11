import { View } from 'react-native';

import { BattleCard } from '@/components/home/battle-card';
import { SectionHeader } from '@/components/home/section-header';
import { ThemedText } from '@/components/themed-text';
import type { Battle } from '@/types/battle';

export type ActiveBattlesProps = {
  battles: Battle[];
  onPressBattle?: (battle: Battle) => void;
  onPressSeeAll?: () => void;
};

export function ActiveBattles({ battles, onPressBattle, onPressSeeAll }: ActiveBattlesProps) {
  return (
    <View className="gap-6">
      <SectionHeader
        title="Your battles"
        actionLabel={battles.length > 0 ? 'See all' : undefined}
        onPressAction={onPressSeeAll}
      />

      {battles.length === 0 ? (
        <EmptyBattles />
      ) : (
        <View className="gap-4">
          {battles.map((battle) => (
            <BattleCard key={battle.id} battle={battle} onPress={onPressBattle} />
          ))}
        </View>
      )}
    </View>
  );
}

function EmptyBattles() {
  return (
    <View className="items-center gap-2 rounded-card border-2 border-dashed border-border px-6 py-16">
      <ThemedText variant="captionBold">No battles yet</ThemedText>
      <ThemedText variant="caption" tone="muted" className="max-w-[280px] text-center">
        Create a battle and challenge a friend to get started.
      </ThemedText>
    </View>
  );
}
