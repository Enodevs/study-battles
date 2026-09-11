import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, View, type GestureResponderEvent } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SnappySpringConfig,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  WigglySpringConfig,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  MaxContentWidth,
  MicroTextStyle,
  Radius,
  Spacing,
  TabBarIndicatorHeight,
} from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { selectionFeedback } from '@/utils/haptics';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const INDICATOR_WIDTH = 64;
const ICON_SIZE = 24;

/** Opacity of the accent wash behind the active icon. */
const INDICATOR_OPACITY = 0.14;

export type TabBarButtonProps = TabTriggerSlotProps & {
  label: string;
  icon: IconName;
  activeIcon: IconName;
};

export function TabBarButton({
  label,
  icon,
  activeIcon,
  isFocused,
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: TabBarButtonProps) {
  const theme = useTheme();
  const focused = Boolean(isFocused);

  // A wiggly spring overshoots 1 on the way in — that overshoot is the bounce.
  // Anything that should not exceed its end value clamps `progress` below.
  const progress = useDerivedValue(
    () => withSpring(focused ? 1 : 0, WigglySpringConfig),
    [focused]
  );
  const pressed = useSharedValue(0);

  /** `progress` without the overshoot, for opacity and colour. */
  const settled = useDerivedValue(() =>
    interpolate(progress.get(), [0, 1], [0, 1], Extrapolation.CLAMP)
  );

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.get(), [0, 1], [1, 0.88]) }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: settled.get() * INDICATOR_OPACITY,
    transform: [{ scale: interpolate(progress.get(), [0, 1], [0.6, 1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.get(), [0, 1], [1, 1.12]) },
      { translateY: interpolate(progress.get(), [0, 1], [0, -1]) },
    ],
  }));

  // Cross-fading two icons swaps outline for filled without animating a colour
  // prop, which vector icons do not expose to the animated style.
  const restingIconStyle = useAnimatedStyle(() => ({ opacity: 1 - settled.get() }));
  const activeIconStyle = useAnimatedStyle(() => ({ opacity: settled.get() }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(settled.get(), [0, 1], [theme.muted, theme.accent]),
  }));

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      // react-native-web reads the ARIA prop rather than `accessibilityState`,
      // so the selected tab is only announced on web if both are set.
      aria-selected={focused}
      accessibilityLabel={label}
      onPress={(event: GestureResponderEvent) => {
        selectionFeedback();
        onPress?.(event);
      }}
      onPressIn={(event: GestureResponderEvent) => {
        pressed.set(withSpring(1, SnappySpringConfig));
        onPressIn?.(event);
      }}
      onPressOut={(event: GestureResponderEvent) => {
        pressed.set(withSpring(0, WigglySpringConfig));
        onPressOut?.(event);
      }}
      className="flex-1 items-center justify-center">
      <Animated.View style={[styles.content, contentStyle]}>
        <View style={styles.indicatorSlot}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.indicator,
              indicatorStyle,
              { backgroundColor: theme.accent },
            ]}
          />

          <Animated.View style={[StyleSheet.absoluteFill, styles.iconSlot, iconStyle]}>
            <Animated.View style={restingIconStyle}>
              <MaterialCommunityIcons name={icon} size={ICON_SIZE} color={theme.muted} />
            </Animated.View>

            <Animated.View style={[StyleSheet.absoluteFill, styles.iconSlot, activeIconStyle]}>
              <MaterialCommunityIcons name={activeIcon} size={ICON_SIZE} color={theme.accent} />
            </Animated.View>
          </Animated.View>
        </View>

        <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

/** Container rendered in place of `TabList` — holds the triggers and the safe-area inset. */
export function TabBarContainer({ style, children, ...props }: React.ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets();

  return (
    // The bar itself is full-bleed so its background and border reach the screen
    // edges, but the triggers sit in a track capped at the same width as screen
    // content — otherwise they drift apart from it on tablet and web.
    //
    // `TabList` injects `flex-direction: row` through `style`, so that comes
    // first and the column layout this needs is restated after it.
    <View
      {...props}
      className="border-t-2 border-border bg-bg"
      style={[
        style,
        {
          flexDirection: 'column',
          alignItems: 'center',
          // Kept in JS so `useTabBarHeight()` can reproduce the exact same height.
          paddingBottom: Math.max(insets.bottom, Spacing.sm),
        },
      ]}>
      <View
        className="w-full flex-row items-stretch px-2 pt-2"
        style={{ maxWidth: MaxContentWidth }}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  indicatorSlot: {
    width: INDICATOR_WIDTH,
    height: TabBarIndicatorHeight,
  },
  indicator: {
    borderRadius: Radius.control,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...MicroTextStyle,
  },
});
