import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, iconSize, radius, spacing, typography } from '@/theme';
import { Icon } from './icons/Icon';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}

/** Campo de busca em pílula, com botão de limpar. */
export function SearchField({ value, onChangeText, placeholder, accessibilityLabel }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.field, focused && styles.focused]}>
      <Icon name="magnifier" size={iconSize.md} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        returnKeyType="search"
        accessibilityLabel={accessibilityLabel}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" accessibilityLabel="Limpar busca" hitSlop={12}>
          <Icon name="close-circle" size={iconSize.md} color={colors.textMuted} variant="bold" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  focused: { borderColor: colors.accent },
  input: { flex: 1, ...typography.body, color: colors.text, paddingVertical: spacing.sm },
});
