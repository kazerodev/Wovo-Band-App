import { Stack } from 'expo-router';
import { C } from '@/constants/colors';
import { JapaneseProvider } from '@/context/JapaneseContext';

const OPT = {
  headerStyle:      { backgroundColor: C.bg2 },
  headerTintColor:  C.text,
  headerTitleStyle: { fontWeight: '600' as const },
  contentStyle:     { backgroundColor: C.bg },
  animation:        'slide_from_right' as const,
};

export default function JapaneseLayout() {
  return (
    <JapaneseProvider>
      <Stack screenOptions={OPT}>
        <Stack.Screen name="index"       options={{ title: '日本語 · Japonés' }} />
        <Stack.Screen name="hiragana"    options={{ title: 'Hiragana · ひらがな' }} />
        <Stack.Screen name="katakana"    options={{ title: 'Katakana · カタカナ' }} />
        <Stack.Screen name="vocabulary"  options={{ title: 'Vocabulario · 語彙' }} />
        <Stack.Screen name="flashcards"  options={{ title: 'Fichas · フラッシュカード' }} />
        <Stack.Screen name="phrases"     options={{ title: 'Frases · フレーズ' }} />
        <Stack.Screen name="quiz"        options={{ title: 'Quiz · クイズ' }} />
      </Stack>
    </JapaneseProvider>
  );
}
