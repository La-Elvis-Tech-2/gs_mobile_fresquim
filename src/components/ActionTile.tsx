import { Pressable, StyleSheet, View } from 'react-native';
import { colors, iconSize, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { IconCircle } from './IconCircle';
import { Icon, type IconName } from './icons/Icon';

interface Props {
  icon: IconName;
  title: string;
  description: string;
  onPress: () => void;
  color?: string;
  soft?: string;
}

/** Atalho em card (inspirado nos botões de ação do apoito). */
export function ActionTile({ icon, title, description, onPress, color = colors.text, soft = colors.borderStrong }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={description}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <IconCircle icon={icon} size={44} background={soft} color={color} variant="bold" />
        <Icon name="alt-arrow-right" size={iconSize.sm} color={colors.textMuted} />
      </View>
      <AppText variant="headline">{title}</AppText>
      <AppText variant="subhead" color={colors.textMuted}>
        {description}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  pressed: { backgroundColor: colors.surfaceMuted, transform: [{ scale: 0.98 }] },
});
