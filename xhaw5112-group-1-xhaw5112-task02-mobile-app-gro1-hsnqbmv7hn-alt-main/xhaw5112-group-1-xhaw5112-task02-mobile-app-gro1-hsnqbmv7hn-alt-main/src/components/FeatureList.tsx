import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme/tokens';

interface FeatureListProps {
  items: readonly string[];
  compact?: boolean;
}

export function FeatureList({ items, compact = false }: FeatureListProps) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <View style={[styles.check, compact && styles.checkCompact]}>
            <Ionicons name="checkmark" size={compact ? 10 : 12} color={colors.black} />
          </View>
          <Text style={[styles.text, compact && styles.textCompact]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkCompact: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
  },
  textCompact: {
    fontSize: 12.5,
    lineHeight: 18,
  },
});
