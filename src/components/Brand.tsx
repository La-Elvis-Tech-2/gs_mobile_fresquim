import { Image, StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/theme';
import { AppText } from './AppText';

const logo = require('../../assets/logo/fresquim.png');

interface Props {
  /** Tamanho do mascote em px. */
  size?: number;
}

/** Marca do app: mascote Fresquim (gota) + nome. */
export function Brand({ size = 34 }: Props) {
  return (
    <View style={styles.row} accessible accessibilityRole="image" accessibilityLabel="Fresquim">
      <Image
        source={logo}
        style={[styles.logo, { width: size, height: size, borderRadius: size * 0.3 }]}
      />
      <AppText variant="headline" color={colors.text}>
        Fresquim
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logo: { borderWidth: 1.5, borderColor: colors.border },
});
