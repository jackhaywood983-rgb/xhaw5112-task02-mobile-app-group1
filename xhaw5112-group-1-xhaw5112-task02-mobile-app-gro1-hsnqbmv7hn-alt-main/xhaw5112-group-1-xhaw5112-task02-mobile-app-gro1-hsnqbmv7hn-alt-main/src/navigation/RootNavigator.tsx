import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, NavigationContainer, type Theme } from '@react-navigation/native';

import { BottomTabBar } from '../components/BottomTabBar';
import { useReducedMotion } from '../lib/useReducedMotion';
import { AboutScreen } from '../screens/AboutScreen';
import { CalculateFeesScreen } from '../screens/CalculateFeesScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { ExperienceDetailScreen } from '../screens/ExperienceDetailScreen';
import { ExploreScreen } from '../screens/ExploreScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PackageDetailScreen } from '../screens/PackageDetailScreen';
import { colors } from '../theme/tokens';
import type { MainTabParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.cyan,
    background: colors.bg,
    card: colors.bg,
    text: colors.text,
    border: colors.border,
    notification: colors.magenta,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="Calculate" component={CalculateFeesScreen} options={{ title: 'Book' }} />
      <Tab.Screen name="Arena" component={ContactScreen} options={{ title: 'Arena' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const reducedMotion = useReducedMotion();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: reducedMotion ? 'fade' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="Tabs" component={MainTabs} options={{ animation: 'fade' }} />
        <Stack.Screen name="PackageDetail" component={PackageDetailScreen} />
        <Stack.Screen name="ExperienceDetail" component={ExperienceDetailScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
