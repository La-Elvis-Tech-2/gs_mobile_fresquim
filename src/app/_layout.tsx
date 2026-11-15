import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { DATABASE_NAME, migrateDbIfNeeded } from '@/database/migrations';
import { colors, fonts } from '@/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [fonts.regular]: require('../../assets/fonts/OpenRunde-Regular.otf'),
    [fonts.medium]: require('../../assets/fonts/OpenRunde-Medium.otf'),
    [fonts.semibold]: require('../../assets/fonts/OpenRunde-Semibold.otf'),
    [fonts.bold]: require('../../assets/fonts/OpenRunde-Bold.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="ponto/[id]" />
      </Stack>
    </SQLiteProvider>
  );
}
