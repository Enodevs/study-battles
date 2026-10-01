import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { IconName } from '@/types/option';

export type TextFieldProps = TextInputProps & {
  /** Leading glyph, tinted to match the border as the field takes focus. */
  iconName?: IconName;
};

/** Themed single-line input whose border warms to the accent colour on focus. */
export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { onFocus, onBlur, iconName, ...rest },
  ref
) {
  const theme = useTheme();
  const focus = useSharedValue(0);
  const [focused, setFocused] = useState(false);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(focus.get(), [0, 1], [theme.border, theme.accent]),
  }));

  return (
    <Animated.View style={[styles.container, borderStyle, { backgroundColor: theme.surface }]}>
      {iconName ? (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={focused ? theme.accent : theme.muted}
        />
      ) : null}

      <TextInput
        ref={ref}
        placeholderTextColor={theme.muted}
        selectionColor={theme.accent}
        className="text-body font-medium text-fg"
        style={styles.input}
        onFocus={(event) => {
          focus.set(withTiming(1, { duration: 160 }));
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          focus.set(withTiming(0, { duration: 160 }));
          setFocused(false);
          onBlur?.(event);
        }}
        {...rest}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderRadius: Radius.control,
    // Two pixels at rest as well as on focus: animating the width would shift
    // the text inside the field every time it is tapped.
    borderWidth: 2,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    // Without a floor the box collapses around a single line on Android.
    minHeight: 50,
  },
});
