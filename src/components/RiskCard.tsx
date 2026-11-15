import { StyleSheet, View } from 'react-native';
import { getRiskLevel, riskInfo } from '@/services/weatherService';
import { colors, iconSize, radius, shadow, spacing } from '@/theme';
import type { RiskLevel, Weather } from '@/types';
import { AppText } from './AppText';
import { GradientFill } from './GradientFill';
import { IconCircle } from './IconCircle';
import { Icon, type IconName } from './icons/Icon';
import { Skeleton } from './Skeleton';

const riskStyle: Record<RiskLevel, { color: string; soft: string; icon: IconName }> = {
  baixo: { color: colors.riskLow, soft: colors.riskLowSoft, icon: 'shield-check' },
  atencao: { color: colors.riskMedium, soft: colors.riskMediumSoft, icon: 'danger-triangle' },
  perigo: { color: colors.riskHigh, soft: colors.riskHighSoft, icon: 'flame' },
};

/** Card principal da tela inicial: temperatura grande + nível de risco (cor, ícone e texto). */
export function RiskCard({ weather }: { weather: Weather }) {
  const level = getRiskLevel(weather);
  const info = riskInfo[level];
  const style = riskStyle[level];

  const a11y =
    `Agora faz ${weather.temperature} graus, sensação de ${weather.feelsLike} graus. ` +
    `${info.label}. ${info.tip}`;

  return (
    <View style={styles.card} accessible accessibilityLabel={a11y}>
      <GradientFill from={style.soft} to={colors.surface} />

      <View style={styles.badge}>
        <Icon name={style.icon} variant="bold" size={iconSize.sm} color={style.color} />
        <AppText variant="callout" color={style.color}>
          {info.label}
        </AppText>
      </View>

      <View style={styles.tempRow}>
        <AppText variant="display">{weather.temperature}°</AppText>
        <AppText variant="subhead" color={colors.textMuted} style={styles.tempCaption}>
          Sensação{'\n'}de {weather.feelsLike}°
        </AppText>
      </View>

      <View style={styles.divider} />

      <View style={styles.tip}>
        <IconCircle icon="lightbulb" size={44} background={style.soft} color={style.color} variant="bold" />
        <AppText variant="bodyMedium" style={styles.tipText}>
          {info.tip}
        </AppText>
      </View>
    </View>
  );
}

export function RiskCardSkeleton() {
  return (
    <View style={[styles.card, styles.skeletonCard]} accessible accessibilityLabel="Carregando a temperatura">
      <Skeleton width={150} height={36} rounded={radius.pill} />
      <Skeleton width={160} height={76} rounded={radius.md} />
      <View style={styles.divider} />
      <View style={styles.tip}>
        <Skeleton width={40} height={40} rounded={20} />
        <View style={styles.tipText}>
          <Skeleton width="90%" height={16} />
          <Skeleton width="60%" height={16} style={{ marginTop: spacing.sm }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    gap: spacing.lg,
    overflow: 'hidden',
    ...shadow.card,
  },
  skeletonCard: { backgroundColor: colors.surface },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs + 2,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  tempRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.lg },
  tempCaption: { paddingBottom: spacing.md },
  divider: { height: 1.5, backgroundColor: colors.border, borderRadius: 1 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  tipText: { flex: 1 },
});
