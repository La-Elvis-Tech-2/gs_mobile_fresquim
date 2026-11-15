import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, iconSize, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './icons/Icon';

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  eyebrowIcon?: IconName;
  right?: ReactNode;
  /** Linha acima do título (ex.: a marca do app). */
  top?: ReactNode;
}

/** Cabeçalho de título grande no estilo iOS, rolando junto com o conteúdo. */
export function ScreenHeader({ title, subtitle, eyebrow, eyebrowIcon, right, top }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      {top && <View style={styles.top}>{top}</View>}
      <View style={styles.row}>
        <View style={styles.texts}>
          {eyebrow && (
            <View style={styles.eyebrow}>
              {eyebrowIcon && <Icon name={eyebrowIcon} size={iconSize.sm} color={colors.textMuted} />}
              <AppText variant="caption" color={colors.textMuted}>
                {eyebrow}
              </AppText>
            </View>
          )}
          <AppText variant="largeTitle" accessibilityRole="header">
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="subhead" color={colors.textMuted}>
              {subtitle}
            </AppText>
          )}
        </View>
        {right && <View style={styles.right}>{right}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xl, paddingBottom: spacing.xs },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md },
  texts: { flex: 1, gap: spacing.xs },
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xxs },
  right: { paddingBottom: spacing.xs },
});
