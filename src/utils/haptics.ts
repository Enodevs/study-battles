import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/** Haptics are a nice-to-have: unsupported hardware and Low Power Mode just no-op. */
function play(effect: Promise<void>) {
  effect.catch(() => {});
}

/**
 * Feedback for moving between tabs or picking an option.
 *
 * Web is skipped on purpose: there `expo-haptics` falls back to the Vibration
 * API, which buzzes the whole device — far too heavy for a tap.
 */
export function selectionFeedback() {
  if (Platform.OS === 'web') return;

  play(
    Platform.OS === 'android'
      ? // Expo recommends the Android-native effects over `impactAsync`: they sit
        // closer to iOS haptics and need no VIBRATE permission.
        Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Segment_Tick)
      : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  );
}

/** Weightier feedback for committing to something, like creating a battle. */
export function confirmFeedback() {
  if (Platform.OS === 'web') return;

  play(
    Platform.OS === 'android'
      ? Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm)
      : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  );
}
