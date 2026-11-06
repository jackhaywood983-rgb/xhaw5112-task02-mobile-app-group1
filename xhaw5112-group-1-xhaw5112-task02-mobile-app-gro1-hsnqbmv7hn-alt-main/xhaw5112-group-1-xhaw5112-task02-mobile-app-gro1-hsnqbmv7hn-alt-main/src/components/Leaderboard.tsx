import { StyleSheet, Text, View } from 'react-native';

import type { LeaderboardEntry } from '../data/types';
import { colors, fonts, spacing } from '../theme/tokens';

interface LeaderboardProps {
  entries: readonly LeaderboardEntry[];
}

const RANK_COLORS = [colors.cyan, colors.purpleSoft, colors.magenta];

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <View accessibilityLabel="Arena racing leaderboard" accessible={false}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.rankCol]}>#</Text>
        <Text style={[styles.headerCell, styles.driverCol]}>DRIVER</Text>
        <Text style={[styles.headerCell, styles.trackCol]}>TRACK</Text>
        <Text style={[styles.headerCell, styles.timeCol]}>LAP</Text>
      </View>
      {entries.map((entry) => (
        <View key={entry.id} style={styles.row}>
          <Text style={[styles.rank, styles.rankCol, { color: RANK_COLORS[entry.rank - 1] ?? colors.textDim }]}>
            {String(entry.rank).padStart(2, '0')}
          </Text>
          <View style={styles.driverCol}>
            <Text style={styles.driver}>{entry.driver}</Text>
            <Text style={styles.vehicle}>{entry.vehicle}</Text>
          </View>
          <Text style={[styles.track, styles.trackCol]} numberOfLines={1}>
            {entry.track}
          </Text>
          <Text style={[styles.time, styles.timeCol]}>{entry.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerCell: {
    fontFamily: fonts.bodySemi,
    fontSize: 8,
    letterSpacing: 1.2,
    color: colors.textDim,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151,167,255,0.07)',
  },
  rankCol: {
    width: 28,
  },
  driverCol: {
    flex: 1,
  },
  trackCol: {
    width: 74,
  },
  timeCol: {
    width: 62,
    textAlign: 'right',
  },
  rank: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
  },
  driver: {
    fontFamily: fonts.bodySemi,
    fontSize: 11.5,
    color: colors.text,
  },
  vehicle: {
    fontFamily: fonts.body,
    fontSize: 8.5,
    color: colors.textDim,
  },
  track: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.textMuted,
  },
  time: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.cyan,
  },
});
