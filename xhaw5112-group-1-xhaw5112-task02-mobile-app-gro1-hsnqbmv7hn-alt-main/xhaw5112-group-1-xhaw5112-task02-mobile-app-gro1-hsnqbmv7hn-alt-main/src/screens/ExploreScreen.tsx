import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { OfferingCard } from '../components/OfferingCard';
import { Screen } from '../components/Screen';
import { SegmentedControl, type SegmentOption } from '../components/SegmentedControl';
import { offerings, priceDisclaimer } from '../data/content';
import type { OfferingCategory } from '../data/types';
import type { TabScreenProps } from '../navigation/types';
import { colors, fonts, spacing, type } from '../theme/tokens';

const SEGMENTS: SegmentOption<OfferingCategory>[] = [
  { key: 'package', label: 'Packages', count: offerings.filter((item) => item.category === 'package').length },
  { key: 'experience', label: 'Experiences', count: offerings.filter((item) => item.category === 'experience').length },
];

export function ExploreScreen({ navigation, route }: TabScreenProps<'Explore'>) {
  const [category, setCategory] = useState<OfferingCategory>(route.params?.category ?? 'package');

  useEffect(() => {
    const requested = route.params?.category;
    if (requested) {
      setCategory(requested);
      navigation.setParams({ category: undefined });
    }
  }, [navigation, route.params?.category]);

  const items = useMemo(() => offerings.filter((item) => item.category === category), [category]);

  return (
    <Screen testID="screen-explore" header={<AppHeader onPressInfo={() => navigation.navigate('About')} />}>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>Choose your next level</Text>
        <Text style={styles.title} accessibilityRole="header">
          Explore the arena
        </Text>
        <Text style={styles.subtitle}>
          Four packages, three experiences and one very competitive leaderboard. Every price is per
          booking and shown in rand.
        </Text>
      </View>

      <SegmentedControl options={SEGMENTS} value={category} onChange={setCategory} />

      <View style={styles.listHeader}>
        <Text style={styles.listLabel}>
          {category === 'package' ? 'Gaming packages' : 'Arena experiences'}
        </Text>
        <Badge label={`${items.length} options`} tone={category === 'package' ? 'cyan' : 'purple'} />
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title="Nothing here yet"
          message="This shelf is empty right now. Try the other category or ask the arena team."
          actionLabel="Back to packages"
          onAction={() => setCategory('package')}
        />
      ) : (
        items.map((offering) => (
          <OfferingCard
            key={offering.id}
            offering={offering}
            onPress={() => {
              if (offering.category === 'package') {
                navigation.navigate('PackageDetail', { id: offering.id });
              } else {
                navigation.navigate('ExperienceDetail', { id: offering.id });
              }
            }}
          />
        ))
      )}

      <Card style={styles.noteCard}>
        <Text style={styles.noteTitle}>How pricing works</Text>
        <Text style={styles.noteBody}>
          Add two bookings for 5% off, three for 10% and four or more for 15%. The calculator applies the
          best tier automatically — no codes, no fine print.
        </Text>
        <Text style={styles.disclaimer}>{priceDisclaimer}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
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
    maxWidth: 420,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  listLabel: {
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.textDim,
  },
  noteCard: {
    marginTop: spacing.sm,
    borderColor: 'rgba(178,124,255,0.2)',
  },
  noteTitle: {
    fontFamily: fonts.bodySemi,
    fontSize: 12.5,
    color: colors.text,
    marginBottom: 4,
  },
  noteBody: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.textMuted,
  },
  disclaimer: {
    marginTop: spacing.xs,
    fontFamily: fonts.body,
    fontSize: 9.5,
    lineHeight: 14,
    color: colors.textDim,
  },
});
