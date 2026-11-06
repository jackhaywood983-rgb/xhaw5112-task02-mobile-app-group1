import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { arena } from '../data/content';
import { colors, fonts, spacing } from '../theme/tokens';
import { LogoMark } from './LogoMark';

interface AppHeaderProps {
  onPressInfo?: () => void;
}

export function AppHeader({ onPressInfo }: AppHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.brandRow}>
          <LogoMark size={36} />
          <View style={styles.brandText}>
            <Text style={styles.wordmark} numberOfLines={1}>
              {arena.shortName}
            </Text>

            <Text style={styles.descriptor} numberOfLines={1}>
              GAMING &amp; ESPORTS · {arena.city.toUpperCase()}
            </Text>
          </View>
        </View>
        {onPressInfo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="About Next Level Arena"
            accessibilityHint="Opens the arena story and location details"
            hitSlop={6}
            onPress={onPressInfo}
            style={({ pressed }) => [styles.infoButton, pressed && styles.pressed]}
          >
            <Ionicons name="information-circle-outline" size={22} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.hairline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  brandText: {
    flexShrink: 1,
  },
  wordmark: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 1.4,
    color: colors.text,
  },
  descriptor: {
    fontFamily: fonts.bodyMedium,
    fontSize: 8.5,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: colors.textDim,
  },
  infoButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceGlassSoft,
  },
  pressed: {
    opacity: 0.7,
  },
  hairline: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 10,
  },
});
