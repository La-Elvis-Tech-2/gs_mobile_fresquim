import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from './AppText';

interface Props {
  title: string;
  detail?: string;
}

export function SectionTitle({ title, detail }: Props) {
  return (
    <View style={styles.row}>
      <AppText variant="headline" accessibilityRole="header">
        {title}
      </AppText>
      {detail && (
        <AppText variant="caption" color={colors.textMuted}>
          {detail}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: -spacing.sm },
});
