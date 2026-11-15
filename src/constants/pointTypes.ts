import type { IconName } from '@/components/icons/Icon';
import { colors } from '@/theme';
import type { PointType } from '@/types';

interface PointTypeMeta {
  label: string;
  plural: string;
  icon: IconName;
  color: string;
  soft: string;
  tip: string;
}

/** Visual e textos de cada tipo de ponto. */
export const pointTypeMeta: Record<PointType, PointTypeMeta> = {
  bebedouro: {
    label: 'Bebedouro',
    plural: 'Água',
    icon: 'waterdrop',
    color: colors.water,
    soft: colors.waterSoft,
    tip: 'Leve uma garrafa para encher e beba água mesmo sem sede.',
  },
  sombra: {
    label: 'Sombra',
    plural: 'Sombra',
    icon: 'tree',
    color: colors.shade,
    soft: colors.shadeSoft,
    tip: 'Bom lugar para descansar nas horas mais quentes do dia.',
  },
  ubs: {
    label: 'Posto de saúde',
    plural: 'Saúde',
    icon: 'medical-kit',
    color: colors.health,
    soft: colors.healthSoft,
    tip: 'Procure atendimento se sentir tontura, dor de cabeça ou enjoo.',
  },
  estacao: {
    label: 'Estação',
    plural: 'Estações',
    icon: 'tram',
    color: colors.transit,
    soft: colors.transitSoft,
    tip: 'Local coberto, com sombra, para se proteger do sol.',
  },
};
