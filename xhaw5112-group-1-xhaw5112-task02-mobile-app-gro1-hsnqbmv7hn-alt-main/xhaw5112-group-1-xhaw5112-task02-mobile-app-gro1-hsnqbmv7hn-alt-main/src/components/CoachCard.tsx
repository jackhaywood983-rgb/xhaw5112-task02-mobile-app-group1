import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Coach } from '../data/types';
import { colors, fonts, glassCard, radius, spacing } from '../theme/tokens';

interface CoachCardProps {
  coach: Coach;
  selected: boolean;
  onSelect: () => void;
}

export function CoachCard({ coach, selected, onSelect }: CoachCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${coach.name}, ${coach.role}. ${coach.rank}.`}
      onPress={onSelect}
      style={({ pressed }) => [styles.card, selected && styles.cardSelected, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={selected ? [colors.cyan, colors.teal] : ['rgba(178,124,255,0.9)', 'rgba(59,232,255,0.85)']}
        style={styles.avatar}
      >
        <Text style={[styles.initials, selected && styles.initialsSelected]}>{coach.initials}</Text>
      </LinearGradient>
      <View style={styles.copy}>
        <Text style={styles.name}>{coach.name}</Text>
        <Text style={styles.role}>{coach.role}</Text>
        <Text style={styles.rank}>{coach.rank}</Text>
        <Text style={styles.bio} numberOfLines={3}>
          {coach.bio}
        </Text>
        <View style={styles.chips}>
          {coach.specialties.map((specialty) => (
            <View key={specialty} style={styles.chip}>
              <Text style={styles.chipText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glassCard,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.sm + 2,
    marginBottom: spacing.xs + 2,
  },
  cardSelected: {
    borderColor: 'rgba(59,232,255,0.55)',
    backgroundColor: 'rgba(59,232,255,0.05)',
  },
  pressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    color: '#071016',
  },
  initialsSelected: {
    color: '#041014',
  },
  copy: {
    flex: 1,
    gap: 1,
  },
  name: {
    fontFamily: fonts.bodySemi,
    fontSize: 13.5,
    color: colors.text,
  },
  role: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: colors.cyan,
  },
  rank: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textDim,
  },
  bio: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
    marginTop: 3,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 5,
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 8.5,
    letterSpacing: 0.4,
    color: colors.textMuted,
  },
});
