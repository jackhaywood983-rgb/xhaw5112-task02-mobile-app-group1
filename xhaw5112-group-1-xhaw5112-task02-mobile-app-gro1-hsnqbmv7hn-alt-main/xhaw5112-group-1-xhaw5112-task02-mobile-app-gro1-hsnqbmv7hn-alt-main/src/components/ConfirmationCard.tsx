import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, glassCard, spacing, type } from '../theme/tokens';
import { Badge } from './Badge';
import { Button } from './Button';

interface ConfirmationRow {
  label: string;
  value: string;
}

interface ConfirmationCardProps {
  reference: string;
  title?: string;
  message?: string;
  rows?: ConfirmationRow[];
  total?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function ConfirmationCard({
  reference,
  title = 'Request received',
  message = 'The arena team has your details. We will confirm availability by email within one business day.',
  rows = [],
  total,
  onReset,
  resetLabel = 'Start another',
}: ConfirmationCardProps) {
  return (
    <View style={styles.card} accessibilityLiveRegion="polite">
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={22} color={colors.black} />
        </View>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>

      <View style={styles.referenceRow}>
        <Text style={styles.referenceLabel}>Reference</Text>
        <Badge label={reference} tone="success" />
      </View>

      {rows.length > 0 ? (
        <View style={styles.rows}>
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {total ? (
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Quoted total</Text>
          <Text style={styles.totalValue}>{total}</Text>
        </View>
      ) : null}

      {onReset ? (
        <Button
          label={resetLabel}
          variant="secondary"
          size="sm"
          fullWidth
          onPress={onReset}
          style={styles.reset}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glassCard,
    padding: spacing.md + 2,
    borderColor: 'rgba(92,230,164,0.3)',
    backgroundColor: 'rgba(10,26,24,0.55)',
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  title: {
    ...type.h3,
    fontSize: 20,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.textMuted,
  },
  referenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(151,167,255,0.1)',
  },
  referenceLabel: {
    ...type.label,
    color: colors.textDim,
  },
  rows: {
    marginTop: spacing.xs,
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  rowLabel: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: colors.textDim,
  },
  rowValue: {
    flexShrink: 1,
    textAlign: 'right',
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(151,167,255,0.1)',
  },
  totalLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.text,
  },
  totalValue: {
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 32,
    color: colors.success,
  },
  reset: {
    marginTop: spacing.md,
  },
});
