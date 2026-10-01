import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MOCK_USER } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';
import { useTheme } from '@/hooks/use-theme';

export default function ProfileScreen() {
  const tabBarHeight = useTabBarHeight();
  const theme = useTheme();

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
          {/* Profile Header */}
          <View className="items-center gap-4 rounded-card border border-border bg-surface p-8">
            <Image
              source={require('@/assets/images/sleepy-raccoon.png')}
              className="size-24 rounded-full"
            />
            <View className="gap-1">
              <ThemedText variant="title" className="text-center">
                {MOCK_USER.name}
              </ThemedText>
              <ThemedText variant="caption" tone="muted" className="text-center">
                Student • Level 5
              </ThemedText>
            </View>

            <View className="flex-row gap-4">
              <View className="items-center gap-1">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="flame" size={20} color={theme.streak} />
                  <ThemedText variant="subheading">{MOCK_USER.streakDays}</ThemedText>
                </View>
                <ThemedText variant="caption" tone="muted">
                  Day Streak
                </ThemedText>
              </View>

              <View className="h-full w-[1px] bg-border" />

              <View className="items-center gap-1">
                <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons name="diamond-outline" size={20} color={theme.accent} />
                  <ThemedText variant="subheading">500</ThemedText>
                </View>
                <ThemedText variant="caption" tone="muted">
                  Points
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Battle Stats */}
          <View className="gap-3">
            <ThemedText variant="subheading">Battle Stats</ThemedText>
            <View className="gap-2 rounded-card border border-border bg-surface p-6">
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Total Battles
                </ThemedText>
                <ThemedText variant="bodyLarge">12</ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Wins
                </ThemedText>
                <ThemedText variant="bodyLarge" tone="success">
                  8
                </ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Losses
                </ThemedText>
                <ThemedText variant="bodyLarge" tone="danger">
                  4
                </ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Win Rate
                </ThemedText>
                <ThemedText variant="bodyLarge">67%</ThemedText>
              </View>
            </View>
          </View>

          {/* Learning Progress */}
          <View className="gap-3">
            <ThemedText variant="subheading">Learning Progress</ThemedText>
            <View className="gap-2 rounded-card border border-border bg-surface p-6">
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Questions Answered
                </ThemedText>
                <ThemedText variant="bodyLarge">156</ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Correct Answers
                </ThemedText>
                <ThemedText variant="bodyLarge" tone="success">
                  112
                </ThemedText>
              </View>
              <View className="flex-row justify-between">
                <ThemedText variant="body" tone="muted">
                  Overall Accuracy
                </ThemedText>
                <ThemedText variant="bodyLarge">72%</ThemedText>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View className="gap-3">
            <ThemedText variant="subheading">Settings</ThemedText>
            <View className="gap-2">
              <Pressable
                onPress={() => router.push('/onboarding')}
                className="flex-row items-center justify-between rounded-card border border-border bg-surface p-4 active:bg-surface-pressed">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="restart" size={20} color={theme.fg} />
                  <ThemedText variant="body">Restart Onboarding</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={theme.muted} />
              </Pressable>

              <Pressable className="flex-row items-center justify-between rounded-card border border-border bg-surface p-4 active:bg-surface-pressed">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="palette-outline" size={20} color={theme.fg} />
                  <ThemedText variant="body">Theme</ThemedText>
                </View>
                <ThemedText variant="body" tone="muted">
                  System
                </ThemedText>
              </Pressable>

              <Pressable className="flex-row items-center justify-between rounded-card border border-border bg-surface p-4 active:bg-surface-pressed">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="bell-outline" size={20} color={theme.fg} />
                  <ThemedText variant="body">Notifications</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={theme.muted} />
              </Pressable>

              <Pressable className="flex-row items-center justify-between rounded-card border border-border bg-surface p-4 active:bg-surface-pressed">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons name="shield-outline" size={20} color={theme.fg} />
                  <ThemedText variant="body">Privacy</ThemedText>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={theme.muted} />
              </Pressable>
            </View>
          </View>

          <Button
            label="Sign Out"
            variant="secondary"
            size="large"
            iconName="logout"
            onPress={() => {}}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
