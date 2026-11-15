import { Pressable, StyleSheet } from 'react-native';
import { colors, iconSize, radius } from '@/theme';
import { Icon, type IconName } from './icons/Icon';

interface Props {
  icon: IconName;
  label: string;
  onPress: () => void;
  active?: boolean;
  activeColor?: string;
}

/** Botão redondo só com ícone (voltar, atualizar, favoritar, apagar). */
export function IconButton({ icon, label, onPress, active, activeColor = colors.text }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={active !== undefined ? { selected: active } : undefined}
      hitSlop={4}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Icon
        name={icon}
        size={iconSize.md}
        variant={active ? 'bold' : 'linear'}
        color={active ? activeColor : colors.text}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.surfaceMuted, transform: [{ scale: 0.95 }] },
});
