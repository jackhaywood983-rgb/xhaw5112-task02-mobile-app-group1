import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';

import type { UpcomingDate } from '../lib/dates';
import { colors, fonts, radius, spacing } from '../theme/tokens';

interface DateSelectorProps {
  dates: readonly UpcomingDate[];
  selectedId: string | null;
  onSelect: (date: UpcomingDate) => void;
}

export function DateSelector({ dates, selectedId, onSelect }: DateSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      accessibilityRole="radiogroup"
      accessibilityLabel="Preferred date"
    >
      {dates.map((date) => {
        const selected = date.id === selectedId;
        return (
          <Pressable
            key={date.id}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={date.label}
            onPress={() => onSelect(date)}
            style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.pressed]}
          >
            <Text style={[styles.weekday, selected && styles.weekdaySelected]}>{date.weekday}</Text>
            <Text style={[styles.day, selected && styles.daySelected]}>{date.day}</Text>
            <Text style={[styles.month, selected && styles.monthSelected]}>{date.month}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xs + 2,
    paddingRight: spacing.sm,
    paddingVertical: 2,
  },
  chip: {
    width: 62,
    height: 74,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(8,12,24,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  chipSelected: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  pressed: {
    opacity: 0.75,
  },
  weekday: {
    fontFamily: fonts.bodySemi,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  weekdaySelected: {
    color: 'rgba(4,16,20,0.65)',
  },
  day: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 28,
    color: colors.text,
  },
  daySelected: {
    color: '#041014',
  },
  month: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    color: colors.textMuted,
  },
  monthSelected: {
    color: 'rgba(4,16,20,0.65)',
  },
});
