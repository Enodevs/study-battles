import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

/** One choice in a single-select group. */
export type Option<T> = {
  value: T;
  label: string;
  icon?: IconName;
  /**
   * Identity colour for the option, as a hex literal. Used to tint the chip or
   * segment when it is selected; falls back to the theme accent when absent.
   */
  color?: string;
};
