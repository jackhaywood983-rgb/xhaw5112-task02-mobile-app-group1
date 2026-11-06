import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { TimeSlot } from '../data/types';
import { colors, fonts, radius, spacing } from '../theme/tokens';

interface TimeSlotPickerProps {
  slots: readonly TimeSlot[];
  selectedTime: string | null;
  onSelect: (slot: TimeSlot) => void;
}

const STATUS_LABEL: Record<TimeSlot['status'], string> = {
  available: 'available',
  few: 'few left',
  full: 'full',
};

export function TimeSlotPicker({ slots, selectedTime, onSelect }: TimeSlotPickerProps) {
  return (
    <View style={styles.grid} accessibilityRole="radiogroup" accessibilityLabel="Available time slots">
      {slots.map((slot) => {
        const selected = slot.time === selectedTime;
        const disabled = slot.status === 'full';
        return (
          <Pressable
            key={slot.time}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            accessibilityLabel={`${slot.time}, ${STATUS_LABEL[slot.status]}`}
            disabled={disabled}
            onPress={() => onSelect(slot)}
            style={({ pressed }) => [
              styles.slot,
              selected && styles.slotSelected,
              disabled && styles.slotDisabled,
              pressed && !disabled && styles.pressed,
            ]}
          >
            <Text style={[styles.time, selected && styles.timeSelected]}>{slot.time}</Text>
            <Text style={[styles.status, slot.status === 'few' && styles.few, selected && styles.statusSelected]}>
              {slot.status === 'full' ? 'FULL' : slot.status === 'few' ? 'FEW LEFT' : 'OPEN'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  slot: {
    width: '30.5%',
    minHeight: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(8,12,24,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 8,
  },
  slotSelected: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  slotDisabled: {
    opacity: 0.34,
  },
  pressed: {
    opacity: 0.75,
  },
  time: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    lineHeight: 20,
    color: colors.text,
  },
  timeSelected: {
    color: '#041014',
  },
  status: {
    fontFamily: fonts.bodySemi,
    fontSize: 7.5,
    letterSpacing: 0.9,
    color: colors.textDim,
  },
  few: {
    color: colors.warning,
  },
  statusSelected: {
    color: 'rgba(4,16,20,0.65)',
  },
});
