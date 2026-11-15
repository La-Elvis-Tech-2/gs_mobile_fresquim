/**
 * Tema central do Fresquim.
 * Linguagem visual: clean, neutra e quente (inspirada no painel apoito-admin),
 * com tipografia arredondada (Open Runde) e ícones Solar.
 * Todas as cores, fontes, raios e sombras saem daqui: nenhuma tela usa valores fixos.
 * Contraste de texto verificado para WCAG AA (mínimo 4.5:1 sobre o fundo).
 */
import type { ViewStyle } from 'react-native';

export const colors = {
  // Base neutra quente
  background: '#F7F6F4',
  surface: '#FFFFFF',
  surfaceMuted: '#F5F1EE',
  surfaceWarm: '#F2EDE8',
  border: '#EEECED',
  borderStrong: '#E7E6E3',

  // Texto
  text: '#1F2933',
  textMuted: '#6B6969', // 5.3:1 sobre branco
  textOnDark: '#FFFFFF',

  // Ação principal (pílula escura)
  primary: '#1F2933',
  primaryPressed: '#374151',

  // Acento água
  accent: '#2563EB',

  // Tipos de ponto (ícone + fundo suave)
  water: '#2563EB',
  waterSoft: '#EAF1FE',
  shade: '#15803D',
  shadeSoft: '#E7F5EC',
  health: '#BE123C',
  healthSoft: '#FDECEF',
  transit: '#6D28D9',
  transitSoft: '#F1EBFD',

  // Risco de calor (sempre acompanhado de ícone e texto)
  riskLow: '#166534',
  riskLowSoft: '#DCF3E3',
  riskMedium: '#B45309',
  riskMediumSoft: '#FFF1DC',
  riskHigh: '#B91C1C',
  riskHighSoft: '#FDE2E2',

  success: '#166534',
  successSoft: '#DCF3E3',
  danger: '#B91C1C',
  dangerSoft: '#FDE2E2',

  skeleton: '#ECEAE7',
} as const;

export const fonts = {
  regular: 'OpenRunde-Regular',
  medium: 'OpenRunde-Medium',
  semibold: 'OpenRunde-Semibold',
  bold: 'OpenRunde-Bold',
} as const;

/** Escala tipográfica (inspirada nos tamanhos do iOS, nunca abaixo de 14). */
export const typography = {
  display: { fontFamily: fonts.semibold, fontSize: 76, lineHeight: 80, letterSpacing: -3 },
  largeTitle: { fontFamily: fonts.bold, fontSize: 32, lineHeight: 38, letterSpacing: -0.6 },
  title: { fontFamily: fonts.semibold, fontSize: 24, lineHeight: 30, letterSpacing: -0.4 },
  headline: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 24 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 17, lineHeight: 24 },
  callout: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 22 },
  subhead: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 19 },
  overline: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 18, letterSpacing: 0.4 },
} as const;

export type TypographyVariant = keyof typeof typography;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const iconSize = {
  sm: 18,
  md: 22,
  lg: 26,
} as const;

export const shadow: Record<'card', ViewStyle> = {
  card: {
    shadowColor: '#1F2933',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
};

/** Margem lateral padrão das telas. */
export const screenPadding = spacing.xl;

