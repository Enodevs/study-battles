import { forwardRef } from 'react';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TextFieldProps = TextInputProps;

/** Themed single-line input whose border warms to the accent colour on focus. */
export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { onFocus, onBlur, ...rest },
  ref
) {
  const theme = useTheme();
  const focus = useSharedValue(0);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(focus.get(), [0, 1], [theme.border, theme.accent]),
  }));

  return (
    <Animated.View style={[styles.container, borderStyle, { backgroundColor: theme.surface }]}>
      <TextInput
        ref={ref}
        placeholderTextColor={theme.muted}
        selectionColor={theme.accent}
        className="text-body font-medium text-fg"
        style={styles.input}
        onFocus={(event) => {
          focus.set(withTiming(1, { duration: 160 }));
          onFocus?.(event);
        }}
        onBlur={(event) => {
          focus.set(withTiming(0, { duration: 160 }));
          onBlur?.(event);
        }}
        {...rest}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.control,
    borderWidth: 1,
    paddingHorizontal: Spacing.lg,
  },
  input: {
    paddingVertical: Spacing.md,
    // Without a floor the box collapses around a single line on Android.
    minHeight: 50,
  },
});
