import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActiveBattles } from '@/components/home/active-battles';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTabBarHeight } from '@/hooks/use-tab-bar-height';
import { useTheme } from '@/hooks/use-theme';
import { ensureAuthenticated } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Battle } from '@/types/battle';

export default function BattlesScreen() {
  const tabBarHeight = useTabBarHeight();
  const theme = useTheme();
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBattles() {
      try {
        const user = await ensureAuthenticated();

      // Fetch battles where user is a player
      const { data: playerRecords, error: playerError } = await supabase
        .from('battle_players')
        .select('battle_id')
        .eq('user_id', user.id);

      if (playerError) throw playerError;

      if (!playerRecords || playerRecords.length === 0) {
        setLoading(false);
        return;
      }

      const battleIds = playerRecords.map((p: any) => p.battle_id);

      // Fetch battle details
      const { data: battlesData, error: battlesError } = await supabase
        .from('battles')
        .select('*')
        .in('id', battleIds)
        .order('created_at', { ascending: false });

      if (battlesError) throw battlesError;

      // Fetch all players for these battles
      const { data: allPlayers, error: playersError } = await supabase
        .from('battle_players')
        .select('*')
        .in('battle_id', battleIds);

      if (playersError) throw playersError;

      // Transform to Battle type
      const transformedBattles: Battle[] = battlesData?.map((battle: any) => {
        const battlePlayers = allPlayers?.filter((p: any) => p.battle_id === battle.id) || [];
        const myPlayer = battlePlayers.find((p: any) => p.user_id === user.id);
        const opponent = battlePlayers.find((p: any) => p.user_id !== user.id);

        let status: Battle['status'] = 'waiting_opponent';
        
        if (battle.status === 'completed') {
          if (myPlayer && opponent) {
            status = myPlayer.score > opponent.score ? 'won' : 
                     myPlayer.score < opponent.score ? 'lost' : 'draw';
          }
        } else if (opponent) {
          status = 'waiting_opponent'; // Simplified for now
        }

        return {
          id: battle.id,
          subject: battle.subject,
          topic: battle.topic,
          opponent: {
            id: opponent?.user_id || 'unknown',
            name: opponent?.display_name || 'Waiting...',
          },
          status,
          questionCount: battle.question_count,
          yourScore: myPlayer?.score,
          opponentScore: opponent?.score,
        };
      }) || [];

      setBattles(transformedBattles);
    } catch (err) {
      console.error('Failed to fetch battles:', err);
    } finally {
      setLoading(false);
    }
  }
  
  fetchBattles();
}, []);

  const activeBattles = battles.filter(
    (b: Battle) => b.status === 'your_turn' || b.status === 'waiting_opponent'
  );
  const completedBattles = battles.filter(
    (b: Battle) => b.status === 'won' || b.status === 'lost' || b.status === 'draw'
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

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

          {battles.length === 0 ? (
            <View className="items-center gap-4 py-12">
              <ThemedText variant="title" tone="muted">
                No battles yet
              </ThemedText>
              <ThemedText variant="body" tone="muted" className="text-center">
                Create your first battle and challenge a friend!
              </ThemedText>
            </View>
          ) : (
            <>
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
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
