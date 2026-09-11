import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';

export type PlaceholderScreenProps = {
  title: string;
  description: string;
};

/** Temporary screen body for tabs that are not built yet. */
export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  const tabBarHeight = useTabBarHeight();

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <View
          className="flex-1 items-center justify-center gap-2 px-6"
          style={{ paddingBottom: tabBarHeight }}>
          <ThemedText variant="title">{title}</ThemedText>
          <ThemedText variant="caption" tone="muted" className="text-center">
            {description}
          </ThemedText>
        </View>
      </SafeAreaView>
    </View>
  );
}
