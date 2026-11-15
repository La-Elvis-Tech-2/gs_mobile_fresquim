import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/AppText';
import { Card } from '@/components/Card';
import { IconCircle } from '@/components/IconCircle';
import { Icon } from '@/components/icons/Icon';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SegmentedControl } from '@/components/SegmentedControl';
import { StateView } from '@/components/StateView';
import { listFavorites, type Favorite } from '@/database/favoritesRepository';
import { deleteReport, listReports } from '@/database/reportsRepository';
import { colors, iconSize, radius, spacing } from '@/theme';
import type { Report } from '@/types';
import { formatRelative } from '@/utils/format';

type Tab = 'avisos' | 'favoritos';

export default function HistoryScreen() {
  const db = useSQLiteContext();
  const [tab, setTab] = useState<Tab>('avisos');
  const [reports, setReports] = useState<Report[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [r, f] = await Promise.all([listReports(db), listFavorites(db)]);
      setReports(r);
      setFavorites(f);
    } catch {
      setError('Não foi possível ler seus dados salvos.');
    } finally {
      setLoading(false);
    }
  }, [db]);

  // Recarrega sempre que a aba volta a ficar visível.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  function confirmDelete(report: Report) {
    Alert.alert('Apagar aviso?', 'Esse aviso será removido do celular.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await deleteReport(db, report.id);
          load();
        },
      },
    ]);
  }

  return (
    <Screen>
      <ScreenHeader title="Meus avisos" subtitle="Tudo fica guardado no seu celular." />

      <SegmentedControl
        accessibilityLabel="Escolha o que ver"
        value={tab}
        onChange={setTab}
        options={[
          { value: 'avisos', label: `Avisos (${reports.length})` },
          { value: 'favoritos', label: `Favoritos (${favorites.length})` },
        ]}
      />

      {loading && <StateView type="loading" message="Lendo seus dados..." />}
      {!loading && error && <StateView type="error" message={error} onRetry={load} />}

      {!loading && !error && tab === 'avisos' && (
        reports.length === 0 ? (
          <StateView
            type="empty"
            icon="megaphone"
            title="Nenhum aviso ainda"
            message="Viu um bebedouro quebrado ou conhece uma boa sombra? Conte para a gente."
            actionLabel="Fazer um aviso"
            onAction={() => router.navigate('/registrar')}
          />
        ) : (
          <View style={styles.list}>
            {reports.map((r) => (
              <ReportItem key={r.id} report={r} onDelete={() => confirmDelete(r)} />
            ))}
          </View>
        )
      )}

      {!loading && !error && tab === 'favoritos' && (
        favorites.length === 0 ? (
          <StateView
            type="empty"
            icon="star"
            title="Nenhum favorito ainda"
            message="Abra um ponto e toque na estrela para guardar aqui."
            actionLabel="Ver pontos"
            onAction={() => router.navigate('/pontos')}
          />
        ) : (
          <View style={styles.list}>
            {favorites.map((f) => (
              <Card
                key={f.pointId}
                style={styles.favorite}
                onPress={() => router.push({ pathname: '/ponto/[id]', params: { id: f.pointId } })}
                accessibilityLabel={`Favorito: ${f.pointName}`}
                accessibilityHint="Abre os detalhes do ponto"
              >
                <IconCircle icon="star" variant="bold" background={colors.riskMediumSoft} color={colors.riskMedium} />
                <View style={styles.flex}>
                  <AppText variant="headline" numberOfLines={2}>
                    {f.pointName}
                  </AppText>
                  <AppText variant="caption" color={colors.textMuted}>
                    Salvo {formatRelative(f.createdAt).toLowerCase()}
                  </AppText>
                </View>
                <Icon name="alt-arrow-right" size={iconSize.md} color={colors.textMuted} />
              </Card>
            ))}
          </View>
        )
      )}
    </Screen>
  );
}

function ReportItem({ report, onDelete }: { report: Report; onDelete: () => void }) {
  const isProblem = report.kind === 'problema';
  const kindLabel = isProblem ? 'Problema' : 'Ponto novo';
  const color = isProblem ? colors.danger : colors.shade;
  const soft = isProblem ? colors.dangerSoft : colors.shadeSoft;
  const when = formatRelative(report.createdAt);

  return (
    <Card style={styles.report}>
      <View
        style={styles.reportHeader}
        accessible
        accessibilityLabel={`${kindLabel}${report.pointName ? ` em ${report.pointName}` : ''}: ${report.description}. ${when}`}
        accessibilityActions={[{ name: 'delete', label: 'Apagar aviso' }]}
        onAccessibilityAction={onDelete}
      >
        <View style={[styles.kind, { backgroundColor: soft }]}>
          <Icon name={isProblem ? 'danger-triangle' : 'add-circle'} variant="bold" size={iconSize.sm - 2} color={color} />
          <AppText variant="caption" color={color}>
            {kindLabel}
          </AppText>
        </View>
        <AppText variant="caption" color={colors.textMuted}>
          {when}
        </AppText>
      </View>

      {report.pointName && <AppText variant="headline">{report.pointName}</AppText>}
      <AppText variant="body" color={colors.textMuted}>
        {report.description}
      </AppText>

      <Pressable
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel="Apagar aviso"
        style={({ pressed }) => [styles.delete, pressed && styles.deletePressed]}
      >
        <Icon name="trash-bin-minimalistic" size={iconSize.sm} color={colors.danger} />
        <AppText variant="caption" color={colors.danger}>
          Apagar
        </AppText>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: { gap: spacing.md },
  favorite: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  report: { gap: spacing.sm },
  reportHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xxs },
  kind: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    minHeight: 40,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginLeft: -spacing.md,
    borderRadius: radius.pill,
  },
  deletePressed: { backgroundColor: colors.dangerSoft },
});
