import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Offering } from '../data/types';
import { formatZAR } from '../lib/format';
import { colors, fonts, glassCard, radius, shadow, spacing, type } from '../theme/tokens';
import { Badge } from './Badge';

interface OfferingCardProps {
  offering: Offering;
  onPress: () => void;
}

export function OfferingCard({ offering, onPress }: OfferingCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${offering.name}, ${formatZAR(offering.price)}, ${offering.priceNote}`}
      accessibilityHint="Opens the full details"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={offering.image}
          style={styles.image}
          contentFit="cover"
          transition={220}
          accessible
          accessibilityLabel={offering.imageAlt}
        />
        <LinearGradient
          colors={['rgba(5,7,14,0.05)', 'rgba(8,12,24,0.94)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.topRow}>
          <Badge
            label={offering.badge ?? (offering.category === 'package' ? 'Package' : 'Experience')}
            tone={offering.badge ? 'magenta' : 'cyan'}
          />
          <View style={styles.pricePill}>
            <Text style={styles.price}>{formatZAR(offering.price)}</Text>
          </View>
        </View>
        <View style={styles.imageCaption}>
          <Text style={styles.eyebrow}>{offering.eyebrow}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {offering.name}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.tagline} numberOfLines={2}>
          {offering.tagline}
        </Text>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={13} color={colors.textDim} />
          <Text style={styles.meta}>{offering.duration}</Text>
          <View style={styles.metaDot} />
          <Ionicons name="people-outline" size={13} color={colors.textDim} />
          <Text style={styles.meta}>{offering.capacity}</Text>
        </View>
        <View style={styles.ctaRow}>
          <Text style={styles.cta}>{offering.ctaLabel}</Text>
          <Ionicons name="arrow-forward" size={15} color={colors.cyan} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glassCard,
    ...shadow.card,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  pressed: {
    borderColor: colors.borderStrong,
    transform: [{ scale: 0.995 }],
  },
  imageWrap: {
    height: 184,
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceAlt,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pricePill: {
    borderRadius: radius.pill,
    backgroundColor: 'rgba(4,9,18,0.86)',
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.4)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: 17,
    color: colors.cyan,
  },
  imageCaption: {
    gap: 2,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyanSoft,
    fontSize: 9,
    letterSpacing: 1.5,
  },
  name: {
    ...type.h2,
    fontSize: 25,
    lineHeight: 26,
  },
  body: {
    padding: spacing.md + 2,
    gap: spacing.xs,
  },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  meta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: colors.textDim,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textDim,
    marginHorizontal: 3,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  cta: {
    fontFamily: fonts.bodySemi,
    fontSize: 11.5,
    letterSpacing: 0.5,
    color: colors.cyan,
  },
});
