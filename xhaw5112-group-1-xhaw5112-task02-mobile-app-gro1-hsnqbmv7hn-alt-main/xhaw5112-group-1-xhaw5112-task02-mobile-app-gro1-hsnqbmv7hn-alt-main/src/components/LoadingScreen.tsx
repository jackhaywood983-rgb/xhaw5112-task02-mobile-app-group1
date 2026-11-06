import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme/tokens';
import { GlowBackdrop } from './GlowBackdrop';
import { LogoMark } from './LogoMark';

export function LoadingScreen() {
  return (
    <View style={styles.root}>
      <GlowBackdrop />
      <View style={styles.center}>
        <LogoMark size={68} />
        <Text style={styles.wordmark}>NXT LVL</Text>
        <Text style={styles.tagline}>GAMING &amp; ESPORTS ARENA</Text>
        <ActivityIndicator color={colors.cyan} style={styles.spinner} />
        <Text style={styles.loading}>Entering the arena…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  wordmark: {
    marginTop: spacing.md,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: 3,
    color: colors.text,
  },
  tagline: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    letterSpacing: 2.6,
    color: colors.textDim,
    marginTop: 4,
  },
  spinner: {
    marginTop: spacing.xl,
  },
  loading: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 12,
    letterSpacing: 0.4,
    color: colors.textMuted,
  },
});
