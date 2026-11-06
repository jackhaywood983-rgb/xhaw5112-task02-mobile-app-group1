import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '../theme/tokens';

type BadgeTone = 'cyan' | 'purple' | 'neutral' | 'success' | 'magenta' | 'warning';

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const TONES: Record<BadgeTone, { bg: string; border: string; text: string }> = {
  cyan: { bg: 'rgba(59,232,255,0.12)', border: 'rgba(59,232,255,0.34)', text: colors.cyan },
  purple: { bg: 'rgba(178,124,255,0.14)', border: 'rgba(178,124,255,0.38)', text: colors.purpleSoft },
  neutral: { bg: 'rgba(163,172,201,0.10)', border: 'rgba(163,172,201,0.22)', text: colors.textMuted },
  success: { bg: 'rgba(92,230,164,0.12)', border: 'rgba(92,230,164,0.34)', text: colors.success },
  magenta: { bg: 'rgba(255,92,200,0.12)', border: 'rgba(255,92,200,0.34)', text: colors.magenta },
  warning: { bg: 'rgba(255,201,107,0.12)', border: 'rgba(255,201,107,0.34)', text: colors.warning },
};

export function Badge({ label, tone = 'cyan' }: BadgeProps) {
  const palette = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <Text style={[styles.text, { color: palette.text }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 3,
  },
  text: {
    fontFamily: fonts.bodySemi,
    fontSize: 9.5,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
});
