import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import type { ArenaEvent } from '../data/types';
import { colors, fonts, glassCard, radius, shadow, spacing } from '../theme/tokens';
import { Badge } from './Badge';

interface EventCardProps {
  event: ArenaEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`${event.title}. ${event.when}. ${event.format}. Entry ${event.entry}.`}
    >
      <View style={styles.imageWrap}>
        <Image
          source={event.image}
          style={styles.image}
          contentFit="cover"
          transition={200}
          accessible
          accessibilityLabel={event.imageAlt}
        />
        <LinearGradient colors={['rgba(5,7,14,0.05)', 'rgba(8,12,24,0.9)']} style={StyleSheet.absoluteFill} />
        <View style={styles.tag}>
          <Badge label={event.tag} tone={event.tag === 'Tournament' ? 'magenta' : 'purple'} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.when}>{event.when}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.format} numberOfLines={2}>
          {event.format}
        </Text>
        <Text style={styles.entry}>{event.entry}</Text>
        {event.prize ? <Text style={styles.prize}>{event.prize}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glassCard,
    ...shadow.card,
    width: 252,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 126,
    justifyContent: 'flex-end',
    padding: spacing.sm,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceAlt,
  },
  tag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  body: {
    padding: spacing.sm,
    gap: 3,
  },
  when: {
    fontFamily: fonts.bodySemi,
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.cyan,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 23,
    color: colors.text,
  },
  format: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
  },
  entry: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.text,
    marginTop: 2,
  },
  prize: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.warning,
  },
});
