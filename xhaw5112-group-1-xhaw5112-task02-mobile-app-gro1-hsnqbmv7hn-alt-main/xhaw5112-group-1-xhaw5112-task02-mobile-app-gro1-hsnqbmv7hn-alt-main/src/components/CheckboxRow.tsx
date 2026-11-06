import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatZAR } from '../lib/format';
import { colors, fonts, radius, spacing } from '../theme/tokens';

interface CheckboxRowProps {
  name: string;
  categoryLabel: string;
  price: number;
  selected: boolean;
  onToggle: () => void;
}

export function CheckboxRow({ name, categoryLabel, price, selected, onToggle }: CheckboxRowProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${name}, ${categoryLabel}, ${formatZAR(price)}`}
      onPress={() => {
        void Haptics.selectionAsync().catch(() => undefined);
        onToggle();
      }}
      style={({ pressed }) => [
        styles.row,
        selected && styles.rowSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.box, selected && styles.boxSelected]}>
        {selected ? <Ionicons name="checkmark" size={14} color={colors.black} /> : null}
      </View>
      <View style={styles.copy}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.category}>{categoryLabel}</Text>
      </View>
      <Text style={styles.price}>{formatZAR(price)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(8,12,24,0.55)',
  },
  rowSelected: {
    borderColor: 'rgba(59,232,255,0.55)',
    backgroundColor: 'rgba(59,232,255,0.06)',
  },
  pressed: {
    opacity: 0.8,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: 'rgba(163,172,201,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxSelected: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fonts.bodySemi,
    fontSize: 13.5,
    color: colors.text,
  },
  category: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: colors.cyan,
  },
});
