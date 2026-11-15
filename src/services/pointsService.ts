import type { HydrationPoint, PointType } from '@/types';
import pointsData from '@/data/points.json';

/**
 * Fonte: dados simulados (mock) em src/data/points.json.
 * Os endereços são de locais públicos, mas status e horários são fictícios.
 * O atraso imita uma chamada de rede para exibir o estado de carregamento.
 */
const MOCK_DELAY_MS = 800;

/** Mude para true para testar a tela de erro. */
const SIMULATE_ERROR = false;

const points = pointsData as HydrationPoint[];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchPoints(type?: PointType): Promise<HydrationPoint[]> {
  await wait(MOCK_DELAY_MS);
  if (SIMULATE_ERROR) {
    throw new Error('Não foi possível carregar os pontos. Tente de novo.');
  }
  return type ? points.filter((p) => p.type === type) : points;
}

export async function fetchPointById(id: string): Promise<HydrationPoint | null> {
  await wait(MOCK_DELAY_MS / 2);
  return points.find((p) => p.id === id) ?? null;
}

/** Busca simples por nome, endereço ou bairro (sem diferenciar acentos). */
export function matchesSearch(point: HydrationPoint, query: string): boolean {
  const normalize = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase();
  const q = normalize(query.trim());
  if (!q) return true;
  return [point.name, point.address, point.neighborhood].some((field) => normalize(field).includes(q));
}
