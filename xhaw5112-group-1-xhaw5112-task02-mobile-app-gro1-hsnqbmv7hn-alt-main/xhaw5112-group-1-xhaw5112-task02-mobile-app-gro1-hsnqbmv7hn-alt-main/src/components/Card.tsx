import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, glassCard, radius, shadow, spacing } from '../theme/tokens';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

export function Card({
  children,
  onPress,
  padded = true,
  style,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: CardProps) {
  const baseStyle = [
    glassCard,
    shadow.card,
    padded && styles.padded,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [...baseStyle, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={baseStyle} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  padded: {
    padding: spacing.lg,
  },
  pressed: {
    borderColor: colors.borderStrong,
    transform: [{ scale: 0.995 }],
  },
});

export const cardRadius = radius.lg;
