import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/theme';
import { Icon, type IconName } from './icons/Icon';

interface Props {
  icon: IconName;
  size?: number;
  background?: string;
  color?: string;
  variant?: 'linear' | 'bold';
}

/** Ícone dentro de um círculo suave (padrão visual dos cards). */
export function IconCircle({ icon, size = 48, background = colors.surfaceMuted, color = colors.text, variant = 'linear' }: Props) {
  return (
    <View style={[styles.circle, { width: size, height: size, backgroundColor: background }]}>
      <Icon name={icon} size={Math.round(size * 0.46)} color={color} variant={variant} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
});
