import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ActionTile } from '@/components/ActionTile';
import { AppText } from '@/components/AppText';
import { Brand } from '@/components/Brand';
import { IconButton } from '@/components/IconButton';
import { MetricTile, MetricTileSkeleton } from '@/components/MetricTile';
import { RiskCard, RiskCardSkeleton } from '@/components/RiskCard';
import { Screen } from '@/components/Screen';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionTitle } from '@/components/SectionTitle';
import { StateView } from '@/components/StateView';
import { useAsync } from '@/hooks/useAsync';
import { fetchWeather, getUvLabel } from '@/services/weatherService';
import { colors, spacing } from '@/theme';
import { formatTime, greeting } from '@/utils/format';

export default function HomeScreen() {
  const { data: weather, loading, error, reload } = useAsync(() => fetchWeather());

  return (
    <Screen>
      <ScreenHeader
        top={
          <>
            <Brand />
            <IconButton icon="refresh" label="Atualizar temperatura" onPress={reload} />
          </>
        }
        eyebrow="Av. Paulista · São Paulo"
        eyebrowIcon="map-point"
        title={greeting()}
        subtitle="Veja o calor de hoje e cuide-se."
      />

      {loading && (
        <>
          <RiskCardSkeleton />
          <View style={styles.row}>
            <MetricTileSkeleton />
            <MetricTileSkeleton />
            <MetricTileSkeleton />
          </View>
        </>
      )}

      {!loading && error && (
        <StateView type="error" title="Sem dados do tempo" message={error} onRetry={reload} />
      )}

      {!loading && !error && weather && (
        <>
          <RiskCard weather={weather} />
          <View style={styles.row}>
            <MetricTile icon="temperature" label="Sensação" value={`${weather.feelsLike}°`} />
            <MetricTile icon="flame" label="Máxima" value={`${weather.maxToday}°`} />
            <MetricTile icon="sun" label="Raio UV" value={String(weather.uvIndex)} detail={getUvLabel(weather.uvIndex)} />
          </View>
          <AppText variant="caption" color={colors.textMuted} align="center">
            Atualizado às {formatTime(weather.updatedAt)} · Fonte: Open-Meteo
          </AppText>
        </>
      )}

      <SectionTitle title="Atalhos" />
      <View style={styles.row}>
        <ActionTile
          icon="waterdrop"
          title="Água perto"
          description="Bebedouros e sombra"
          color={colors.water}
          soft={colors.waterSoft}
          onPress={() => router.push('/pontos')}
        />
        <ActionTile
          icon="megaphone"
          title="Fazer aviso"
          description="Algo quebrado?"
          color={colors.riskMedium}
          soft={colors.riskMediumSoft}
          onPress={() => router.push('/registrar')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
});
