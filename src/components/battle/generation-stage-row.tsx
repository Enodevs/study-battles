import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { withAlpha } from '@/utils/color';

export type StageState = 'done' | 'active' | 'pending';

const DOT = 26;

export type GenerationStageRowProps = {
  label: string;
  state: StageState;
  /** Subject colour, so the checklist belongs to this battle. */
  color: string;
};

/** One line of the generation checklist: a marker and what it is waiting on. */
export function GenerationStageRow({ label, state, color }: GenerationStageRowProps) {
  const theme = useTheme();
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (state !== 'active') {
      pulse.set(0);
      return;
    }

    pulse.set(
      withRepeat(
        withSequence(
          withTiming(1, { duration: 620, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 620, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [state, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.get() * 0.65,
    transform: [{ scale: 0.72 + pulse.get() * 0.28 }],
  }));

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.marker,
          state === 'done'
            ? { backgroundColor: color }
            : state === 'active'
              ? { backgroundColor: withAlpha(color, 0.18) }
              : { borderWidth: 2, borderColor: theme.border },
        ]}>
        {state === 'done' ? (
          <MaterialCommunityIcons name="check-bold" size={15} color={theme.accentFg} />
        ) : null}

        {state === 'active' ? (
          <Animated.View style={[styles.pulse, { backgroundColor: color }, pulseStyle]} />
        ) : null}
      </View>

      <ThemedText
        variant={state === 'active' ? 'label' : 'caption'}
        tone={state === 'active' ? 'fg' : 'muted'}
        // Pending work is there for context, not for reading.
        style={state === 'pending' ? styles.pending : undefined}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  marker: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pending: {
    opacity: 0.55,
  },
});
