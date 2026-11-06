import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '../theme/tokens';
import { GlowBackdrop } from './GlowBackdrop';

interface ScreenProps {
  children: ReactNode;
  header?: ReactNode;
  scroll?: boolean;
  bottomInset?: 'tabs' | 'safe' | 'none';
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export function Screen({
  children,
  header,
  scroll = true,
  bottomInset = 'tabs',
  contentStyle,
  testID,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomPadding =
    bottomInset === 'tabs'
      ? layout.tabBarHeight + insets.bottom + spacing.xxl
      : bottomInset === 'safe'
        ? insets.bottom + spacing.xxl
        : spacing.xl;

  return (
    <View style={styles.root} testID={testID}>
      <GlowBackdrop />
      <SafeAreaView edges={['top']} style={styles.safe}>
        {header}
        <KeyboardAvoidingView
          style={styles.safe}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {scroll ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPadding }]}
            >
              <View style={[styles.column, contentStyle]}>{children}</View>
            </ScrollView>
          ) : (
            <View style={[styles.column, styles.fill, contentStyle]}>{children}</View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.xs,
  },
  column: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
  },
  fill: {
    flex: 1,
    paddingHorizontal: 0,
    maxWidth: '100%',
  },
});
