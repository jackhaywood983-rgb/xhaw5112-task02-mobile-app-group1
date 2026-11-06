import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme/tokens';

interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 38 }: LogoMarkProps) {
  const radius = size * 0.3;
  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={{ width: size, height: size }}
    >
      <LinearGradient
        colors={[colors.purple, colors.cyan]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, borderRadius: radius, padding: 1.5 }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: radius - 1.5,
            backgroundColor: colors.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: fonts.display,
              fontSize: size * 0.56,
              lineHeight: size * 0.66,
              color: colors.text,
              includeFontPadding: false,
            }}
          >
            N
          </Text>
        </View>
      </LinearGradient>
      <View
        style={[
          styles.spark,
          {
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: size * 0.1,
            right: -1,
            bottom: -1,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spark: {
    position: 'absolute',
    backgroundColor: colors.cyan,
    borderWidth: 2,
    borderColor: colors.bg,
  },
});
