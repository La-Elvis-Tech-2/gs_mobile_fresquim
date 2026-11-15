import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { colors, screenPadding, spacing } from '@/theme';

interface Props {
  children: ReactNode;
}

/** Container rolável padrão das telas (fundo, margens e espaçamento entre blocos). */
export function Screen({ children }: Props) {
  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
    flexGrow: 1,
  },
});
