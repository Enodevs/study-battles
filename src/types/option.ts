import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

/** One choice in a single-select group. */
export type Option<T> = {
  value: T;
  label: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};
