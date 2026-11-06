import { StyleSheet, Text, View } from 'react-native';

import { formatZAR } from '../lib/format';
import { colors, fonts, radius, spacing } from '../theme/tokens';

interface PricePillProps {
  price: number;
  suffix?: string;
  tone?: 'solid' | 'outline';
}

export function PricePill({ price, suffix, tone = 'solid' }: PricePillProps) {
  return (
    <View style={[styles.pill, tone === 'outline' && styles.outline]}>
      <Text style={styles.price}>{formatZAR(price)}</Text>
      {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'flex-start',
    gap: 3,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(4,9,18,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.35)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  outline: {
    backgroundColor: 'transparent',
  },
  price: {
    fontFamily: fonts.displayBold,
    fontSize: 17,
    lineHeight: 19,
    color: colors.cyan,
  },
  suffix: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    color: colors.textMuted,
  },
});
