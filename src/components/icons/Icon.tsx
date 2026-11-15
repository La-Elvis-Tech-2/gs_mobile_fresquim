import { View } from 'react-native';
import { colors, iconSize } from '@/theme';
import { iconRegistry, type IconName } from './registry';

export type { IconName };

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  /** "linear" (traço) é o padrão; "bold" (preenchido) indica estado ativo. */
  variant?: 'linear' | 'bold';
  strokeWidth?: number;
}

/** Ícone Solar decorativo (o texto ao lado é quem descreve a ação para o leitor de tela). */
export function Icon({ name, size = iconSize.md, color = colors.text, variant = 'linear', strokeWidth = 1.6 }: Props) {
  const Component = iconRegistry[name][variant];
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" pointerEvents="none">
      <Component size={size} color={color} strokeWidth={strokeWidth} />
    </View>
  );
}
