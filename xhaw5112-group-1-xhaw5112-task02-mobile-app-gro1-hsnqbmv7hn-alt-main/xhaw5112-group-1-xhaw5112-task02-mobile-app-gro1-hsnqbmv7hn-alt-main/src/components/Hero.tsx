import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts, gradients, radius, spacing, type } from '../theme/tokens';
import { Button } from './Button';

interface HeroProps {
  image: number;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  height?: number;
  badge?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Hero({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  height = 430,
  badge,
  style,
}: HeroProps) {
  return (
    <View style={[styles.wrapper, { height }, style]}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={280}
        accessible
        accessibilityLabel={imageAlt}
      />
      <LinearGradient
        colors={gradients.heroFade}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['rgba(5,7,14,0.72)', 'rgba(5,7,14,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.topShade}
      />
      <View style={styles.content}>
        <View style={styles.eyebrowRow}>
          <View style={styles.dot} />
          <Text style={styles.eyebrow}>{eyebrow}</Text>
        </View>
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.25}>
          {title}
        </Text>
        <Text style={styles.description} maxFontSizeMultiplier={1.35}>
          {description}
        </Text>
        {badge ? <View style={styles.badge}>{badge}</View> : null}
        <View style={styles.actions}>
          <Button label={primaryLabel} onPress={onPrimary} />
          {secondaryLabel && onSecondary ? (
            <Button label={secondaryLabel} onPress={onSecondary} variant="dark" icon="grid-outline" />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
  },
  topShade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 110,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    gap: spacing.xs,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyan,
    fontSize: 9.5,
    letterSpacing: 1.8,
  },
  title: {
    ...type.display,
    fontSize: 44,
    lineHeight: 41,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: 'rgba(236,241,255,0.82)',
    maxWidth: 380,
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: spacing.sm,
  },
});
