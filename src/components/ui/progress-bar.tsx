import { StyleSheet, View } from 'react-native';
import Animated, {
  GentleSpringConfig,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { Radius, type Tone } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Tone -> palette key, so the fill can be a value rather than a class name. */
const TONE_KEY = {
  fg: 'fg',
  muted: 'muted',
  accent: 'accent',
  accentFg: 'accentFg',
  streak: 'streak',
  success: 'success',
  danger: 'danger',
} as const satisfies Record<Tone, string>;

export type ProgressBarProps = {
  /** Progress from 0 to 1. Values outside the range are clamped. */
  value: number;
  tone?: Tone;
  /** Raw colour, for progress that follows a subject rather than a tone. */
  color?: string;
  height?: number;
};

/** Track and fill. The fill springs to every new value instead of jumping. */
export function ProgressBar({ value, tone = 'accent', color, height = 10 }: ProgressBarProps) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, value));

  const progress = useDerivedValue(
    () => withSpring(clamped, GentleSpringConfig),
    [clamped]
  );

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.get() * 100}%`,
  }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[styles.track, { height, backgroundColor: theme.surface }]}>
      <Animated.View
        style={[
          styles.fill,
          { backgroundColor: color ?? theme[TONE_KEY[tone]] },
          fillStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
