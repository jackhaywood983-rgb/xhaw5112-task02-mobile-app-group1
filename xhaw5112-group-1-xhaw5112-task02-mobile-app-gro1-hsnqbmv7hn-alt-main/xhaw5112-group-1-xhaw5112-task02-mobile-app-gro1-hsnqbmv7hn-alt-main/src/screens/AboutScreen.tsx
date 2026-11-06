import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DetailHeader } from '../components/DetailHeader';
import { FadeInView } from '../components/FadeInView';
import { FeatureList } from '../components/FeatureList';
import { Hero } from '../components/Hero';
import { Screen } from '../components/Screen';
import { SectionHeader } from '../components/SectionHeader';
import { arena, photos, timeline, values } from '../data/content';
import type { RootStackScreenProps } from '../navigation/types';
import { colors, fonts, glassCard, gradients, radius, spacing, type } from '../theme/tokens';

export function AboutScreen({ navigation }: RootStackScreenProps<'About'>) {
  return (
    <Screen
      testID="screen-about"
      header={<DetailHeader title="Our story" onBack={navigation.goBack} />}
      bottomInset="safe"
    >
      <Hero
        image={photos.arena}
        imageAlt="Neon-lit arcade hall inside the Next Level arena"
        eyebrow={`Est. ${arena.founded} · ${arena.district}`}
        title={'Built for\nthe next level'}
        description="A gaming arena with the polish of a studio and the energy of a Friday night LAN."
        primaryLabel="Plan a visit"
        onPrimary={() => navigation.navigate('Tabs', { screen: 'Arena' })}
        secondaryLabel="Book a session"
        onSecondary={() => navigation.navigate('Tabs', { screen: 'Calculate' })}
        height={360}
      />

      <FadeInView>
        <Card style={styles.founderCard}>
          <View style={styles.founderRow}>
            <LinearGradient colors={gradients.accent} style={styles.founderAvatar}>
              <Text style={styles.founderInitials}>JN</Text>
            </LinearGradient>
            <View style={styles.founderCopy}>
              <Text style={styles.founderName}>{arena.founder}</Text>
              <Text style={styles.founderRole}>Founder · {arena.founded}</Text>
            </View>
            <Badge label={`${arena.city}`} tone="purple" />
          </View>
          <Text style={styles.story}>
            Next Level opened in {arena.founded} with six stations, a borrowed espresso machine and a simple
            idea: Johannesburg deserved a gaming venue that felt as considered as the games themselves.
            Three years later the floor holds 24 stations, a private VIP booth, VR bays, a hydraulic racing
            rig and a neon escape room — but the idea is the same.
          </Text>
        </Card>

        <SectionHeader title="Mission & vision" eyebrow="Why we play" />
        <View style={styles.twoUp}>
          <Card style={styles.pillarCard}>
            <View style={styles.pillarIcon}>
              <Ionicons name="flag-outline" size={18} color={colors.cyan} />
            </View>
            <Text style={styles.pillarTitle}>Mission</Text>
            <Text style={styles.pillarCopy}>
              Make world-class play accessible to every player in Johannesburg, from a first-time
              controller to a national squad.
            </Text>
          </Card>
          <Card style={styles.pillarCard}>
            <View style={styles.pillarIcon}>
              <Ionicons name="telescope-outline" size={18} color={colors.purpleSoft} />
            </View>
            <Text style={styles.pillarTitle}>Vision</Text>
            <Text style={styles.pillarCopy}>
              Put Johannesburg on the global esports map with a home arena that develops local talent and
              hosts world-class events.
            </Text>
          </Card>
        </View>

        <Card style={styles.goalsCard}>
          <Text style={styles.cardLabel}>Arena goals</Text>
          <FeatureList
            items={[
              'Host 10 school and community programmes every year.',
              'Fund three academy teams across Valorant, CS2 and sim racing.',
              'Keep every station on hardware less than 18 months old.',
              'Run the arena on backup power and a second fibre line.',
            ]}
          />
        </Card>

        <SectionHeader title="The road so far" eyebrow="2023 → today" />
        <View style={styles.timeline}>
          {timeline.map((item, index) => (
            <View key={item.year} style={styles.timelineRow}>
              <View style={styles.timelineRail}>
                <View style={[styles.timelineDot, index === timeline.length - 1 && styles.timelineDotActive]} />
                {index < timeline.length - 1 ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.timelineCopy}>
                <Text style={styles.timelineYear}>{item.year}</Text>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <SectionHeader title="What we stand for" eyebrow="The house rules" />
        <View style={styles.valuesGrid}>
          {values.map((value) => (
            <View key={value.title} style={styles.valueCard}>
              <Text style={styles.valueTitle}>{value.title}</Text>
              <Text style={styles.valueDetail}>{value.detail}</Text>
            </View>
          ))}
        </View>

        <Card style={styles.visitCard}>
          <View style={styles.visitHeader}>
            <View style={styles.visitIcon}>
              <Ionicons name="location-outline" size={19} color={colors.cyan} />
            </View>
            <View style={styles.visitCopy}>
              <Text style={styles.visitTitle}>Come see it in person</Text>
              <Text style={styles.visitDetail}>{arena.address}</Text>
            </View>
          </View>
          <Button
            label="Contact the arena"
            onPress={() => navigation.navigate('Tabs', { screen: 'Arena' })}
            variant="secondary"
            fullWidth
            icon="chatbubble-ellipses-outline"
            style={styles.visitButton}
          />
        </Card>
      </FadeInView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  founderCard: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  founderAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  founderInitials: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: colors.black,
  },
  founderCopy: {
    flex: 1,
  },
  founderName: {
    fontFamily: fonts.bodySemi,
    fontSize: 13.5,
    color: colors.text,
  },
  founderRole: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textDim,
  },
  story: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textMuted,
  },
  twoUp: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  pillarCard: {
    flex: 1,
    padding: spacing.md,
    gap: 5,
  },
  pillarIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(59,232,255,0.06)',
    marginBottom: 2,
  },
  pillarTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 19,
    lineHeight: 21,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: colors.text,
  },
  pillarCopy: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  goalsCard: {
    marginTop: spacing.sm,
  },
  cardLabel: {
    ...type.label,
    color: colors.cyan,
    marginBottom: spacing.sm,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 82,
  },
  timelineRail: {
    width: 16,
    alignItems: 'center',
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginTop: 4,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  timelineDotActive: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: 'rgba(178,124,255,0.28)',
    marginVertical: 3,
  },
  timelineCopy: {
    flex: 1,
    paddingBottom: spacing.md,
    gap: 1,
  },
  timelineYear: {
    fontFamily: fonts.bodySemi,
    fontSize: 9.5,
    letterSpacing: 1.4,
    color: colors.cyan,
  },
  timelineTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
  },
  timelineDetail: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  valueCard: {
    ...glassCard,
    width: '48%',
    flexGrow: 1,
    padding: spacing.md,
    gap: 4,
  },
  valueTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 12.5,
    color: colors.text,
  },
  valueDetail: {
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textMuted,
  },
  visitCard: {
    marginTop: spacing.xl,
    borderColor: 'rgba(59,232,255,0.22)',
  },
  visitHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  visitIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59,232,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(59,232,255,0.22)',
  },
  visitCopy: {
    flex: 1,
    gap: 2,
  },
  visitTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.text,
  },
  visitDetail: {
    fontFamily: fonts.body,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textDim,
  },
  visitButton: {
    marginTop: spacing.md,
  },
});
