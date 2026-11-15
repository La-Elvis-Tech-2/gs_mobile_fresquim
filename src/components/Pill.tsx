import { Pressable, StyleSheet } from 'react-native';
import { colors, iconSize, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './icons/Icon';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
}

/** Filtro em pílula: escuro quando selecionado, claro quando não. */
export function Pill({ label, selected, onPress, icon }: Props) {
  const fg = selected ? colors.textOnDark : colors.text;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected, checked: selected }}
      hitSlop={{ top: 2, bottom: 2 }}
      style={({ pressed }) => [styles.pill, selected && styles.selected, pressed && styles.pressed]}
    >
      {icon && <Icon name={icon} size={iconSize.sm} color={fg} variant={selected ? 'bold' : 'linear'} />}
      <AppText variant="callout" color={fg}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { transform: [{ scale: 0.97 }] },
});
