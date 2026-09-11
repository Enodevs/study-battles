import { View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

export type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 40 }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <View
      className="items-center justify-center rounded-full bg-bg"
      style={{ width: size, height: size }}>
      <ThemedText
        tone="accent"
        className="font-bold"
        style={{ fontSize: size * 0.4, lineHeight: size * 0.5 }}>
        {initial}
      </ThemedText>
    </View>
  );
}
