import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatZAR } from '../lib/format';
import { colors, fonts, radius, shadow, spacing, type } from '../theme/tokens';
import { Badge } from './Badge';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface DetailHeroProps {
  image: number;
  imageAlt: string;
  eyebrow: string;
  title: string;
  price: number;
  priceNote: string;
  badge?: string;
  onBack: () => void;
  height?: number;
  meta?: { icon: IconName; label: string }[];
}

export function DetailHero({
  image,
  imageAlt,
  eyebrow,
  title,
  price,
  priceNote,
  badge,
  onBack,
  height = 340,
  meta = [],
}: DetailHeroProps) {
  return (
    <View style={[styles.wrapper, { height }]}>
      <Image
        source={image}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={280}
        accessible
        accessibilityLabel={imageAlt}
      />
      <LinearGradient
        colors={['rgba(5,7,14,0.7)', 'rgba(5,7,14,0.08)', 'rgba(5,7,14,0.96)']}
        locations={[0, 0.38, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={6}
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={21} color={colors.text} />
        </Pressable>
        {badge ? <Badge label={badge} tone="magenta" /> : null}
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.25}>
          {title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatZAR(price)}</Text>
          <Text style={styles.priceNote}>{priceNote}</Text>
        </View>
        {meta.length > 0 ? (
          <View style={styles.metaRow}>
            {meta.map((item) => (
              <View key={item.label} style={styles.metaChip}>
                <Ionicons name={item.icon} size={12} color={colors.cyan} />
                <Text style={styles.metaText}>{item.label}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(5,7,14,0.55)',
  },
  pressed: {
    opacity: 0.65,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    gap: 3,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyan,
    fontSize: 9,
  },
  title: {
    ...type.h1,
    fontSize: 36,
    lineHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 7,
    marginTop: 2,
  },
  price: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 30,
    color: colors.cyan,
  },
  priceNote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.xs,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.22)',
    backgroundColor: 'rgba(5,7,14,0.55)',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  metaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    color: colors.textMuted,
  },
});
