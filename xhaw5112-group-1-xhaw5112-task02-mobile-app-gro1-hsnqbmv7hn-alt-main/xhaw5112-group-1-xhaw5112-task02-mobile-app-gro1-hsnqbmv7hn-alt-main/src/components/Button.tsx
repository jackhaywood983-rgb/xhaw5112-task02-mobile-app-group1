import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, gradients, radius, shadow } from '../theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  fullWidth?: boolean;
  size?: 'md' | 'sm';
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  fullWidth = false,
  size = 'md',
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
  style,
}: ButtonProps) {
  const textColor =
    variant === 'primary'
      ? '#031217'
      : variant === 'secondary'
        ? colors.cyan
        : variant === 'dark'
          ? colors.text
          : colors.textMuted;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' && styles.small,
        fullWidth && styles.fullWidth,
        variant === 'primary' && shadow.glow,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        variant === 'dark' && styles.dark,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <View style={styles.content}>
        {icon ? <Ionicons name={icon} size={size === 'sm' ? 15 : 17} color={textColor} /> : null}
        <Text
          numberOfLines={1}
          style={[styles.label, size === 'sm' && styles.smallLabel, { color: textColor }]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  small: {
    minHeight: 44,
    paddingHorizontal: 18,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  secondary: {
    borderColor: 'rgba(59,232,255,0.45)',
    backgroundColor: 'rgba(59,232,255,0.07)',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  dark: {
    backgroundColor: 'rgba(8,11,22,0.72)',
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 13.5,
    letterSpacing: 0.4,
  },
  smallLabel: {
    fontSize: 12,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.42,
  },
});
