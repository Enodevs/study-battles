import { View } from 'react-native';

import { ToneBackground, type Tone } from '@/constants/theme';
import { cn } from '@/utils/cn';

export type ProgressBarProps = {
  /** Progress from 0 to 1. Values outside the range are clamped. */
  value: number;
  tone?: Tone;
  height?: number;
};

export function ProgressBar({ value, tone = 'accent', height = 8 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      className="w-full overflow-hidden rounded-full bg-bg"
      style={{ height }}>
      <View
        className={cn('h-full rounded-full', ToneBackground[tone])}
        style={{ width: `${clamped * 100}%` }}
      />
    </View>
  );
}
