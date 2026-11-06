import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { EventCard } from '../components/EventCard';
import { FadeInView } from '../components/FadeInView';
import { Hero } from '../components/Hero';
import { OfferingCard } from '../components/OfferingCard';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { Stat } from '../components/Stat';
import { arena, arenaStats, events, offerings, photos } from '../data/content';
import type { TabScreenProps } from '../navigation/types';
import { colors, fonts, gradients, glassCard, radius, shadow, spacing, type } from '../theme/tokens';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface QuickAction {
  key: string;
  label: string;
  caption: string;
  icon: IconName;
  onPress: () => void;
}

export function HomeScreen({ navigation }: TabScreenProps<'Home'>) {
  const { width } = useWindowDimensions();
  const small = width < 360;
  const vip = offerings.find((offering) => offering.id === 'vip-gaming-experience');

  const quickActions: QuickAction[] = [
    {
      key: 'packages',
      label: 'Packages',
      caption: '4 ways to play',
      icon: 'grid-outline',
      onPress: () => navigation.navigate('Explore', { category: 'package' }),
    },
    {
      key: 'experiences',
      label: 'Experiences',
      caption: 'VR · sim · escape',
      icon: 'game-controller-outline',
      onPress: () => navigation.navigate('Explore', { category: 'experience' }),
    },
    {
      key: 'book',
      label: 'Book now',
      caption: 'Build a quote',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('Calculate'),
    },
  ];

  return (
    <Screen
      testID="screen-home"
      header={<AppHeader onPressInfo={() => navigation.navigate('About')} />}
      contentStyle={styles.screenContent}
    >
      <Hero
        image={photos.hero}
        imageAlt="Gamer at a glowing esports station inside Next Level Arena"
        eyebrow={`${arena.city} · Est. ${arena.founded}`}
        title={'Play.\nCompete.\nLevel up.'}
        description="Johannesburg’s premium gaming and esports arena. 24 stations, private booths and a leaderboard with your name on it."
        primaryLabel="Book a session"
        onPrimary={() => navigation.navigate('Calculate')}
        secondaryLabel="Explore"
        onSecondary={() => navigation.navigate('Explore', { category: 'package' })}
        height={small ? 428 : 456}
      />

      <FadeInView delay={60}>
        <View style={styles.quickRow}>
          {quickActions.map((action) => (
            <Pressable
              key={action.key}
              accessibilityRole="button"
              accessibilityLabel={`${action.label}. ${action.caption}`}
              onPress={action.onPress}
              style={({ pressed }) => [styles.quickCard, pressed && styles.quickPressed]}
            >
              <View style={styles.quickIcon}>
                <Ionicons name={action.icon} size={18} color={colors.cyan} />
              </View>
              <Text style={styles.quickLabel} numberOfLines={1}>
                {action.label}
              </Text>
              <Text style={styles.quickCaption} numberOfLines={1}>
                {action.caption}
              </Text>
            </Pressable>
          ))}
        </View>
      </FadeInView>

      <SectionHeader title="Featured events" eyebrow="This week at the arena" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.eventRail}
        style={styles.railBleed}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ScrollView>

      {vip ? (
        <>
          <SectionHeader
            title="The signature booth"
            eyebrow="Private by design"
            actionLabel="See all"
            onAction={() => navigation.navigate('Explore', { category: 'package' })}
          />
          <OfferingCard offering={vip} onPress={() => navigation.navigate('PackageDetail', { id: vip.id })} />
        </>
      ) : null}

      <Card style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Text style={type.h3}>The arena in numbers</Text>
          <Badge label={`Est. ${arena.founded}`} tone="purple" />
        </View>
        <View style={styles.statsGrid}>
          {arenaStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} style={styles.statCell} />
          ))}
        </View>
      </Card>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Read the Next Level Arena story"
        onPress={() => navigation.navigate('About')}
        style={({ pressed }) => [styles.storyCard, pressed && styles.storyPressed]}
      >
        <Image
          source={photos.arena}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={220}
          accessible={false}
        />
        <LinearGradient
          colors={['rgba(5,7,14,0.35)', 'rgba(5,7,14,0.94)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.storyContent}>
          <Badge label="Our story" tone="purple" />
          <Text style={styles.storyTitle}>{'Built in Joburg.\nMade for the next level.'}</Text>
          <Text style={styles.storyCopy}>
            Founded in 2023 by Jason Naidoo, Next Level grew from a six-station LAN lounge into the city’s
            home of competitive play.
          </Text>
          <View style={styles.storyLink}>
            <Text style={styles.storyLinkText}>Meet the arena</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.cyan} />
          </View>
        </View>
      </Pressable>

      <View style={styles.promo}>
        <LinearGradient colors={gradients.accent} style={styles.promoIcon}>
          <Ionicons name="flash" size={18} color={colors.black} />
        </LinearGradient>
        <View style={styles.promoCope}>
          <Text style={styles.promoTitle}>Student nights, every Wednesday</Text>
          <Text style={styles.promoCopy}>
            20% off any package with a valid student card. Walk-ins welcome before 18:00.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        {arena.name} · {arena.address}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 0,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  quickCard: {
    ...glassCard,
    ...shadow.card,
    flex: 1,
    minHeight: 100,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    gap: 3,
  },
  quickPressed: {
    borderColor: colors.borderStrong,
    transform: [{ scale: 0.985 }],
  },
  quickIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59,232,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.26)',
    marginBottom: 3,
  },
  quickLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 11.5,
    color: colors.text,
  },
  quickCaption: {
    fontFamily: fonts.body,
    fontSize: 8.5,
    color: colors.textDim,
  },
  railBleed: {
    marginHorizontal: -spacing.lg,
  },
  eventRail: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  statsCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
    columnGap: 0,
  },
  statCell: {
    width: '50%',
  },
  storyCard: {
    ...glassCard,
    ...shadow.card,
    height: 268,
    marginTop: spacing.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  storyPressed: {
    borderColor: colors.borderStrong,
  },
  storyContent: {
    padding: spacing.lg,
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  storyTitle: {
    ...type.h2,
    fontSize: 30,
    lineHeight: 29,
    marginTop: 2,
  },
  storyCopy: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
    maxWidth: 400,
  },
  storyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  storyLinkText: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.cyan,
  },
  promo: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
    padding: spacing.sm + 2,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(178,124,255,0.28)',
    backgroundColor: 'rgba(178,124,255,0.07)',
  },
  promoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoCope: {
    flex: 1,
    gap: 2,
  },
  promoTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.purpleSoft,
  },
  promoCopy: {
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 15,
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
