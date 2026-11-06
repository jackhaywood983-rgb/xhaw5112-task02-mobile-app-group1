import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

export function GlowBackdrop() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['rgba(59,232,255,0.12)', 'rgba(59,232,255,0)']}
        style={[styles.orb, styles.cyanOrb]}
      />
      <LinearGradient
        colors={['rgba(178,124,255,0.14)', 'rgba(178,124,255,0)']}
        style={[styles.orb, styles.purpleOrb]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    overflow: 'hidden',
  },
  cyanOrb: {
    top: -190,
    left: -140,
  },
  purpleOrb: {
    bottom: -160,
    right: -170,
  },
});
