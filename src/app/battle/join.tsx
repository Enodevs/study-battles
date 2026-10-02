import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { TextField } from '@/components/ui/text-field';
import { MOCK_USER } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { ensureAuthenticated } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { confirmFeedback } from '@/utils/haptics';

const STAGGER_MS = 50;

function stagger(index: number) {
  return FadeInDown.delay(index * STAGGER_MS)
    .duration(300)
    .damping(20)
    .stiffness(140);
}

export default function JoinBattleScreen() {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const trimmedCode = code.trim().toUpperCase();
  const canJoin = trimmedCode.length > 0;

  async function handleJoin() {
    if (!canJoin || isJoining) return;

    confirmFeedback();
    setIsJoining(true);

    try {
      // Authenticate
      await ensureAuthenticated();

      // Get battle by code
      const { data: battle, error: getBattleError } = await supabase.rpc('get_battle_by_code', {
        p_share_code: trimmedCode,
      });

      if (getBattleError) {
        throw getBattleError;
      }

      if (!battle) {
        Alert.alert('Invalid Code', 'No battle found with this code. Please check and try again.');
        setIsJoining(false);
        return;
      }

      // Join the battle
      const { error: joinError } = await supabase.rpc('join_battle', {
        p_share_code: trimmedCode,
        p_display_name: MOCK_USER.name,
      });

      if (joinError) {
        throw joinError;
      }

      // Navigate to battle ready with the battle info
      router.replace({
        pathname: '/battle/ready',
        params: {
          subject: battle.subject,
          topic: battle.topic,
          difficulty: battle.difficulty,
          questionCount: String(battle.question_count),
          battleId: battle.id,
          shareCode: trimmedCode,
        },
      });
    } catch (err) {
      console.error('Failed to join battle:', err);
      Alert.alert(
        'Join Failed',
        err instanceof Error ? err.message : 'Could not join battle. Please try again.'
      );
      setIsJoining(false);
    }
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView
        edges={['top']}
        className="w-full flex-1 self-center"
        style={{ maxWidth: MaxContentWidth }}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View className="px-6 pt-2">
            <BackButton />
          </View>

          <ScrollView
            contentContainerClassName="gap-7 px-6 pb-8 pt-5"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            <Animated.View entering={stagger(0)} className="gap-2">
              <ThemedText variant="display">Join a Battle</ThemedText>
              <ThemedText variant="caption" tone="muted">
                Enter the code shared by your friend to join their battle
              </ThemedText>
            </Animated.View>

            <Animated.View entering={stagger(1)}>
              <Field label="Battle Code">
                <TextField
                  value={code}
                  onChangeText={setCode}
                  iconName="key-variant"
                  placeholder="e.g. ABC12345"
                  autoCapitalize="characters"
                  autoCorrect={false}
                  returnKeyType="done"
                  accessibilityLabel="Battle code"
                  onSubmitEditing={handleJoin}
                />
              </Field>
            </Animated.View>

            <Animated.View entering={stagger(2)} className="gap-2">
              <ThemedText variant="captionBold" tone="muted" className="uppercase tracking-[1px]">
                How it works
              </ThemedText>
              <View className="gap-3 rounded-card border border-border bg-surface p-6">
                <View className="flex-row gap-3">
                  <ThemedText variant="bodyLarge" tone="accent">
                    1.
                  </ThemedText>
                  <ThemedText variant="body" tone="muted" className="flex-1">
                    Your friend creates a battle and shares the code
                  </ThemedText>
                </View>
                <View className="flex-row gap-3">
                  <ThemedText variant="bodyLarge" tone="accent">
                    2.
                  </ThemedText>
                  <ThemedText variant="body" tone="muted" className="flex-1">
                    Enter the code above to join
                  </ThemedText>
                </View>
                <View className="flex-row gap-3">
                  <ThemedText variant="bodyLarge" tone="accent">
                    3.
                  </ThemedText>
                  <ThemedText variant="body" tone="muted" className="flex-1">
                    Start the battle and compete!
                  </ThemedText>
                </View>
              </View>
            </Animated.View>
          </ScrollView>

          <View
            className="gap-3 border-t border-border px-6 pt-4"
            style={{ paddingBottom: Math.max(insets.bottom, Spacing.lg) }}>
            <Button
              label={isJoining ? "Joining..." : "Join Battle"}
              size="large"
              iconName="sword-cross"
              disabled={!canJoin || isJoining}
              onPress={handleJoin}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
