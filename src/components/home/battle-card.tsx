import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Avatar } from '@/components/ui/avatar';
import type { Battle } from '@/types/battle';
import { getBattleStatusDisplay } from '@/utils/battle-status';
import { cn } from '@/utils/cn';

import type { Tone } from '@/constants/theme';

export type BattleCardProps = {
  battle: Battle;
  onPress?: (battle: Battle) => void;
};

export function BattleCard({ battle, onPress }: BattleCardProps) {
  const status = getBattleStatusDisplay(battle.status);

  return (
    <Pressable
      onPress={() => onPress?.(battle)}
      accessibilityRole="button"
      accessibilityLabel={`${battle.subject} battle versus ${battle.opponent.name}. ${status.label}.`}
      className="min-h-[80px] flex-row items-center gap-4 rounded-card border border-border bg-surface p-6 active:bg-surface-pressed">
      <Avatar name={battle.opponent.name} />

      <View className="flex-1 gap-1">
        <ThemedText variant="bodyLarge" numberOfLines={1}>
          {battle.subject}
        </ThemedText>
        <ThemedText variant="caption" tone="muted" numberOfLines={1}>
          vs {battle.opponent.name} · {battle.topic}
        </ThemedText>
      </View>

      {status.emphasis === 'result' ? (
        <BattleResult battle={battle} label={status.label} tone={status.tone} />
      ) : (
        <BattleStatusPill label={status.label} tone={status.tone} />
      )}
    </Pressable>
  );
}

function BattleResult({ battle, label, tone }: { battle: Battle; label: string; tone: Tone }) {
  return (
    <View className="items-end gap-1">
      <ThemedText variant="heading" className="tabular-nums">
        {battle.yourScore ?? 0}–{battle.opponentScore ?? 0}
      </ThemedText>
      <ThemedText variant="caption" tone={tone}>
        {label}
      </ThemedText>
    </View>
  );
}

function BattleStatusPill({ label, tone }: { label: string; tone: Tone }) {
  const isAccent = tone === 'accent';

  return (
    <View
      className={cn(
        'rounded-full px-4 py-2',
        isAccent ? 'bg-accent' : 'border border-border bg-bg'
      )}>
      <ThemedText variant="captionBold" tone={isAccent ? 'accentFg' : 'muted'}>
        {label}
      </ThemedText>
    </View>
  );
}
