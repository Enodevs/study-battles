import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActiveBattles } from '@/components/home/active-battles';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MOCK_BATTLES } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';

export default function BattlesScreen() {
  const tabBarHeight = useTabBarHeight();

  const activeBattles = MOCK_BATTLES.filter(
    (b) => b.status === 'your_turn' || b.status === 'waiting_opponent'
  );
  const completedBattles = MOCK_BATTLES.filter(
    (b) => b.status === 'won' || b.status === 'lost'
  );

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="gap-6 px-6 py-6"
          contentContainerStyle={{ paddingBottom: tabBarHeight + Spacing.xxl }}
          showsVerticalScrollIndicator={false}>
          <View className="gap-2">
            <ThemedText variant="display">Battles</ThemedText>
            <ThemedText variant="caption" tone="muted">
              Your competitive study sessions
            </ThemedText>
          </View>

          <Button
            label="Create New Battle"
            size="large"
            iconName="sword-cross"
            onPress={() => router.push('/battle/create')}
          />

          {activeBattles.length > 0 && (
            <View className="gap-3">
              <ThemedText variant="subheading">Active Battles</ThemedText>
              <ActiveBattles battles={activeBattles} />
            </View>
          )}

          {completedBattles.length > 0 && (
            <View className="gap-3">
              <ThemedText variant="subheading">Completed</ThemedText>
              <ActiveBattles battles={completedBattles} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
