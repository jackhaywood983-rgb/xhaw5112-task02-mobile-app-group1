import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  AccessibilityInfo,
  Keyboard,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ConfirmationCard } from '../components/ConfirmationCard';
import { Field } from '../components/Field';
import { InlineNotice } from '../components/InlineNotice';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { arena, photos } from '../data/content';
import { formatLongDate } from '../lib/dates';
import { createQuoteReference } from '../lib/feeCalculator';
import { hasErrors, validateEmail, validateMessage, validateName, type FieldErrors } from '../lib/validation';
import type { TabScreenProps } from '../navigation/types';
import { colors, fonts, glassCard, radius, shadow, spacing, type } from '../theme/tokens';

function parseMinutes(value: string): number {
  const [hours, minutes] = value.trim().split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function todayHoursIndex(day: number): number {
  if (day === 5) return 1;
  if (day === 6) return 2;
  if (day === 0) return 3;
  return 0;
}

function isArenaOpen(now: Date): boolean {
  const hours = arena.hours[todayHoursIndex(now.getDay())]?.hours;
  if (!hours) return false;
  const [open, close] = hours.split('–').map((part) => part.trim());
  const current = now.getHours() * 60 + now.getMinutes();
  const closeMinutes = parseMinutes(close) === 0 ? 24 * 60 : parseMinutes(close);
  return current >= parseMinutes(open) && current < closeMinutes;
}

export function ContactScreen({ navigation }: TabScreenProps<'Arena'>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [confirmation, setConfirmation] = useState<{ reference: string; date: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const now = new Date();
  const open = isArenaOpen(now);
  const todayIndex = todayHoursIndex(now.getDay());

  const openLink = (url: string) => {
    void Linking.openURL(url).catch(() => {
      setNotice('That link could not be opened on this device.');
    });
  };

  const reset = () => {
    setConfirmation(null);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setNotice(null);
  };

  const submit = () => {
    Keyboard.dismiss();
    const nextErrors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      message: validateMessage(message),
    };
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      setNotice('Please fix the highlighted fields before sending.');
      AccessibilityInfo.announceForAccessibility('Please fix the highlighted fields before sending.');
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => undefined);
      return;
    }
    const reference = createQuoteReference();
    setConfirmation({ reference, date: formatLongDate() });
    setNotice(null);
    AccessibilityInfo.announceForAccessibility(`Message sent. Reference ${reference}.`);
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  };

  return (
    <Screen testID="screen-contact" header={<AppHeader onPressInfo={() => navigation.navigate('About')} />}>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>Contact & location</Text>
        <Text style={styles.title} accessibilityRole="header">
          Come play
        </Text>
        <Text style={styles.subtitle}>
          Find us in {arena.district}, {arena.city}. Call ahead for a booth, or send the team a message
          and we will come back to you within a business day.
        </Text>
      </View>

      <View style={styles.contactRow}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Call the arena on ${arena.phone}`}
          onPress={() => openLink(arena.phoneHref)}
          style={({ pressed }) => [styles.contactCard, pressed && styles.pressed]}
        >
          <View style={styles.contactIcon}>
            <Ionicons name="call-outline" size={18} color={colors.cyan} />
          </View>
          <Text style={styles.contactLabel}>Call the arena</Text>
          <Text style={styles.contactValue}>{arena.phone}</Text>
        </Pressable>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Email bookings at ${arena.email}`}
          onPress={() => openLink(`mailto:${arena.email}`)}
          style={({ pressed }) => [styles.contactCard, pressed && styles.pressed]}
        >
          <View style={styles.contactIcon}>
            <Ionicons name="mail-outline" size={18} color={colors.purpleSoft} />
          </View>
          <Text style={styles.contactLabel}>Email bookings</Text>
          <Text style={styles.contactValue} numberOfLines={2}>
            {arena.email}
          </Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Directions to ${arena.address}`}
        onPress={() => openLink(arena.directionsUrl)}
        style={({ pressed }) => [styles.mapCard, pressed && styles.pressed]}
      >
        <Image
          source={photos.arena}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
          accessible={false}
        />
        <LinearGradient
          colors={['rgba(5,7,14,0.32)', 'rgba(5,7,14,0.95)']}
          locations={[0, 0.82]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.mapTop}>
          <Badge label={`${arena.district} · ${arena.city}`} tone="cyan" />
          <View style={styles.openPill}>
            <View style={[styles.openDot, { backgroundColor: open ? colors.success : colors.danger }]} />
            <Text style={styles.openText}>{open ? 'Open now' : 'Closed now'}</Text>
          </View>
        </View>
        <View style={styles.mapBottom}>
          <View style={styles.mapPin}>
            <Ionicons name="location" size={17} color={colors.black} />
          </View>
          <View style={styles.mapCopy}>
            <Text style={styles.mapTitle}>Next Level Arena</Text>
            <Text style={styles.mapAddress}>{arena.address}</Text>
          </View>
          <Ionicons name="navigate-outline" size={19} color={colors.cyan} />
        </View>
      </Pressable>

      <SectionHeader title="Opening hours" eyebrow="Plan your session" />
      <Card style={styles.hoursCard}>
        {arena.hours.map((entry, index) => {
          const isToday = index === todayIndex;
          return (
            <View key={entry.days} style={[styles.hoursRow, isToday && styles.hoursRowToday]}>
              <View style={styles.hoursDay}>
                <Text style={[styles.hoursDays, isToday && styles.hoursDaysToday]}>{entry.days}</Text>
                {isToday ? <Badge label="Today" tone="success" /> : null}
              </View>
              <Text style={[styles.hoursValue, isToday && styles.hoursValueToday]}>{entry.hours}</Text>
            </View>
          );
        })}
        <Text style={styles.hoursNote}>
          Last bookings start one hour before close. Public holidays may differ — call ahead.
        </Text>
      </Card>

      <SectionHeader title="Send a message" eyebrow="We reply within a day" />
      {confirmation ? (
        <ConfirmationCard
          reference={confirmation.reference}
          title="Message sent"
          message="Thanks for reaching out. The arena team will reply to your email within one business day."
          rows={[
            { label: 'Sent on', value: confirmation.date },
            { label: 'Name', value: name.trim() },
            { label: 'Email', value: email.trim() },
          ]}
          onReset={reset}
          resetLabel="Send another message"
        />
      ) : (
        <Card style={styles.formCard}>
          {notice ? <InlineNotice tone="error" title="Check your message" message={notice} /> : null}
          <Field
            label="Full name"
            value={name}
            onChangeText={(value) => {
              setName(value);
              if (errors.name) setErrors((previous) => ({ ...previous, name: validateName(value) }));
            }}
            onBlur={() => setErrors((previous) => ({ ...previous, name: validateName(name) }))}
            error={errors.name}
            placeholder="Your name"
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
          <Field
            label="Message"
            value={message}
            onChangeText={(value) => {
              setMessage(value);
              if (errors.message) {
                setErrors((previous) => ({ ...previous, message: validateMessage(value) }));
              }
            }}
            onBlur={() => setErrors((previous) => ({ ...previous, message: validateMessage(message) }))}
            error={errors.message}
            placeholder="Tell us about the session, party or event you have in mind."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            containerStyle={styles.messageField}
            required
          />
          <Button label="Send message" onPress={submit} fullWidth icon="paper-plane-outline" />
          <Text style={styles.formNote}>
            We only use your details to reply. No newsletters, no sharing.
          </Text>
        </Card>
      )}

      <SectionHeader title="Good to know" eyebrow="Before you arrive" />
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="accessibility-outline" size={17} color={colors.cyan} />
          <Text style={styles.infoText}>
            Step-free entry, accessible bathrooms and adaptive controllers on request.
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="car-outline" size={17} color={colors.cyan} />
          <Text style={styles.infoText}>
            Secure basement parking on Gaming Boulevard. VIP booths include complimentary parking.
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="battery-charging-outline" size={17} color={colors.cyan} />
          <Text style={styles.infoText}>
            Backup power and a second fibre line keep every station online through load-shedding.
          </Text>
        </View>
      </Card>

      <Text style={styles.footer}>
        {arena.name} · {arena.address}
      </Text>
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
    fontSize: 40,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  contactCard: {
    ...glassCard,
    ...shadow.card,
    flex: 1,
    padding: spacing.sm + 2,
    gap: 4,
  },
  contactIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(59,232,255,0.06)',
    marginBottom: 2,
  },
  contactLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  contactValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.text,
  },
  pressed: {
    opacity: 0.75,
  },
  mapCard: {
    ...glassCard,
    ...shadow.card,
    height: 220,
    marginTop: spacing.xs,
    padding: spacing.sm + 2,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  mapTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(5,7,14,0.7)',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  openText: {
    fontFamily: fonts.bodySemi,
    fontSize: 8.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  mapBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  mapPin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cyan,
  },
  mapCopy: {
    flex: 1,
    gap: 2,
  },
  mapTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
  },
  mapAddress: {
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textMuted,
  },
  hoursCard: {
    gap: 0,
    paddingVertical: spacing.sm,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(151,167,255,0.1)',
  },
  hoursRowToday: {
    backgroundColor: 'rgba(92,230,164,0.05)',
    borderRadius: radius.sm,
  },
  hoursDay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  hoursDays: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  hoursDaysToday: {
    fontFamily: fonts.bodySemi,
    color: colors.text,
  },
  hoursValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  hoursValueToday: {
    color: colors.success,
  },
  hoursNote: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.textDim,
  },
  formCard: {
    marginTop: 0,
  },
  messageField: {
    marginBottom: spacing.md,
  },
  formNote: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 13,
    color: colors.textDim,
    textAlign: 'center',
  },
  infoCard: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  footer: {
    marginTop: spacing.xl,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 15,
    color: colors.textDim,
    textAlign: 'center',
  },
});
