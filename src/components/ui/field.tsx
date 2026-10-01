import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { Tone } from '@/constants/theme';

export type FieldProps = {
  label: string;
  /** Optional right-aligned note, e.g. a character count. */
  hint?: string;
  /** Lets a field warn through its hint without a second slot. */
  hintTone?: Tone;
  children: React.ReactNode;
};

/** A labelled block in a form. */
export function Field({ label, hint, hintTone = 'muted', children }: FieldProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between gap-2">
        <ThemedText variant="captionBold" tone="muted" className="uppercase tracking-[1px]">
          {label}
        </ThemedText>

        {hint ? (
          <ThemedText variant="captionBold" tone={hintTone} className="tabular-nums">
            {hint}
          </ThemedText>
        ) : null}
      </View>

      {children}
    </View>
  );
}
