import { StyleSheet, View } from 'react-native';
import { pointTypeMeta } from '@/constants/pointTypes';
import { colors, iconSize, spacing } from '@/theme';
import type { HydrationPoint } from '@/types';
import { AppText } from './AppText';
import { Card } from './Card';
import { IconCircle } from './IconCircle';
import { Icon } from './icons/Icon';
import { Skeleton } from './Skeleton';
import { StatusBadge } from './StatusBadge';

interface Props {
  point: HydrationPoint;
  onPress: () => void;
}

export function PointCard({ point, onPress }: Props) {
  const meta = pointTypeMeta[point.type];
  const statusText = point.status === 'funcionando' ? 'funcionando' : 'com problema';

  return (
    <Card
      onPress={onPress}
      style={styles.card}
      accessibilityLabel={`${meta.label}: ${point.name}, ${point.neighborhood}, ${statusText}`}
      accessibilityHint="Abre os detalhes do ponto"
    >
      <IconCircle icon={meta.icon} background={meta.soft} color={meta.color} size={52} variant="bold" />
      <View style={styles.info}>
        <AppText variant="headline" numberOfLines={2}>
          {point.name}
        </AppText>
        <AppText variant="subhead" color={colors.textMuted} numberOfLines={1}>
          {meta.label} · {point.neighborhood}
        </AppText>
        <StatusBadge status={point.status} />
      </View>
      <Icon name="alt-arrow-right" size={iconSize.md} color={colors.textMuted} />
    </Card>
  );
}

export function PointCardSkeleton() {
  return (
    <Card style={styles.card}>
      <Skeleton width={52} height={52} rounded={26} />
      <View style={styles.info}>
        <Skeleton width="80%" height={18} />
        <Skeleton width="55%" height={14} />
        <Skeleton width={96} height={14} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.lg },
  info: { flex: 1, gap: spacing.xs },
});
