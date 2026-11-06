import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { priceDisclaimer } from '../data/content';
import { formatPercent, formatZAR } from '../lib/format';
import { getNextTier, type Quote } from '../lib/feeCalculator';
import { colors, fonts, glassCard, spacing, type } from '../theme/tokens';
import { Badge } from './Badge';

interface QuoteSummaryProps {
  quote: Quote;
}

export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const nextTier = getNextTier(quote.itemCount);
  const hint = nextTier
    ? `Add ${nextTier.count - quote.itemCount} more booking${nextTier.count - quote.itemCount === 1 ? '' : 's'} to unlock ${formatPercent(nextTier.rate)} off.`
    : `Full squad discount unlocked — ${formatPercent(quote.discountRate)} off.`;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Live quotation</Text>
          <Text style={type.h3}>Your total</Text>
        </View>
        <Badge label={`${quote.itemCount} selected`} tone={quote.itemCount === 0 ? 'neutral' : 'cyan'} />
      </View>

      {quote.lines.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={20} color={colors.textDim} />
          <Text style={styles.emptyText}>
            Nothing selected yet. Add a package or experience and the total updates instantly.
          </Text>
        </View>
      ) : (
        <View style={styles.lines}>
          {quote.lines.map((line) => (
            <View key={line.id} style={styles.line}>
              <View style={styles.lineDot} />
              <View style={styles.lineCopy}>
                <Text style={styles.lineName} numberOfLines={1}>
                  {line.name}
                </Text>
                <Text style={styles.lineCategory}>
                  {line.category === 'package' ? 'Package' : 'Experience'}
                </Text>
              </View>
              <Text style={styles.linePrice}>{formatZAR(line.price)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Subtotal</Text>
        <Text style={styles.totalValue}>{formatZAR(quote.subtotal)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={[styles.totalLabel, quote.discountAmount > 0 && styles.discountLabel]}>
          Discount{quote.discountAmount > 0 ? ` · ${quote.discountLabel}` : ''}
        </Text>
        <Text style={[styles.totalValue, quote.discountAmount > 0 && styles.discountValue]}>
          {quote.discountAmount > 0
            ? `− ${formatZAR(quote.discountAmount)}`
            : 'R 0'}
        </Text>
      </View>

      <View style={styles.grandRow}>
        <Text style={styles.grandLabel}>Total</Text>
        <Text style={styles.grandValue}>{formatZAR(quote.total)}</Text>
      </View>

      <View style={styles.hintRow}>
        <Ionicons name="pricetag-outline" size={13} color={quote.discountRate > 0 ? colors.success : colors.textDim} />
        <Text style={[styles.hint, quote.discountRate > 0 && styles.hintActive]}>{hint}</Text>
      </View>

      <Text style={styles.disclaimer}>{priceDisclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...glassCard,
    padding: spacing.md + 2,
    borderColor: 'rgba(59,232,255,0.2)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyan,
    fontSize: 9,
    marginBottom: 2,
  },
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  emptyText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textDim,
  },
  lines: {
    marginTop: spacing.sm,
    gap: 7,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lineDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.purple,
  },
  lineCopy: {
    flex: 1,
  },
  lineName: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.text,
  },
  lineCategory: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.textDim,
  },
  linePrice: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  totalLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  discountLabel: {
    color: colors.success,
  },
  totalValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textMuted,
  },
  discountValue: {
    color: colors.success,
  },
  grandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  grandLabel: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.text,
  },
  grandValue: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 36,
    color: colors.cyan,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(151,167,255,0.08)',
    paddingTop: spacing.sm,
  },
  hint: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textDim,
  },
  hintActive: {
    color: colors.success,
  },
  disclaimer: {
    marginTop: spacing.xs + 2,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.textDim,
  },
});
