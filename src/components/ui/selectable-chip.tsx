import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  GentleSpringConfig,
  interpolate,
  interpolateColor,
  SnappySpringConfig,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  WigglySpringConfig,
  withSpring,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { selectionFeedback } from '@/utils/haptics';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const ICON_SIZE = 18;

export type SelectableChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
  /** Stretch to share a row equally — used for segmented groups. */
  fill?: boolean;
};

/**
 * One tappable option. Selection springs the background and label between the
 * resting and accent colours; pressing squashes the chip.
 */
export function SelectableChip({ label, selected, onPress, icon, fill }: SelectableChipProps) {
  const theme = useTheme();

  // Critically damped: colour must not overshoot the way a scale happily can.
  const progress = useDerivedValue(
    () => withSpring(selected ? 1 : 0, GentleSpringConfig),
    [selected]
  );
  const pressed = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.get(), [0, 1], [theme.surface, theme.accent]),
    borderColor: interpolateColor(progress.get(), [0, 1], [theme.border, theme.accent]),
    transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.94]) }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.get(), [0, 1], [theme.fg, theme.accentFg]),
  }));

  return (
    <Pressable
      onPress={() => {
        selectionFeedback();
        onPress();
      }}
      onPressIn={() => pressed.set(withSpring(1, SnappySpringConfig))}
      onPressOut={() => pressed.set(withSpring(0, WigglySpringConfig))}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      aria-checked={selected}
      accessibilityLabel={label}
      style={fill ? styles.fill : undefined}>
      <Animated.View style={[styles.chip, containerStyle]}>
        {icon ? (
          <MaterialCommunityIcons
            name={icon}
            size={ICON_SIZE}
            // Snaps rather than tweens: the icon is a font glyph, so its colour
            // is not reachable from an animated style. The background springing
            // underneath it covers the change.
            color={selected ? theme.accentFg : theme.muted}
          />
        ) : null}

        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.control,
    borderWidth: 1,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
});
