import * as Haptics from 'expo-haptics';
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Keyboard, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { CheckboxRow } from '../components/CheckboxRow';
import { ConfirmationCard } from '../components/ConfirmationCard';
import { Field } from '../components/Field';
import { InlineNotice } from '../components/InlineNotice';
import { QuoteSummary } from '../components/QuoteSummary';
import { Screen } from '../components/Screen';
import { offerings } from '../data/content';
import { formatLongDate } from '../lib/dates';
import { calculateQuote, createQuoteReference } from '../lib/feeCalculator';
import { formatZAR } from '../lib/format';
import { hasErrors, validateEmail, validateName, type FieldErrors } from '../lib/validation';
import type { TabScreenProps } from '../navigation/types';
import { colors, fonts, glassCard, spacing, type } from '../theme/tokens';

const TIERS = [
  { count: 2, rate: 0.05, label: 'Duo' },
  { count: 3, rate: 0.1, label: 'Team' },
  { count: 4, rate: 0.15, label: 'Full squad' },
];

interface Confirmation {
  reference: string;
  total: number;
  itemCount: number;
  date: string;
}

export function CalculateFeesScreen({ navigation, route }: TabScreenProps<'Calculate'>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [prefillNotice, setPrefillNotice] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const packages = useMemo(() => offerings.filter((item) => item.category === 'package'), []);
  const experiences = useMemo(() => offerings.filter((item) => item.category === 'experience'), []);
  const selected = useMemo(
    () => offerings.filter((offering) => selectedIds.includes(offering.id)),
    [selectedIds],
  );
  const quote = useMemo(() => calculateQuote(selected), [selected]);

  useEffect(() => {
    const toAdd = route.params?.add;
    if (!toAdd || toAdd.length === 0) return;
    const added = offerings.filter((offering) => toAdd.includes(offering.id));
    setSelectedIds((previous) => Array.from(new Set([...previous, ...toAdd])));
    setConfirmation(null);
    setSelectionError(null);
    if (added.length > 0) {
      setPrefillNotice(`${added.map((item) => item.name).join(', ')} added to your quote.`);
    }
    navigation.setParams({ add: undefined });
  }, [navigation, route.params?.add]);

  const toggle = (id: string) => {
    setSelectedIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    );
    setSelectionError(null);
    setConfirmation(null);
    setPrefillNotice(null);
  };

  const resetQuote = () => {
    setSelectedIds([]);
    setName('');
    setEmail('');
    setErrors({});
    setSelectionError(null);
    setPrefillNotice(null);
    setConfirmation(null);
  };

  const submit = () => {
    Keyboard.dismiss();
    const nextErrors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
    };
    setErrors(nextErrors);

    if (quote.itemCount === 0) {
      setSelectionError('Select at least one package or experience to build a quote.');
      AccessibilityInfo.announceForAccessibility(
        'Select at least one package or experience to build a quote.',
      );
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
      return;
    }

    if (hasErrors(nextErrors)) {
      AccessibilityInfo.announceForAccessibility('Please fix the highlighted contact details.');
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
      return;
    }

    const reference = createQuoteReference();
    setConfirmation({
      reference,
      total: quote.total,
      itemCount: quote.itemCount,
      date: formatLongDate(),
    });
    AccessibilityInfo.announceForAccessibility(`Quote request sent. Reference ${reference}.`);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  };

  return (
    <Screen
      testID="screen-calculate"
      header={<AppHeader onPressInfo={() => navigation.navigate('About')} />}
    >
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>Bookings</Text>
        <Text style={styles.title} accessibilityRole="header">
          Calculate fees
        </Text>
        <Text style={styles.subtitle}>
          Build your line-up, see every line and let the discount tier apply itself. Two bookings unlock
          5%, three unlock 10% and four or more unlock 15%.
        </Text>
      </View>

      {prefillNotice ? <InlineNotice tone="info" title="Added to your quote" message={prefillNotice} /> : null}

      <Card style={styles.selectionCard}>
        <View style={styles.stepHeader}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepCopy}>
            <Text style={styles.stepTitle}>Choose your line-up</Text>
            <Text style={styles.stepCaption}>Tap any item to add or remove it.</Text>
          </View>
          <Badge label={`${quote.itemCount} selected`} tone={quote.itemCount > 0 ? 'cyan' : 'neutral'} />
        </View>

        <Text style={styles.groupLabel}>Packages</Text>
        <View style={styles.rows}>
          {packages.map((offering) => (
            <CheckboxRow
              key={offering.id}
              name={offering.name}
              categoryLabel={offering.priceNote}
              price={offering.price}
              selected={selectedIds.includes(offering.id)}
              onToggle={() => toggle(offering.id)}
            />
          ))}
        </View>

        <Text style={[styles.groupLabel, styles.groupLabelSpaced]}>Experiences</Text>
        <View style={styles.rows}>
          {experiences.map((offering) => (
            <CheckboxRow
              key={offering.id}
              name={offering.name}
              categoryLabel={offering.priceNote}
              price={offering.price}
              selected={selectedIds.includes(offering.id)}
              onToggle={() => toggle(offering.id)}
            />
          ))}
        </View>

        {selectionError ? (
          <Text style={styles.selectionError} accessibilityLiveRegion="polite">
            {selectionError}
          </Text>
        ) : null}

        {quote.itemCount > 0 ? (
          <Button
            label="Clear selection"
            variant="ghost"
            size="sm"
            onPress={resetQuote}
            style={styles.clearButton}
          />
        ) : null}
      </Card>

      <View style={styles.tierRow}>
        {TIERS.map((tier) => {
          const active = quote.discountRate === tier.rate;
          return (
            <View key={tier.label} style={[styles.tierCard, active && styles.tierCardActive]}>
              <Text style={styles.tierLabel}>{tier.label}</Text>
              <Text style={[styles.tierRate, active && styles.tierRateActive]}>
                {Math.round(tier.rate * 100)}%
              </Text>
              <Text style={styles.tierCount}>{tier.count === 4 ? '4+ bookings' : `${tier.count} bookings`}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.quoteSection}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Your quotation</Text>
          <Text style={styles.sectionHint}>Updates live</Text>
        </View>
        <QuoteSummary quote={quote} />
      </View>

      {confirmation ? (
        <ConfirmationCard
          reference={confirmation.reference}
          title="Quote request sent"
          message="Your quotation is on its way to the arena team. We will confirm availability and payment details by email within one business day."
          rows={[
            { label: 'Requested on', value: confirmation.date },
            { label: 'Bookings', value: `${confirmation.itemCount} selected` },
            { label: 'Name', value: name.trim() },
            { label: 'Email', value: email.trim() },
          ]}
          total={formatZAR(confirmation.total)}
          onReset={resetQuote}
          resetLabel="Start a new quote"
        />
      ) : (
        <Card style={styles.detailsCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>Your details</Text>
              <Text style={styles.stepCaption}>We use these only to send the quotation.</Text>
            </View>
          </View>

          <View style={styles.fields}>
            <Field
              label="Full name"
              value={name}
              onChangeText={(value) => {
                setName(value);
                if (errors.name) setErrors((previous) => ({ ...previous, name: validateName(value) }));
              }}
              onBlur={() => setErrors((previous) => ({ ...previous, name: validateName(name) }))}
              error={errors.name}
              placeholder="Darshil Singh"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              required
            />
            <Field
              label="Email address"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (errors.email) setErrors((previous) => ({ ...previous, email: validateEmail(value) }));
              }}
              onBlur={() => setErrors((previous) => ({ ...previous, email: validateEmail(email) }))}
              error={errors.email}
              placeholder="you@example.co.za"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              required
            />
            <Button
              label="Submit quote request"
              onPress={submit}
              fullWidth
              icon="send-outline"
            />
            <Text style={styles.footnote}>
              No payment is taken online. Submitting sends a request, not a confirmed booking.
            </Text>
          </View>
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: 4,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyan,
    fontSize: 9.5,
  },
  title: {
    ...type.h1,
    fontSize: 38,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 2,
  },
  selectionCard: {
    marginTop: spacing.xs,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59,232,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.3)',
  },
  stepNumber: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    color: colors.cyan,
  },
  stepCopy: {
    flex: 1,
    gap: 1,
  },
  stepTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
  },
  stepCaption: {
    fontFamily: fonts.body,
    fontSize: 9.5,
    color: colors.textDim,
  },
  groupLabel: {
    ...type.label,
    marginTop: spacing.md,
    marginBottom: 6,
    color: colors.textDim,
  },
  groupLabelSpaced: {
    marginTop: spacing.md,
  },
  rows: {
    gap: spacing.xs,
  },
  selectionError: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.danger,
  },
  clearButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingHorizontal: 0,
    borderColor: 'transparent',
  },
  tierRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tierCard: {
    ...glassCard,
    flex: 1,
    padding: spacing.sm,
    gap: 1,
  },
  tierCardActive: {
    borderColor: 'rgba(59,232,255,0.55)',
    backgroundColor: 'rgba(59,232,255,0.08)',
  },
  tierLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  tierRate: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    lineHeight: 26,
    color: colors.textMuted,
  },
  tierRateActive: {
    color: colors.cyan,
  },
  tierCount: {
    fontFamily: fonts.body,
    fontSize: 8.5,
    color: colors.textDim,
  },
  quoteSection: {
    marginTop: spacing.xl,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionHeading: {
    ...type.h2,
    fontSize: 24,
  },
  sectionHint: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  detailsCard: {
    marginTop: spacing.lg,
  },
  fields: {
    marginTop: spacing.md,
  },
  footnote: {
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 13,
    color: colors.textDim,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
