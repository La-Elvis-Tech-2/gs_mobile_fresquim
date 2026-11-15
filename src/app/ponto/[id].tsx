import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { GradientFill } from '@/components/GradientFill';
import { IconButton } from '@/components/IconButton';
import { IconCircle } from '@/components/IconCircle';
import { Icon, type IconName } from '@/components/icons/Icon';
import { StateView } from '@/components/StateView';
import { StatusBadge } from '@/components/StatusBadge';
import { pointTypeMeta } from '@/constants/pointTypes';
import { addFavorite, isFavorite, removeFavorite } from '@/database/favoritesRepository';
import { useAsync } from '@/hooks/useAsync';
import { fetchPointById } from '@/services/pointsService';
import { colors, iconSize, radius, screenPadding, spacing } from '@/theme';

export default function PointDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const insets = useSafeAreaInsets();
  const { data: point, loading, error, reload } = useAsync(() => fetchPointById(id), [id]);
  const [favorite, setFavorite] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    isFavorite(db, id).then(setFavorite);
  }, [db, id]);

  async function toggleFavorite() {
    if (!point) return;
    setSaving(true);
    try {
      if (favorite) await removeFavorite(db, point.id);
      else await addFavorite(db, point.id, point.name);
      setFavorite(!favorite);
    } finally {
      setSaving(false);
    }
  }

  const topBar = (
    <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
      <IconButton icon="alt-arrow-left" label="Voltar" onPress={() => router.back()} />
      {point && (
        <IconButton
          icon="star"
          label={favorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          onPress={toggleFavorite}
          active={favorite}
          activeColor={colors.riskMedium}
        />
      )}
    </View>
  );

  if (loading || error || !point) {
    return (
      <View style={styles.base}>
        {topBar}
        {loading && <StateView type="loading" message="Carregando ponto..." />}
        {!loading && error && <StateView type="error" message={error} onRetry={reload} />}
        {!loading && !error && !point && (
          <StateView type="empty" icon="map-point" title="Ponto não encontrado" message="Ele pode ter sido removido." />
        )}
      </View>
    );
  }

  const meta = pointTypeMeta[point.type];

  return (
    <View style={styles.base}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <GradientFill from={meta.soft} to={colors.background} />
          {topBar}
          <View style={styles.heroBody}>
            <IconCircle icon={meta.icon} size={80} background={colors.surface} color={meta.color} variant="bold" />
            <AppText variant="overline" color={meta.color}>
              {meta.label.toUpperCase()}
            </AppText>
            <AppText variant="title" align="center" accessibilityRole="header" style={styles.title}>
              {point.name}
            </AppText>
            <StatusBadge status={point.status} appearance="soft" />
          </View>
        </View>

        <View style={styles.body}>
          <Card style={styles.group}>
            <InfoRow icon="map-point" label="Endereço" value={point.address} detail={point.neighborhood} />
            <View style={styles.hairline} />
            <InfoRow icon="clock-circle" label="Horário" value={point.hours} />
          </Card>

          <View style={[styles.tip, { backgroundColor: meta.soft }]} accessible accessibilityLabel={`Dica: ${meta.tip}`}>
            <Icon name="lightbulb" variant="bold" size={iconSize.md} color={meta.color} />
            <AppText variant="subhead" style={styles.flex}>
              {meta.tip}
            </AppText>
          </View>

          <View style={styles.actions}>
            <Button
              label={favorite ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}
              icon="star"
              iconVariant={favorite ? 'bold' : 'linear'}
              variant={favorite ? 'secondary' : 'primary'}
              onPress={toggleFavorite}
              loading={saving}
              accessibilityHint={favorite ? 'Toque para remover dos favoritos' : undefined}
            />
            <Button
              label="Avisar um problema"
              icon="megaphone"
              variant="outline"
              onPress={() => router.push({ pathname: '/registrar', params: { pointId: point.id, pointName: point.name } })}
              accessibilityHint="Abre o formulário de aviso já com este ponto"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value, detail }: { icon: IconName; label: string; value: string; detail?: string }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}${detail ? `, ${detail}` : ''}`}>
      <IconCircle icon={icon} size={40} />
      <View style={styles.flex}>
        <AppText variant="caption" color={colors.textMuted}>
          {label}
        </AppText>
        <AppText variant="bodyMedium">{value}</AppText>
        {detail && (
          <AppText variant="subhead" color={colors.textMuted}>
            {detail}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xxxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.sm,
  },
  hero: { overflow: 'hidden', paddingBottom: spacing.xxl },
  heroBody: { alignItems: 'center', gap: spacing.sm, paddingHorizontal: screenPadding, paddingTop: spacing.md },
  title: { marginBottom: spacing.xs },
  body: { paddingHorizontal: screenPadding, gap: spacing.lg },
  group: { gap: spacing.lg },
  hairline: { height: 1.5, backgroundColor: colors.border, marginLeft: 52 },
  row: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  flex: { flex: 1 },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  actions: { gap: spacing.md, marginTop: spacing.xs },
});
