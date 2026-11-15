import { Text, type TextProps, type TextStyle } from 'react-native';
import { colors, typography, type TypographyVariant } from '@/theme';

interface Props extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle['textAlign'];
}

/** Texto padrão do app: fonte, tamanho e cor sempre vêm do tema. */
export function AppText({ variant = 'body', color = colors.text, align, style, ...rest }: Props) {
  return <Text style={[typography[variant], { color }, align ? { textAlign: align } : null, style]} {...rest} />;
}
