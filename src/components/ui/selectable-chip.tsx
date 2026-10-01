import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  GentleSpringConfig,
  interpolate,
  interpolateColor,
  SnappySpringConfig,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  WigglySpringConfig,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { IconName } from '@/types/option';
import { shade } from '@/utils/color';
import { selectionFeedback } from '@/utils/haptics';

const ICON_SIZE = 18;

/** Matches the button, one step shallower — a chip is a smaller object. */
const DEPTH = 3;

const SELECTED_FG = '#FFFFFF';

export type SelectableChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
  /** Identity colour to fill with once selected. Defaults to the theme accent. */
  color?: string;
  /** Stretch to share a row equally — used for segmented groups. */
  fill?: boolean;
};

/**
 * One tappable option. Selecting springs the fill from resting surface to the
 * option's own colour and pops the chip; pressing sinks it onto its edge.
 */
export function SelectableChip({
  label,
  selected,
  onPress,
  icon,
  color,
  fill,
}: SelectableChipProps) {
  const theme = useTheme();
  const tint = color ?? theme.accent;
  // Resolved on the JS thread: `shade` is plain JavaScript, so a worklet cannot
  // call it.
  const edge = shade(tint, 0.68);

  // Critically damped: colour must not overshoot the way a scale happily can.
  const progress = useDerivedValue(
    () => withSpring(selected ? 1 : 0, GentleSpringConfig),
    [selected]
  );
  const pressed = useSharedValue(0);
  const pop = useSharedValue(0);

  useEffect(() => {
    if (!selected) return;

    // Out and back, so being chosen reads as a small celebration.
    pop.set(withSequence(withSpring(1, SnappySpringConfig), withSpring(0, WigglySpringConfig)));
  }, [selected, pop]);

  const edgeStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [theme.border, edge]),
    transform: [{ scale: interpolate(pop.get(), [0, 1], [1, 1.05]) }],
  }));

  const faceStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [theme.surface, tint]),
    transform: [{ translateY: interpolate(pressed.get(), [0, 1], [0, DEPTH]) }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.get(), [0, 1], [theme.fg, SELECTED_FG]),
  }));

  return (
    <Pressable
      onPress={() => {
        selectionFeedback();
        onPress();
      }}
      onPressIn={() => pressed.set(withTiming(1, { duration: 70 }))}
      onPressOut={() => pressed.set(withSpring(0, SnappySpringConfig))}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      aria-checked={selected}
      accessibilityLabel={label}
      style={fill ? styles.fill : undefined}>
      <Animated.View style={[styles.edge, edgeStyle]}>
        <Animated.View style={[styles.face, faceStyle]}>
          {icon ? (
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={icon}
                size={ICON_SIZE}
                // Snaps rather than tweens: the icon is a font glyph, so its
                // colour is not reachable from an animated style. The fill
                // springing underneath it covers the change.
                color={selected ? SELECTED_FG : tint}
              />
            </View>
          ) : null}

          <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  edge: {
    borderRadius: Radius.control,
    paddingBottom: DEPTH,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.control,
  },
  icon: {
    // Fixed box so chips in a segmented row keep their labels on one baseline
    // whether or not they carry a glyph.
    width: ICON_SIZE,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
});
