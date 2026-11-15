import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { IconCircle } from './IconCircle';
import type { IconName } from './icons/Icon';

type Props =
  | { type: 'loading'; message?: string }
  | { type: 'error'; title?: string; message: string; onRetry?: () => void }
  | { type: 'empty'; icon?: IconName; title: string; message?: string; actionLabel?: string; onAction?: () => void };

/** Estados padronizados de carregamento, erro e lista vazia. */
export function StateView(props: Props) {
  if (props.type === 'loading') {
    const message = props.message ?? 'Carregando...';
    return (
      <View style={styles.container} accessible accessibilityLabel={message} accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={colors.text} />
        <AppText variant="subhead" color={colors.textMuted} align="center">
          {message}
        </AppText>
      </View>
    );
  }

  if (props.type === 'error') {
    return (
      <View style={styles.container}>
        <IconCircle icon="cloud-cross" size={72} background={colors.dangerSoft} color={colors.danger} />
        <View style={styles.texts}>
          <AppText variant="headline" align="center" accessibilityRole="alert">
            {props.title ?? 'Algo deu errado'}
          </AppText>
          <AppText variant="subhead" color={colors.textMuted} align="center">
            {props.message}
          </AppText>
        </View>
        {props.onRetry && <Button label="Tentar de novo" icon="refresh" variant="outline" onPress={props.onRetry} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <IconCircle icon={props.icon ?? 'inbox'} size={72} background={colors.surfaceWarm} color={colors.textMuted} />
      <View style={styles.texts}>
        <AppText variant="headline" align="center">
          {props.title}
        </AppText>
        {props.message && (
          <AppText variant="subhead" color={colors.textMuted} align="center">
            {props.message}
          </AppText>
        )}
      </View>
      {props.actionLabel && props.onAction && (
        <Button label={props.actionLabel} variant="outline" onPress={props.onAction} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
  },
  texts: { gap: spacing.xs, alignItems: 'center', maxWidth: 300 },
});
