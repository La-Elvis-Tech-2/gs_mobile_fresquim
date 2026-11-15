import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/theme';
import type { PointStatus } from '@/types';
import { AppText } from './AppText';

interface Props {
  status: PointStatus;
  /** "soft" mostra uma pílula com fundo; "plain" mostra só o ponto e o texto. */
  appearance?: 'soft' | 'plain';
}

export function StatusBadge({ status, appearance = 'plain' }: Props) {
  const ok = status === 'funcionando';
  const color = ok ? colors.success : colors.danger;
  const label = ok ? 'Funcionando' : 'Com problema';

  return (
    <View
      style={[
        styles.row,
        appearance === 'soft' && [styles.soft, { backgroundColor: ok ? colors.successSoft : colors.dangerSoft }],
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <AppText variant="caption" color={color}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2, alignSelf: 'flex-start' },
  soft: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs + 1, borderRadius: radius.pill },
  dot: { width: 8, height: 8, borderRadius: radius.pill },
});
