import { Tabs } from 'expo-router';
import { TabBar } from '@/components/TabBar';
import { colors } from '@/theme';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.background } }}
    >
      <Tabs.Screen name="index" options={{ title: 'Hoje', tabBarAccessibilityLabel: 'Hoje: calor e dicas' }} />
      <Tabs.Screen name="pontos" options={{ title: 'Pontos', tabBarAccessibilityLabel: 'Pontos de água e sombra' }} />
      <Tabs.Screen name="registrar" options={{ title: 'Avisar', tabBarAccessibilityLabel: 'Fazer um aviso' }} />
      <Tabs.Screen name="historico" options={{ title: 'Meus avisos', tabBarAccessibilityLabel: 'Meus avisos e favoritos' }} />
    </Tabs>
  );
}
