import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radius, spacing } from '../theme/tokens';

type Tone = 'success' | 'error' | 'info';

interface InlineNoticeProps {
  tone?: Tone;
  title: string;
  message?: string;
}

const TONES: Record<Tone, { icon: 'checkmark-circle' | 'alert-circle' | 'information-circle'; color: string; bg: string; border: string }> = {
  success: {
    icon: 'checkmark-circle',
    color: colors.success,
    bg: 'rgba(92,230,164,0.08)',
    border: 'rgba(92,230,164,0.32)',
  },
  error: {
    icon: 'alert-circle',
    color: colors.danger,
    bg: 'rgba(255,130,150,0.08)',
    border: 'rgba(255,130,150,0.38)',
  },
  info: {
    icon: 'information-circle',
    color: colors.cyan,
    bg: 'rgba(59,232,255,0.07)',
    border: 'rgba(59,232,255,0.28)',
  },
};

export function InlineNotice({ tone = 'info', title, message }: InlineNoticeProps) {
  const palette = TONES[tone];
  return (
    <View
      accessibilityRole={tone === 'error' ? 'alert' : undefined}
      accessibilityLiveRegion="polite"
      style={[styles.notice, { backgroundColor: palette.bg, borderColor: palette.border }]}
    >
      <Ionicons name={palette.icon} size={19} color={palette.color} style={styles.icon} />
      <View style={styles.copy}>
        <Text style={[styles.title, { color: palette.color }]}>{title}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.sm + 2,
    marginVertical: spacing.sm,
  },
  icon: {
    marginTop: 1,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: fonts.bodySemi,
    fontSize: 12.5,
    lineHeight: 17,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textMuted,
  },
});
