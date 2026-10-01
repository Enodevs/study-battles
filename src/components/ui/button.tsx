import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  SnappySpringConfig,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { IconName } from '@/types/option';
import { selectionFeedback } from '@/utils/haptics';

/**
 * How far the face sits above its bottom edge. Pressing closes the gap, so the
 * control travels without ever changing the space it occupies.
 */
const DEPTH = 4;

const ICON_SIZE = { medium: 18, large: 20 } as const;

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  /** Custom leading node. `iconName` is the shorter path when a glyph will do. */
  icon?: ReactNode;
  iconName?: IconName;
  disabled?: boolean;
  /** Layout classes for the pressable itself, e.g. `self-stretch`. */
  className?: string;
};

/**
 * The app's only button: a face resting on a darker bottom edge, which it sinks
 * onto when pressed.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconName,
  disabled,
  className,
}: ButtonProps) {
  const theme = useTheme();
  const pressed = useSharedValue(0);

  const isPrimary = variant === 'primary';
  const face = isPrimary ? theme.accent : theme.surface;
  const edge = isPrimary ? theme.accentShadow : theme.surfaceShadow;
  const contentColor = isPrimary ? theme.accentFg : theme.fg;

  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(pressed.get(), [0, 1], [0, DEPTH]) }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        if (disabled) return;
        selectionFeedback();
        // Timing in, spring out: the sink should feel instant, the release soft.
        pressed.set(withTiming(1, { duration: 70 }));
      }}
      onPressOut={() => pressed.set(withSpring(0, SnappySpringConfig))}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      className={className}
      style={disabled ? styles.disabled : undefined}>
      <View style={[styles.edge, { backgroundColor: edge }]}>
        <Animated.View
          style={[
            styles.face,
            size === 'large' ? styles.faceLarge : styles.faceMedium,
            { backgroundColor: face },
            faceStyle,
          ]}>
          {iconName ? (
            <MaterialCommunityIcons
              name={iconName}
              size={ICON_SIZE[size]}
              color={contentColor}
            />
          ) : (
            icon
          )}

          <ThemedText
            variant={size === 'large' ? 'bodyLarge' : 'label'}
            tone={isPrimary ? 'accentFg' : 'fg'}>
            {label}
          </ThemedText>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.45,
  },
  edge: {
    borderRadius: Radius.control,
    // Reserves the travel, so the face has somewhere to go on press.
    paddingBottom: DEPTH,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderRadius: Radius.control,
    paddingHorizontal: Spacing.xl,
  },
  faceMedium: {
    paddingVertical: Spacing.md,
  },
  faceLarge: {
    paddingVertical: Spacing.lg,
  },
});
