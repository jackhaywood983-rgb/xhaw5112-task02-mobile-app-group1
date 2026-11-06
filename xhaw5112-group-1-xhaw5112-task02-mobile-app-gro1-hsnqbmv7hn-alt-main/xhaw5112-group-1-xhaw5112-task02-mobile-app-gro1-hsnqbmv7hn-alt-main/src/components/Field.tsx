import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

import { colors, fonts, radius, spacing } from '../theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface FieldProps extends Omit<TextInputProps, 'style' | 'placeholderTextColor'> {
  label: string;
  error?: string | null;
  hint?: string;
  required?: boolean;
  icon?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Field({
  label,
  error,
  hint,
  required = false,
  icon,
  containerStyle,
  onFocus,
  onBlur,
  ...inputProps
}: FieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      <View
        style={[
          styles.shell,
          inputProps.multiline && styles.shellMultiline,
          focused && styles.shellFocused,
          Boolean(error) && styles.shellError,
        ]}
      >
        {icon ? <Ionicons name={icon} size={17} color={focused ? colors.cyan : colors.textDim} /> : null}
        <TextInput
          {...inputProps}
          accessibilityLabel={inputProps.accessibilityLabel ?? label}
          accessibilityHint={error ?? hint ?? inputProps.accessibilityHint}
          placeholderTextColor={colors.textDim}
          selectionColor={colors.cyan}
          style={[styles.input, inputProps.multiline && styles.inputMultiline]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
      </View>
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.xs,
    marginBottom: 7,
  },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  required: {
    color: colors.cyan,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textDim,
  },
  shell: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(8,12,24,0.78)',
  },
  shellFocused: {
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(10,16,30,0.95)',
  },
  shellMultiline: {
    alignItems: 'flex-start',
    paddingTop: 14,
    paddingBottom: 12,
  },
  shellError: {
    borderColor: 'rgba(255,130,150,0.7)',
  },
  input: {
    flex: 1,
    minHeight: 50,
    paddingVertical: 0,
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: colors.text,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  error: {
    marginTop: 6,
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.danger,
  },
});
