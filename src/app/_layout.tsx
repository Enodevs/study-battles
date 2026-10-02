import '@/global.css';

import { Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { createNavigationTheme, ThemeVars } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-theme';
import { ensureAuthenticated } from '@/lib/auth';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    ensureAuthenticated()
      .then((user) => {
        console.log('✅ Supabase user:', user.id);
      })
      .catch((error) => {
        console.error('❌ Supabase auth failed:', error);
      });
  }, []);

  return (
    // `ThemeVars` publishes the palette as custom properties for the whole tree,
    // which is what `bg-surface`, `text-fg` and friends resolve against.
    //
    // Web is left out on purpose: there the same properties already come from a
    // `prefers-color-scheme` block in the stylesheet, so it renders correctly on
    // the very first paint. Setting them inline would outrank that block and
    // flash light before hydration resolves the scheme.
    <View
      style={Platform.OS === 'web' ? undefined : ThemeVars[scheme]}
      className="flex-1 bg-bg">
      <ThemeProvider value={createNavigationTheme(scheme)}>
        <StatusBar style="light" />
        <AnimatedSplashOverlay />

        {/* Every screen draws its own header, so the stack never renders one. */}
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </View>
  );
}
