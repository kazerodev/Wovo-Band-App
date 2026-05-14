import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: C.bg2 },
          headerTintColor: C.text,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: C.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ title: 'FAQ' }} />
        <Stack.Screen name="legal" options={{ title: 'Legal' }} />
        <Stack.Screen name="settings" options={{ title: 'Language' }} />
      </Stack>
    </LanguageProvider>
  );
}
