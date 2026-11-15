import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Pill } from '@/components/Pill';
import { PointCard, PointCardSkeleton } from '@/components/PointCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SearchField } from '@/components/SearchField';
import { StateView } from '@/components/StateView';
import { pointTypeMeta } from '@/constants/pointTypes';
import { useAsync } from '@/hooks/useAsync';
import { fetchPoints, matchesSearch } from '@/services/pointsService';
import { colors, screenPadding, spacing } from '@/theme';
import type { PointType } from '@/types';

const filters: (PointType | undefined)[] = [undefined, 'bebedouro', 'sombra', 'ubs', 'estacao'];

export default function PointsScreen() {
  const [type, setType] = useState<PointType | undefined>(undefined);
  const [query, setQuery] = useState('');
  const { data: points, loading, error, reload } = useAsync(() => fetchPoints(type), [type]);

  const visible = useMemo(() => (points ?? []).filter((p) => matchesSearch(p, query)), [points, query]);

  const subtitle = loading
    ? 'Procurando pontos perto de você...'
    : `${visible.length} ${visible.length === 1 ? 'ponto encontrado' : 'pontos encontrados'}`;

  return (
    <FlatList
      style={styles.base}
      contentContainerStyle={styles.content}
      data={loading || error ? [] : visible}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <ScreenHeader title="Água e sombra" subtitle={subtitle} />
          <SearchField
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nome ou bairro"
            accessibilityLabel="Buscar ponto por nome ou bairro"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersBar}
            contentContainerStyle={styles.filters}
            accessibilityRole="radiogroup"
            accessibilityLabel="Filtrar por tipo de ponto"
          >
            {filters.map((f) => (
              <Pill
                key={f ?? 'todos'}
                label={f ? pointTypeMeta[f].plural : 'Todos'}
                icon={f ? pointTypeMeta[f].icon : undefined}
                selected={type === f}
                onPress={() => setType(f)}
              />
            ))}
          </ScrollView>
        </View>
      }
      renderItem={({ item }) => (
        <PointCard point={item} onPress={() => router.push({ pathname: '/ponto/[id]', params: { id: item.id } })} />
      )}
      ListEmptyComponent={
        loading ? (
          <View style={styles.skeletons} accessible accessibilityLabel="Carregando pontos">
            {[0, 1, 2, 3].map((i) => (
              <PointCardSkeleton key={i} />
            ))}
          </View>
        ) : error ? (
          <StateView type="error" title="Não deu para carregar" message={error} onRetry={reload} />
        ) : (
          <StateView
            type="empty"
            icon="magnifier"
            title="Nenhum ponto encontrado"
            message="Tente outro nome ou veja todos os tipos de ponto."
            actionLabel="Limpar filtros"
            onAction={() => {
              setType(undefined);
              setQuery('');
            }}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: screenPadding, paddingBottom: spacing.xxxl, flexGrow: 1 },
  header: { gap: spacing.lg, marginBottom: spacing.lg },
  filtersBar: { marginHorizontal: -screenPadding, flexGrow: 0 },
  filters: { gap: spacing.sm, paddingHorizontal: screenPadding },
  separator: { height: spacing.md },
  skeletons: { gap: spacing.md },
});
