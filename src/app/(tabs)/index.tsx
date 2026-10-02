import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActiveBattles } from '@/components/home/active-battles';
import { BattleCta } from '@/components/home/battle-cta';
import { HomeHeader } from '@/components/home/home-header';
import { PracticeSection } from '@/components/home/practice-section';
import { MOCK_BATTLES, MOCK_USER, MOCK_WEAK_TOPICS } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';

export default function HomeScreen() {
  const tabBarHeight = useTabBarHeight();

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <ScrollView
          contentContainerClassName="gap-8 px-6 pt-6"
          contentContainerStyle={{ paddingBottom: tabBarHeight + Spacing.xxl }}
          showsVerticalScrollIndicator={false}>
          <HomeHeader name={MOCK_USER.name} streakDays={MOCK_USER.streakDays} />

          <BattleCta 
            onPress={() => router.push('/battle/create')} 
            onJoinPress={() => router.push('/battle/join')}
          />

          <ActiveBattles battles={MOCK_BATTLES} />

          <PracticeSection weakTopics={MOCK_WEAK_TOPICS} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
