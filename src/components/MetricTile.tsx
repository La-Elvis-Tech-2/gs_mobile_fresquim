import { StyleSheet, View } from 'react-native';
import { colors, iconSize, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { GradientFill } from './GradientFill';
import { Icon, type IconName } from './icons/Icon';
import { Skeleton } from './Skeleton';

interface Props {
  icon: IconName;
  label: string;
  value: string;
  detail?: string;
  accessibilityLabel?: string;
}

/** Pequeno card de métrica (inspirado no MetricCard do apoito: gradiente quente + ícone em círculo branco). */
export function MetricTile({ icon, label, value, detail, accessibilityLabel }: Props) {
  return (
    <View style={styles.tile} accessible accessibilityLabel={accessibilityLabel ?? `${label}: ${value}${detail ? `, ${detail}` : ''}`}>
      <GradientFill from={colors.surfaceWarm} to={colors.surface} />
      <View style={styles.iconCircle}>
        <Icon name={icon} size={iconSize.sm} color={colors.text} />
      </View>
      <AppText variant="caption" color={colors.textMuted} numberOfLines={1}>
        {label}
      </AppText>
      <AppText variant="title">{value}</AppText>
      {detail && (
        <AppText variant="caption" color={colors.textMuted} numberOfLines={1}>
          {detail}
        </AppText>
      )}
    </View>
  );
}

export function MetricTileSkeleton() {
  return (
    <View style={styles.tile}>
      <Skeleton width={36} height={36} rounded={18} />
      <Skeleton width="70%" height={14} />
      <Skeleton width="50%" height={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    padding: spacing.md + 2,
    gap: spacing.xs,
    overflow: 'hidden',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
});
