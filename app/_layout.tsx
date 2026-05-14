import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

const HEADER = {
  headerStyle:      { backgroundColor: C.bg2 },
  headerTintColor:  C.text,
  headerTitleStyle: { fontWeight: '600' as const },
  contentStyle:     { backgroundColor: C.bg },
  animation:        'slide_from_right' as const,
};

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <Stack screenOptions={HEADER}>
        <Stack.Screen name="(tabs)"    options={{ headerShown: false }} />
        {/* Health detail screens */}
        <Stack.Screen name="sleep"     options={{ title: 'Sleep' }} />
        <Stack.Screen name="heartrate" options={{ title: 'Heart Rate' }} />
        <Stack.Screen name="hrv"       options={{ title: 'HRV & Recovery' }} />
        {/* More stack screens */}
        <Stack.Screen name="shop"     options={{ title: 'Shop' }} />
        <Stack.Screen name="goals"    options={{ title: 'My Goals' }} />
        <Stack.Screen name="profile"  options={{ title: 'My Profile' }} />
        <Stack.Screen name="faq"      options={{ title: 'FAQ' }} />
        <Stack.Screen name="legal"    options={{ title: 'Privacy & Terms' }} />
        <Stack.Screen name="settings" options={{ title: 'Language' }} />
      </Stack>
    </LanguageProvider>
  );
}
