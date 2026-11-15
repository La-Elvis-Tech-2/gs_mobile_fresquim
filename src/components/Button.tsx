import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { colors, iconSize, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './icons/Icon';

type Variant = 'primary' | 'secondary' | 'outline';

interface Props {
  label: string;
  onPress: () => void;
  icon?: IconName;
  iconVariant?: 'linear' | 'bold';
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  accessibilityHint?: string;
}

const palette: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: colors.primary, fg: colors.textOnDark, border: colors.primary },
  secondary: { bg: colors.surfaceMuted, fg: colors.text, border: colors.surfaceMuted },
  outline: { bg: colors.surface, fg: colors.text, border: colors.borderStrong },
};

/** Botão em pílula, no estilo do painel apoito: escuro, suave ou contornado. */
export function Button({
  label,
  onPress,
  icon,
  iconVariant = 'linear',
  variant = 'primary',
  disabled,
  loading,
  accessibilityHint,
}: Props) {
  const p = palette[variant];
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: pressed && variant === 'primary' ? colors.primaryPressed : p.bg, borderColor: p.border },
        pressed && styles.pressed,
        inactive && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={p.fg} />
      ) : (
        <View style={styles.content}>
          {icon && <Icon name={icon} variant={iconVariant} size={iconSize.md} color={p.fg} />}
          <AppText variant="callout" color={p.fg}>
            {label}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.pill,
    borderWidth: 2,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  pressed: { transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
});
