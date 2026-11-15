import type { RiskLevel, Weather } from '@/types';
import { getJson } from './api';

/**
 * Fonte: Open-Meteo (https://open-meteo.com), API pública e gratuita, sem chave.
 * Coordenadas padrão: região da Avenida Paulista, São Paulo.
 */
const DEFAULT_LOCATION = { latitude: -23.5614, longitude: -46.6559 };

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    uv_index: number;
  };
  daily: {
    temperature_2m_max: number[];
  };
}

export async function fetchWeather(
  latitude = DEFAULT_LOCATION.latitude,
  longitude = DEFAULT_LOCATION.longitude,
): Promise<Weather> {
  const url =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,apparent_temperature,uv_index' +
    '&daily=temperature_2m_max' +
    '&timezone=America%2FSao_Paulo&forecast_days=1';

  const data = await getJson<OpenMeteoResponse>(url);

  return {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    uvIndex: Math.round(data.current.uv_index),
    maxToday: Math.round(data.daily.temperature_2m_max[0]),
    updatedAt: data.current.time,
  };
}

/** Regra simples de risco baseada na sensação térmica. */
export function getRiskLevel(weather: Weather): RiskLevel {
  const reference = Math.max(weather.feelsLike, weather.temperature);
  if (reference >= 35) return 'perigo';
  if (reference >= 30) return 'atencao';
  return 'baixo';
}

/** Classificação do índice UV segundo a OMS, em linguagem simples. */
export function getUvLabel(uv: number): string {
  if (uv <= 2) return 'Baixo';
  if (uv <= 5) return 'Moderado';
  if (uv <= 7) return 'Alto';
  if (uv <= 10) return 'Muito alto';
  return 'Extremo';
}

export const riskInfo: Record<RiskLevel, { label: string; tip: string }> = {
  baixo: {
    label: 'Risco baixo',
    tip: 'Dia tranquilo. Mesmo assim, leve uma garrafa de água.',
  },
  atencao: {
    label: 'Atenção ao calor',
    tip: 'Beba água a cada 20 minutos e procure sombra.',
  },
  perigo: {
    label: 'Perigo: calor forte',
    tip: 'Evite o sol entre 10h e 16h. Beba água mesmo sem sede.',
  },
};
