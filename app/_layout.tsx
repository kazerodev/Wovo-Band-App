import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider, useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

const HEADER_OPTIONS = {
  headerStyle:      { backgroundColor: C.bg2 },
  headerTintColor:  C.text,
  headerTitleStyle: { fontWeight: '600' as const },
  contentStyle:     { backgroundColor: C.bg },
  animation:        'slide_from_right' as const,
};

// Inner component so useLang works (must be inside LanguageProvider)
function AppStack() {
  const { t } = useLang();
  return (
    <Stack screenOptions={HEADER_OPTIONS}>
      <Stack.Screen name="(tabs)"      options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sleep"      options={{ title: t('sleep_title') }} />
      <Stack.Screen name="heartrate"  options={{ title: t('hr_title') }} />
      <Stack.Screen name="hrv"        options={{ title: t('hrv_title') }} />
      <Stack.Screen name="shop"       options={{ title: t('shop_title') }} />
      <Stack.Screen name="goals"      options={{ title: t('goals_title') }} />
      <Stack.Screen name="profile"    options={{ title: t('profile_title') }} />
      <Stack.Screen name="faq"        options={{ title: t('faq_title') }} />
      <Stack.Screen name="legal"      options={{ title: t('legal_title') }} />
      <Stack.Screen name="settings"   options={{ title: t('lang_title') }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <AppStack />
    </LanguageProvider>
  );
}
