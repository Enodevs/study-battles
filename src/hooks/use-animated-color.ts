import { useEffect } from 'react';
import { useSharedValue, withTiming, type SharedValue } from 'react-native-reanimated';

/**
 * A colour that tweens to whatever value it is handed next.
 *
 * Reanimated animates colour strings directly, so this needs neither the
 * previous value nor an interpolation range the way `interpolateColor` does.
 */
export function useAnimatedColor(color: string, duration = 280): SharedValue<string> {
  const value = useSharedValue(color);

  useEffect(() => {
    value.set(withTiming(color, { duration }));
  }, [color, value, duration]);

  return value;
}
