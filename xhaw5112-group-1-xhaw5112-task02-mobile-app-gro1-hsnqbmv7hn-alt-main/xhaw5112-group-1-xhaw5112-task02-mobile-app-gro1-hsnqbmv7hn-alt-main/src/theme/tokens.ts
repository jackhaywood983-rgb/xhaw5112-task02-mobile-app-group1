import { Platform, type TextStyle, type ViewStyle } from 'react-native';

/**
 * Single source of truth for the Next Level visual language.
 * Deep navy base, glass panels, cyan action colour and magenta/purple accents.
 */
export const colors = {
  bg: '#05070E',
  bgDeep: '#02040A',
  surface: '#0C1120',
  surfaceAlt: '#111729',
  surfaceGlass: 'rgba(15, 20, 38, 0.86)',
  surfaceGlassSoft: 'rgba(24, 30, 52, 0.55)',
  border: 'rgba(151, 167, 255, 0.14)',
  borderStrong: 'rgba(59, 232, 255, 0.38)',
  cyan: '#3BE8FF',
  cyanSoft: '#9BF6FF',
  cyanDeep: '#00A9C2',
  teal: '#4CF5C1',
  purple: '#B27CFF',
  purpleSoft: '#D8C2FF',
  magenta: '#FF5CC8',
  text: '#F5F7FF',
  textMuted: '#A3ACC9',
  textDim: '#707A9C',
  success: '#5CE6A4',
  warning: '#FFC96B',
  danger: '#FF8296',
  black: '#05070E',
  white: '#FFFFFF',
} as const;

export const gradients = {
  primary: ['#45F0FF', '#4CF5C1'] as const,
  primaryPressed: ['#2FD8EA', '#3BD9AB'] as const,
  accent: ['#B27CFF', '#FF5CC8'] as const,
  heroFade: ['rgba(5,7,14,0)', 'rgba(5,7,14,0.55)', 'rgba(5,7,14,0.97)'] as const,
  imageFade: ['rgba(5,7,14,0)', 'rgba(5,7,14,0.9)'] as const,
  glass: ['rgba(34,42,76,0.72)', 'rgba(11,15,30,0.9)'] as const,
  cardSheen: ['rgba(255,255,255,0.07)', 'rgba(255,255,255,0)'] as const,
  purpleGlow: ['rgba(178,124,255,0.30)', 'rgba(178,124,255,0)'] as const,
  cyanGlow: ['rgba(59,232,255,0.22)', 'rgba(59,232,255,0)'] as const,
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
} as const;

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  pill: 999,
} as const;

export const fonts = {
  display: 'BarlowCondensed_800ExtraBold',
  displayBold: 'BarlowCondensed_700Bold',
  displaySemi: 'BarlowCondensed_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const layout = {
  maxWidth: 560,
  gutter: spacing.lg,
  tabBarHeight: 64,
  heroHeight: 396,
} as const;

export const type = {
  display: {
    fontFamily: fonts.display,
    fontSize: 46,
    lineHeight: 44,
    letterSpacing: 0.4,
    color: colors.text,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  h1: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  h2: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: 0.3,
    color: colors.text,
    textTransform: 'uppercase',
  } satisfies TextStyle,
  h3: {
    fontFamily: fonts.displayBold,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 0.2,
    color: colors.text,
  } satisfies TextStyle,
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  } satisfies TextStyle,
  body: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textMuted,
  } satisfies TextStyle,
  bodyStrong: {
    fontFamily: fonts.bodySemi,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.text,
  } satisfies TextStyle,
  small: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textMuted,
  } satisfies TextStyle,
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.textDim,
  } satisfies TextStyle,
  price: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: 0.2,
    color: colors.cyan,
  } satisfies TextStyle,
} as const;

export const glassCard: ViewStyle = {
  backgroundColor: colors.surfaceGlass,
  borderRadius: radius.lg,
  borderWidth: 1,
  borderColor: colors.border,
};

export const shadow = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000000',
      shadowOpacity: 0.45,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 6 },
    default: {},
  }) as ViewStyle,
  glow: Platform.select<ViewStyle>({
    ios: {
      shadowColor: colors.cyan,
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 5 },
    default: {},
  }) as ViewStyle,
} as const;
