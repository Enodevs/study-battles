import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { getGreeting } from "@/utils/greeting";

export type HomeHeaderProps = {
  name: string;
  streakDays: number;
  onPressProfile?: () => void;
};

export function HomeHeader({
  name,
  streakDays,
  onPressProfile,
}: HomeHeaderProps) {
  const theme = useTheme();

  return (
    <View className="flex-row items-start justify-between gap-4 pb-2">
      <View className="flex-1 gap-1.5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2.5 items-center">
            <Pressable
              onPress={onPressProfile}
              accessibilityRole="button"
              accessibilityLabel="Open profile"
              className="h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-border bg-surface active:bg-surface-pressed"
            >
              <Image
                source={require("@/assets/images/sleepy-raccoon.png")}
                className="size-12 rounded-full"
              />
            </Pressable>
            {/*<ThemedText variant="caption" tone="muted">
              {getGreeting()}
            </ThemedText>*/}
            <ThemedText variant="display" className="text-2xl">
              Hi, {name}
            </ThemedText>
          </View>
          <MaterialCommunityIcons name="cog" className="p-3 bg-slate-200 rounded-full" size={22} color={theme.accent} />
        </View>
          <StreakPill days={streakDays} />
      </View>

      {/*<Pressable
        onPress={onPressProfile}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        className="h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-border bg-surface active:bg-surface-pressed"
      >
        <Image
          source={require("@/assets/images/sleepy-raccoon.png")}
          className="size-14 rounded-full"
        />
      </Pressable>*/}
    </View>
  );
}

function StreakPill({ days }: { days: number }) {
  const theme = useTheme();

  return (
    <View className="flex-row gap-2.5 mt-2">
      <View className="flex-row items-center gap-1.5 self-start rounded-full bg-surface px-4">
        <View className="my-2 flex-row items-center pr-1 gap-1.5">
          <Ionicons name="flame" size={22} color={theme.streak} />
          <ThemedText variant="captionBold">{days}</ThemedText>
        </View>
      </View>
      <View className="flex-row items-center gap-1.5 self-start rounded-full bg-surface px-4">
      <View className="pl-1 my-2 flex-row items-center gap-1.5">
        <MaterialCommunityIcons name="diamond-outline" size={22} color={theme.accent} />
        <ThemedText variant="captionBold">500</ThemedText>
        </View>
      </View>
    </View>
  );
}
