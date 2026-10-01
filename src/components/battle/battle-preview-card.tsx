import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, useAnimatedStyle } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import {
  DIFFICULTY_OPTIONS,
  SUBJECT_OPTIONS,
  subjectColor,
} from "@/constants/battle-options";
import { Radius, Spacing } from "@/constants/theme";
import { useAnimatedColor } from "@/hooks/use-animated-color";
import { useTheme } from "@/hooks/use-theme";
import type { Difficulty, Subject } from "@/types/battle";

/** How strongly the subject colour washes the card behind the content. */
const TINT_OPACITY = 0.1;

export type BattlePreviewCardProps = {
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  questionCount: number;
  /** Shown in place of the topic before one has been typed. */
  placeholder?: string;
};

/**
 * Live summary of the battle being configured. Re-tints itself whenever the
 * subject changes, which is what makes a subject's colour mean something.
 */
export function BattlePreviewCard({
  subject,
  topic,
  difficulty,
  questionCount,
  placeholder = "Name your topic",
}: BattlePreviewCardProps) {
  const theme = useTheme();

  const subjectOption = SUBJECT_OPTIONS.find(
    (option) => option.value === subject,
  );
  const difficultyOption = DIFFICULTY_OPTIONS.find(
    (option) => option.value === difficulty,
  );

  const tint = useAnimatedColor(subjectColor(subject) ?? theme.accent);

  const colorStyle = useAnimatedStyle(() => ({
    backgroundColor: tint.get(),
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: tint.get(),
  }));

  return (
    <Animated.View style={[styles.card, borderStyle]}>
      {/* Separate layer so the wash can be translucent while the text stays solid. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.wash, colorStyle, { opacity: TINT_OPACITY }]}
      />

      <Animated.View style={[styles.tile, colorStyle]}>
        {subjectOption?.icon ? (
          <Animated.View
            key={subjectOption.icon}
            entering={FadeIn.duration(220)}
          >
            <MaterialCommunityIcons
              name={subjectOption.icon}
              size={26}
              color={theme.accentFg}
            />
          </Animated.View>
        ) : null}
      </Animated.View>

      <View className="flex-1 gap-1">
        <ThemedText
          variant="micro"
          tone="muted"
          className="uppercase tracking-[1.2px]"
        >
          {subject}
        </ThemedText>

        <ThemedText
          variant="bodyLarge"
          tone={topic ? "fg" : "muted"}
          numberOfLines={2}
        >
          {topic || placeholder}
        </ThemedText>

        <View className="mt-0.5 flex-row items-center gap-1.5">
          {difficultyOption?.icon ? (
            <MaterialCommunityIcons
              name={difficultyOption.icon}
              size={14}
              color={difficultyOption.color ?? theme.muted}
            />
          ) : null}

          <ThemedText variant="caption" tone="muted">
            {difficultyOption?.label} · {questionCount} questions
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.card,
    borderWidth: 2,
    // Clips the wash layer to the rounded corners.
    overflow: "hidden",
  },
  wash: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  tile: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.control,
  },
});
