import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const AVATAR = 76;

export type VersusRowProps = {
  youName: string;
  opponentName: string;
  /** Dims the opponent while there is nobody in that seat yet. */
  opponentPending?: boolean;
};

/** Two fighters facing each other, with a badge between them. */
export function VersusRow({ youName, opponentName, opponentPending }: VersusRowProps) {
  return (
    <View style={styles.row}>
      <Fighter
        name={youName}
        source={require('@/assets/images/sleepy-raccoon.png')}
      />

      <VersusBadge />

      <Fighter
        name={opponentName}
        source={require('@/assets/images/proboscis-monkey.webp')}
        pending={opponentPending}
      />
    </View>
  );
}

function Fighter({
  name,
  source,
  pending,
}: {
  name: string;
  source: number;
  pending?: boolean;
}) {
  return (
    <View style={[styles.fighter, pending ? styles.fighterPending : undefined]}>
      <View style={styles.avatarRing} className="border-border bg-surface">
        <Image source={source} style={styles.avatar} contentFit="cover" />
      </View>

      <ThemedText variant="captionBold" numberOfLines={1}>
        {name}
      </ThemedText>
    </View>
  );
}

function VersusBadge() {
  const theme = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: theme.fg }]}>
      <ThemedText variant="captionBold" tone="accentFg" className="tracking-[1px]">
        VS
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  fighter: {
    alignItems: 'center',
    gap: Spacing.sm,
    // Equal halves, so the badge sits dead centre whatever the names are.
    flex: 1,
  },
  fighterPending: {
    opacity: 0.55,
  },
  avatarRing: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
});
