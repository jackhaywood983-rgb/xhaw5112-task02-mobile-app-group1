import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DetailHero } from '../components/DetailHero';
import { EmptyState } from '../components/EmptyState';
import { FeatureList } from '../components/FeatureList';
import { Leaderboard } from '../components/Leaderboard';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { SessionRequestForm } from '../components/SessionRequestForm';
import { leaderboard, offerings, priceDisclaimer } from '../data/content';
import type { RootStackScreenProps } from '../navigation/types';
import { colors, fonts, glassCard, radius, spacing, type } from '../theme/tokens';

export function ExperienceDetailScreen({ navigation, route }: RootStackScreenProps<'ExperienceDetail'>) {
  const offering = offerings.find(
    (item) => item.id === route.params.id && item.category === 'experience',
  );

  if (!offering) {
    return (
      <Screen bottomInset="safe">
        <EmptyState
          icon="help-circle-outline"
          title="Experience not found"
          message="This experience may have moved. Head back to the experiences list to see what is available."
          actionLabel="Back to experiences"
          onAction={() => navigation.goBack()}
        />
      </Screen>
    );
  }

  return (
    <Screen testID="screen-experience-detail" bottomInset="safe" contentStyle={styles.screenContent}>
      <DetailHero
        image={offering.image}
        imageAlt={offering.imageAlt}
        eyebrow={offering.eyebrow}
        title={offering.name}
        price={offering.price}
        priceNote={offering.priceNote}
        badge={offering.badge}
        onBack={navigation.goBack}
        meta={[
          { icon: 'time-outline', label: offering.duration },
          { icon: 'people-outline', label: offering.capacity },
        ]}
      />

      <View style={styles.intro}>
        <Text style={styles.tagline}>{offering.tagline}</Text>
        <Text style={styles.description}>{offering.description}</Text>
      </View>

      <Card style={styles.glanceCard}>
        <View style={styles.glanceHeader}>
          <Text style={styles.glanceLabel}>At a glance</Text>
          <Badge label={offering.priceNote} tone="neutral" />
        </View>
        <FeatureList items={offering.highlights} />
      </Card>

      <SectionHeader title="What's included" eyebrow="Every detail" />
      <View style={styles.features}>
        {offering.features.map((feature, index) => (
          <View key={feature.title} style={styles.featureRow}>
            <Text style={styles.featureIndex}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={styles.featureCopy}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDetail}>{feature.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      {offering.catalogue ? (
        <>
          <SectionHeader title="Game catalogue" eyebrow="Pick your world" />
          <View style={styles.chips}>
            {offering.catalogue.map((game) => (
              <View key={game} style={styles.chip}>
                <Text style={styles.chipText}>{game}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {offering.safety ? (
        <>
          <SectionHeader title="Safety first" eyebrow="Before you play" />
          <Card style={styles.safetyCard}>
            {offering.safety.map((rule) => (
              <View key={rule} style={styles.safetyRow}>
                <View style={styles.safetyIcon}>
                  <Ionicons name="shield-checkmark-outline" size={14} color={colors.success} />
                </View>
                <Text style={styles.safetyText}>{rule}</Text>
              </View>
            ))}
          </Card>
        </>
      ) : null}

      {offering.tracks ? (
        <>
          <SectionHeader title="Six legendary tracks" eyebrow="Pick your circuit" />
          <View style={styles.chips}>
            {offering.tracks.map((track) => (
              <View key={track} style={[styles.chip, styles.trackChip]}>
                <Ionicons name="flag-outline" size={11} color={colors.cyan} />
                <Text style={styles.chipText}>{track}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {offering.leaderboard ? (
        <>
          <SectionHeader title="Arena leaderboard" eyebrow="This month" />
          <Card style={styles.leaderboardCard}>
            <Leaderboard entries={leaderboard} />
            <Text style={styles.leaderboardNote}>
              Top ten drivers each month win arena credit. Set your time during any session.
            </Text>
          </Card>
        </>
      ) : null}

      <SectionHeader title="The numbers" eyebrow="Good to know" />
      <View style={styles.specsGrid}>
        {offering.specs.map((spec) => (
          <View key={spec.label} style={styles.specCell}>
            <Text style={styles.specLabel}>{spec.label}</Text>
            <Text style={styles.specValue}>{spec.value}</Text>
          </View>
        ))}
      </View>

      {offering.gallery ? (
        <View style={styles.galleryWrap}>
          <Image
            source={offering.gallery}
            style={styles.gallery}
            contentFit="cover"
            transition={240}
            accessible
            accessibilityLabel={offering.galleryAlt ?? `${offering.name} atmosphere`}
          />
          <LinearGradient
            colors={['rgba(5,7,14,0)', 'rgba(5,7,14,0.82)']}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.galleryCaption}>
            <Ionicons name="images-outline" size={12} color={colors.cyan} />
            <Text style={styles.galleryText}>Inside the arena</Text>
          </View>
        </View>
      ) : null}

      <SessionRequestForm
        offeringName={offering.name}
        title={offering.id === 'vr-experience' ? 'Choose a VR session' : offering.ctaLabel}
        intro="Pick a preferred date and time. We hold the slot for 24 hours while the team confirms availability."
        submitLabel="Request this slot"
      />

      <Card style={styles.ctaCard}>
        <Text style={styles.ctaEyebrow}>Make it a session</Text>
        <Text style={styles.ctaTitle}>Add this to your quote</Text>
        <Text style={styles.ctaCopy}>
          Pair it with a package and the best discount tier applies automatically. Every line stays
          visible in the calculator.
        </Text>
        <Button
          label="Add to quote"
          icon="add-circle-outline"
          fullWidth
          onPress={() =>
            navigation.navigate('Tabs', { screen: 'Calculate', params: { add: [offering.id] } })
          }
        />
        <Button
          label="Ask the arena"
          variant="ghost"
          icon="chatbubble-ellipses-outline"
          fullWidth
          onPress={() => navigation.navigate('Tabs', { screen: 'Arena' })}
          style={styles.secondaryButton}
        />
        <Text style={styles.disclaimer}>{priceDisclaimer}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    paddingTop: 0,
  },
  intro: {
    marginTop: spacing.lg,
    gap: 6,
  },
  tagline: {
    ...type.h3,
    fontSize: 20,
    lineHeight: 24,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textMuted,
  },
  glanceCard: {
    marginTop: spacing.md,
    borderColor: 'rgba(59,232,255,0.18)',
  },
  glanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  glanceLabel: {
    ...type.label,
    color: colors.cyan,
  },
  features: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(12,17,32,0.55)',
    paddingHorizontal: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(151,167,255,0.12)',
  },
  featureIndex: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    color: colors.purple,
    width: 24,
    paddingTop: 1,
  },
  featureCopy: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 12.5,
    color: colors.text,
  },
  featureDetail: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(12,17,32,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
  },
  trackChip: {
    borderColor: 'rgba(59,232,255,0.2)',
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  safetyCard: {
    gap: spacing.xs,
  },
  safetyRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  safetyIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(92,230,164,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(92,230,164,0.24)',
  },
  safetyText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
    paddingTop: 4,
  },
  leaderboardCard: {
    paddingTop: spacing.sm,
  },
  leaderboardNote: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.textDim,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  specCell: {
    ...glassCard,
    width: '48%',
    flexGrow: 1,
    padding: spacing.sm + 2,
    gap: 2,
  },
  specLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 8.5,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  specValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.text,
  },
  galleryWrap: {
    marginTop: spacing.xl,
    height: 178,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'flex-end',
  },
  gallery: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceAlt,
  },
  galleryCaption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: spacing.sm,
  },
  galleryText: {
    fontFamily: fonts.bodySemi,
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  ctaCard: {
    marginTop: spacing.lg,
    borderColor: 'rgba(59,232,255,0.24)',
  },
  ctaEyebrow: {
    ...type.label,
    color: colors.cyan,
    marginBottom: 3,
  },
  ctaTitle: {
    ...type.h3,
    fontSize: 22,
  },
  ctaCopy: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginTop: spacing.xs,
  },
  disclaimer: {
    marginTop: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 13,
    color: colors.textDim,
    textAlign: 'center',
  },
});
