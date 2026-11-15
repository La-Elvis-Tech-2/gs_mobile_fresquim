import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, iconSize, radius, spacing } from '@/theme';
import { AppText } from './AppText';
import { Icon, type IconName } from './icons/Icon';

const tabIcons: Record<string, IconName> = {
  index: 'sun-2',
  pontos: 'map-point',
  registrar: 'megaphone',
  historico: 'history',
};

/** Barra de abas própria: ícone preenchido + pílula suave na aba ativa (estilo do menu do apoito). */
export function TabBar({ state, descriptors, emitter, navigateToTab, insets }: BottomTabBarProps) {
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]} accessibilityRole="tablist">
      {state.routes.map((route, index) => {
        const focused = index === state.index;
        const { options } = descriptors[route.key];
        const label = typeof options.title === 'string' ? options.title : route.name;
        const color = focused ? colors.text : colors.textMuted;

        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            accessibilityState={{ selected: focused }}
            style={styles.item}
          >
            <View style={[styles.iconPill, focused && styles.iconPillActive]}>
              <Icon name={tabIcons[route.name] ?? 'sun-2'} size={iconSize.lg - 2} color={color} variant={focused ? 'bold' : 'linear'} />
            </View>
            <AppText variant="caption" color={color}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1.5,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  item: { flex: 1, alignItems: 'center', gap: spacing.xxs, minHeight: 56, justifyContent: 'center' },
  iconPill: { width: 60, height: 34, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  iconPillActive: { backgroundColor: colors.surfaceMuted },
});
