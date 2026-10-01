import { View } from 'react-native';

import { SelectableChip } from '@/components/ui/selectable-chip';
import type { Option } from '@/types/option';

export type OptionSelectorProps<T> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
  /**
   * `segmented` splits one row equally between the options; `wrap` lets
   * hug-width chips flow onto as many lines as they need.
   */
  variant?: 'segmented' | 'wrap';
};

/** Single-select group of chips. */
export function OptionSelector<T extends string | number>({
  options,
  value,
  onChange,
  accessibilityLabel,
  variant = 'segmented',
}: OptionSelectorProps<T>) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      className={variant === 'segmented' ? 'flex-row gap-2.5' : 'flex-row flex-wrap gap-2.5'}>
      {options.map((option) => (
        <SelectableChip
          key={option.value}
          label={option.label}
          icon={option.icon}
          color={option.color}
          selected={option.value === value}
          fill={variant === 'segmented'}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
}
