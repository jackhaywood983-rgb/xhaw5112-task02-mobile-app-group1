import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, fonts } from '../theme/tokens';

interface StatProps {
  value: string;
  label: string;
  style?: StyleProp<ViewStyle>;
}

export function Stat({ value, label, style }: StatProps) {
  return (
    <View style={[styles.stat, style]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    flex: 1,
    minWidth: 70,
  },
  value: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    lineHeight: 26,
    color: colors.text,
    letterSpacing: 0.3,
  },
  label: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    lineHeight: 14,
    color: colors.textDim,
  },
});
