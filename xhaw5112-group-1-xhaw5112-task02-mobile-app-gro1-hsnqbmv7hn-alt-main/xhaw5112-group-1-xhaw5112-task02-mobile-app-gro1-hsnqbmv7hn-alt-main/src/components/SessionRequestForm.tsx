import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import { AccessibilityInfo, Keyboard, StyleSheet, Text, View } from 'react-native';

import { coaches, timeSlots } from '../data/content';
import { formatLongDate, getUpcomingDates, type UpcomingDate } from '../lib/dates';
import { createQuoteReference } from '../lib/feeCalculator';
import {
  hasErrors,
  validateEmail,
  validateName,
  validatePreferredDate,
  validateTimeSlot,
  type FieldErrors,
} from '../lib/validation';
import { colors, fonts, spacing, type } from '../theme/tokens';
import { Card } from './Card';
import { CoachCard } from './CoachCard';
import { ConfirmationCard } from './ConfirmationCard';
import { DateSelector } from './DateSelector';
import { Field } from './Field';
import { InlineNotice } from './InlineNotice';
import { Button } from './Button';
import { TimeSlotPicker } from './TimeSlotPicker';

interface SessionRequestFormProps {
  offeringName: string;
  withCoaches?: boolean;
  title?: string;
  intro?: string;
  submitLabel?: string;
}

interface Confirmation {
  reference: string;
  date: string;
  slot: string;
  coach?: string;
}

export function SessionRequestForm({
  offeringName,
  withCoaches = false,
  title = 'Request a slot',
  intro = 'Pick a preferred date and time. We hold the slot for 24 hours while the team confirms it with you.',
  submitLabel = 'Request this slot',
}: SessionRequestFormProps) {
  const dates = useMemo(() => getUpcomingDates(10), []);
  const [coachId, setCoachId] = useState(coaches[0]?.id ?? null);
  const [selectedDate, setSelectedDate] = useState<UpcomingDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const selectedCoach = coaches.find((coach) => coach.id === coachId);

  const reset = () => {
    setConfirmation(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setName('');
    setEmail('');
    setErrors({});
    setAnnouncement('');
  };

  const submit = () => {
    Keyboard.dismiss();
    const nextErrors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      date: validatePreferredDate(selectedDate?.label ?? null),
      slot: validateTimeSlot(selectedSlot),
    };
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
      setAnnouncement('Please fix the highlighted fields before sending.');
      AccessibilityInfo.announceForAccessibility('Please fix the highlighted fields before sending.');
      return;
    }

    const reference = createQuoteReference();
    setConfirmation({
      reference,
      date: selectedDate?.label ?? formatLongDate(),
      slot: selectedSlot ?? '',
      coach: withCoaches ? selectedCoach?.name : undefined,
    });
    setAnnouncement(`Request sent. Your reference is ${reference}.`);
    AccessibilityInfo.announceForAccessibility(`Request sent. Your reference is ${reference}.`);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  };

  if (confirmation) {
    return (
      <View style={styles.wrapper}>
        <ConfirmationCard
          reference={confirmation.reference}
          title="Slot requested"
          message={`We have pencilled in ${confirmation.date} at ${confirmation.slot}. The arena team will confirm by email within one business day.`}
          rows={[
            { label: 'Experience', value: offeringName },
            { label: 'Preferred date', value: confirmation.date },
            { label: 'Time', value: confirmation.slot },
            ...(confirmation.coach ? [{ label: 'Coach', value: confirmation.coach }] : []),
            { label: 'Name', value: name.trim() },
          ]}
          onReset={reset}
          resetLabel="Request another slot"
        />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <Card>
        <Text style={styles.eyebrow}>Availability</Text>
        <Text style={type.h3}>{title}</Text>
        <Text style={styles.intro}>{intro}</Text>

        {announcement ? <InlineNotice tone="error" title="Check your details" message={announcement} /> : null}

        {withCoaches ? (
          <View style={styles.section}>
            <Text style={styles.label}>Choose a coach</Text>
            <View accessibilityRole="radiogroup" accessibilityLabel="Choose a coach">
              {coaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  coach={coach}
                  selected={coach.id === coachId}
                  onSelect={() => {
                    setCoachId(coach.id);
                    void Haptics.selectionAsync().catch(() => undefined);
                  }}
                />
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.label}>Preferred date</Text>
          <DateSelector dates={dates} selectedId={selectedDate?.id ?? null} onSelect={setSelectedDate} />
          {errors.date ? <Text style={styles.error}>{errors.date}</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Time slot</Text>
          <TimeSlotPicker slots={timeSlots} selectedTime={selectedSlot} onSelect={(slot) => setSelectedSlot(slot.time)} />
          {errors.slot ? <Text style={styles.error}>{errors.slot}</Text> : null}
        </View>

        <View style={styles.section}>
          <Field
            label="Full name"
            value={name}
            onChangeText={(value) => {
              setName(value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: validateName(value) }));
            }}
            onBlur={() => setErrors((prev) => ({ ...prev, name: validateName(name) }))}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            placeholder="Darshil Singh"
            required
          />
          <Field
            label="Email address"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
            }}
            onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
            error={errors.email}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="you@example.co.za"
            required
          />
          <Button label={submitLabel} onPress={submit} fullWidth icon="calendar-outline" />
          <Text style={styles.footnote}>No payment is taken online. This is a request, not a confirmed booking.</Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.xs,
  },
  eyebrow: {
    ...type.label,
    color: colors.cyan,
    fontSize: 9,
    marginBottom: 3,
  },
  intro: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  section: {
    marginTop: spacing.sm,
  },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: 8,
  },
  error: {
    marginTop: 6,
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.danger,
  },
  footnote: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.textDim,
    textAlign: 'center',
  },
});
