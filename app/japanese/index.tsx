import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/constants/colors';

const MODULES = [
  {
    route: '/japanese/hiragana',
    kana: 'あ',
    title: 'Hiragana',
    sub: '46 caracteres · alfabeto básico',
    color: C.pri,
  },
  {
    route: '/japanese/katakana',
    kana: 'ア',
    title: 'Katakana',
    sub: '46 caracteres · palabras extranjeras',
    color: C.accent,
  },
  {
    route: '/japanese/vocabulary',
    kana: '語',
    title: 'Vocabulario',
    sub: '70+ palabras esenciales',
    color: '#F59E0B',
  },
  {
    route: '/japanese/phrases',
    kana: '話',
    title: 'Frases',
    sub: '20 frases para viajar',
    color: C.success,
  },
  {
    route: '/japanese/quiz',
    kana: '？',
    title: 'Quiz',
    sub: 'Pon a prueba tu memoria',
    color: C.danger,
  },
];

export default function JapaneseHub() {
  const router = useRouter();
  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <Text style={s.heroKana}>日本語</Text>
        <Text style={s.heroTitle}>Aprende japonés</Text>
        <Text style={s.heroSub}>Pensado para hispanohablantes</Text>
      </View>

      <View style={s.tip}>
        <Ionicons name="bulb-outline" size={16} color={C.pri} style={{ marginRight: 8 }} />
        <Text style={s.tipText}>
          Los sonidos del japonés son casi idénticos al español: a, i, u, e, o.
        </Text>
      </View>

      {MODULES.map((m) => (
        <TouchableOpacity
          key={m.route}
          style={s.card}
          onPress={() => router.push(m.route as any)}
          activeOpacity={0.75}
        >
          <View style={[s.kanaBox, { backgroundColor: m.color + '22' }]}>
            <Text style={[s.kanaChar, { color: m.color }]}>{m.kana}</Text>
          </View>
          <View style={s.cardBody}>
            <Text style={s.cardTitle}>{m.title}</Text>
            <Text style={s.cardSub}>{m.sub}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={C.muted} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:     { backgroundColor: C.bg },
  content:    { padding: 16, paddingBottom: 48, gap: 10 },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 4,
  },
  heroKana:  { fontSize: 56, color: C.pri, fontWeight: '700', letterSpacing: 12 },
  heroTitle: { fontSize: 20, color: C.text, fontWeight: '700', marginTop: 10 },
  heroSub:   { fontSize: 14, color: C.muted2, marginTop: 4 },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.pri + '18',
    borderRadius: 10,
    padding: 12,
    marginBottom: 4,
  },
  tipText: { flex: 1, fontSize: 13, color: C.muted2, lineHeight: 18 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    gap: 12,
  },
  kanaBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kanaChar:  { fontSize: 28, fontWeight: '700' },
  cardBody:  { flex: 1 },
  cardTitle: { fontSize: 16, color: C.text, fontWeight: '600' },
  cardSub:   { fontSize: 13, color: C.muted2, marginTop: 2 },
});
