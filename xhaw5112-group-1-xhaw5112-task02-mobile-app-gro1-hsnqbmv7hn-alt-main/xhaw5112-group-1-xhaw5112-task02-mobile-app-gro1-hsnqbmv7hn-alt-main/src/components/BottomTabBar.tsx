import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, layout, spacing } from '../theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TABS: Record<string, { label: string; active: IconName; inactive: IconName }> = {
  Home: { label: 'Home', active: 'home', inactive: 'home-outline' },
  Explore: { label: 'Explore', active: 'grid', inactive: 'grid-outline' },
  Calculate: { label: 'Book', active: 'receipt', inactive: 'receipt-outline' },
  Arena: { label: 'Arena', active: 'person', inactive: 'person-outline' },
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView
      intensity={55}
      tint="dark"
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.xs) }]}
    >
      <View style={styles.inner}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const meta = TABS[route.name] ?? {
            label: descriptors[route.key]?.options.title ?? route.name,
            active: 'ellipse' as IconName,
            inactive: 'ellipse-outline' as IconName,
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
            void Haptics.selectionAsync().catch(() => undefined);
          };

          return (
            <Pressable
              key={route.key}
              testID={`tab-${route.name}`}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={`${meta.label} tab`}
              onPress={onPress}
              style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            >
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Ionicons
                  name={focused ? meta.active : meta.inactive}
                  size={20}
                  color={focused ? colors.cyan : colors.textDim}
                />
              </View>
              <Text style={[styles.label, focused && styles.labelActive]}>{meta.label.toUpperCase()}</Text>
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: 'rgba(5,7,14,0.86)',
    overflow: 'hidden',
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 2,
  },
  pressed: {
    opacity: 0.65,
  },
  iconWrap: {
    width: 38,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(59,232,255,0.10)',
    borderColor: 'rgba(59,232,255,0.32)',
  },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1,
    color: colors.textDim,
  },
  labelActive: {
    color: colors.cyan,
  },
});
