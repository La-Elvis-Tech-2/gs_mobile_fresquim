import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface Props {
  from: string;
  to: string;
  /** Opacidade final do gradiente (1 = cor cheia). */
  toOpacity?: number;
}

/** Preenche o container pai com um gradiente vertical suave (usar com overflow: 'hidden'). */
export function GradientFill({ from, to, toOpacity = 1 }: Props) {
  const id = `g${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={from} stopOpacity={1} />
            <Stop offset="1" stopColor={to} stopOpacity={toOpacity} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="1" height="1" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}
