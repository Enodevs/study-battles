import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { TabBarButton, TabBarContainer } from '@/components/tab-bar';

export default function AppTabs() {
  return (
    <Tabs style={styles.tabs}>
      <TabSlot style={styles.slot} />

      <TabList asChild>
        <TabBarContainer>
          <TabTrigger name="home" href="/" asChild>
            <TabBarButton label="Home" icon="home-outline" activeIcon="home" />
          </TabTrigger>

          <TabTrigger name="battles" href="/battles" asChild>
            <TabBarButton
              label="Battles"
              icon="shield-sword-outline"
              activeIcon="shield-sword"
            />
          </TabTrigger>

          <TabTrigger name="practice" href="/practice" asChild>
            <TabBarButton
              label="Practice"
              icon="book-open-outline"
              activeIcon="book-open-page-variant"
            />
          </TabTrigger>

          <TabTrigger name="profile" href="/profile" asChild>
            <TabBarButton
              label="Profile"
              icon="account-circle-outline"
              activeIcon="account-circle"
            />
          </TabTrigger>
        </TabBarContainer>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  slot: {
    flex: 1,
  },
});
