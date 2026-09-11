import type { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { cn } from '@/utils/cn';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  disabled,
  className,
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-control active:scale-[0.98]',
        size === 'large' ? 'px-6 py-4' : 'px-6 py-3',
        isPrimary
          ? 'bg-accent active:bg-accent-pressed'
          : // Bordered and on the page background so the button still reads as a
            // control when it sits inside a `bg-surface` card.
            'border border-border bg-bg active:bg-surface-pressed',
        disabled && 'opacity-50',
        className
      )}>
      {icon}

      <ThemedText
        variant={size === 'large' ? 'bodyLarge' : 'label'}
        tone={isPrimary ? 'accentFg' : 'fg'}>
        {label}
      </ThemedText>
    </Pressable>
  );
}
