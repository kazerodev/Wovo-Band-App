import React, { useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/constants/colors';
import { HIRAGANA, KATAKANA, VOCABULARY } from '@/constants/japaneseData';
import { useJapanese } from '@/context/JapaneseContext';

const MODULES = [
  { route: '/japanese/hiragana',   kana: 'あ', title: 'Hiragana',    sub: '46 caracteres · alfabeto básico',          color: C.pri },
  { route: '/japanese/katakana',   kana: 'ア', title: 'Katakana',    sub: '46 caracteres · palabras extranjeras',     color: C.accent },
  { route: '/japanese/vocabulary', kana: '語', title: 'Vocabulario', sub: '70+ palabras con fichas de estudio',       color: '#F59E0B' },
  { route: '/japanese/phrases',    kana: '話', title: 'Frases',      sub: '20 frases esenciales de viaje',            color: C.success },
  { route: '/japanese/quiz',       kana: '？', title: 'Quiz',        sub: 'Pon a prueba tu memoria',                  color: C.danger },
];

function dailyWords() {
  const d = new Date();
  let s = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  const indices: number[] = [];
  while (indices.length < 3) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const idx = s % VOCABULARY.length;
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices.map((i) => VOCABULARY[i]);
}

interface StatRowProps { label: string; count: number; total: number; color: string }
function StatRow({ label, count, total, color }: StatRowProps) {
  const pct = total > 0 ? count / total : 0;
  return (
    <View style={sr.row}>
      <Text style={sr.label}>{label}</Text>
      <View style={sr.barBg}>
        <View style={[sr.barFill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={[sr.count, { color }]}>{count}/{total}</Text>
    </View>
  );
}

const sr = StyleSheet.create({
  row:    { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 4 },
  label:  { width: 88, fontSize: 13, color: C.muted2 },
  barBg:  { flex: 1, height: 6, backgroundColor: C.bg, borderRadius: 3, overflow: 'hidden' },
  barFill:{ height: 6, borderRadius: 3 },
  count:  { width: 40, fontSize: 12, fontWeight: '600', textAlign: 'right' },
});

export default function JapaneseHub() {
  const router = useRouter();
  const { studiedHiragana, studiedKatakana, learnedVocab, quizBestScore, quizTotalPlayed } = useJapanese();
  const words = useMemo(() => dailyWords(), []);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <Text style={s.heroKana}>日本語</Text>
        <Text style={s.heroTitle}>Aprende japonés</Text>
        <Text style={s.heroSub}>Pensado para hispanohablantes</Text>
      </View>

      <View style={s.statsCard}>
        <Text style={s.sectionTitle}>Tu progreso</Text>
        <StatRow label="Hiragana"    count={studiedHiragana.length} total={HIRAGANA.length}   color={C.pri} />
        <StatRow label="Katakana"    count={studiedKatakana.length} total={KATAKANA.length}   color={C.accent} />
        <StatRow label="Vocabulario" count={learnedVocab.length}    total={VOCABULARY.length} color="#F59E0B" />
        <View style={sr.row}>
          <Text style={sr.label}>Mejor quiz</Text>
          <View style={{ flex: 1 }} />
          <Text style={[sr.count, { color: C.danger, width: 'auto' }]}>
            {quizBestScore}/10
            {quizTotalPlayed > 0 && <Text style={{ color: C.muted, fontWeight: '400' }}> · {quizTotalPlayed} partidas</Text>}
          </Text>
        </View>
      </View>

      <View style={s.dailyCard}>
        <View style={s.dailyHeader}>
          <Ionicons name="sunny-outline" size={15} color="#F59E0B" />
          <Text style={s.sectionTitle}>Lección del día</Text>
        </View>
        <View style={s.dailyRow}>
          {words.map((w) => (
            <TouchableOpacity
              key={w.jp}
              style={s.dailyWord}
              onPress={() => router.push('/japanese/vocabulary')}
              activeOpacity={0.75}
            >
              <Text style={s.dailyJp}>{w.jp}</Text>
              <Text style={s.dailyRomaji}>{w.romaji}</Text>
              <Text style={s.dailyEs}>{w.es}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.tip}>
        <Ionicons name="bulb-outline" size={15} color={C.pri} />
        <Text style={s.tipText}>Los sonidos del japonés son casi idénticos al español: a, i, u, e, o.</Text>
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
  scroll:       { backgroundColor: C.bg },
  content:      { padding: 16, paddingBottom: 48, gap: 10 },
  hero: {
    alignItems: 'center', paddingVertical: 28,
    backgroundColor: C.card, borderRadius: 16,
    borderWidth: 1, borderColor: C.border, marginBottom: 2,
  },
  heroKana:     { fontSize: 52, color: C.pri, fontWeight: '700', letterSpacing: 12 },
  heroTitle:    { fontSize: 20, color: C.text, fontWeight: '700', marginTop: 8 },
  heroSub:      { fontSize: 13, color: C.muted2, marginTop: 4 },
  statsCard: {
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border, padding: 16, gap: 2,
  },
  sectionTitle: { fontSize: 13, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  dailyCard: {
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border, padding: 16,
  },
  dailyHeader:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  dailyRow:     { flexDirection: 'row', gap: 8 },
  dailyWord: {
    flex: 1, backgroundColor: C.bg, borderRadius: 10,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', padding: 10, gap: 2,
  },
  dailyJp:     { fontSize: 22, color: '#F59E0B', fontWeight: '700' },
  dailyRomaji: { fontSize: 11, color: C.muted2 },
  dailyEs:     { fontSize: 12, color: C.muted2, textAlign: 'center' },
  tip: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.pri + '15', borderRadius: 10, padding: 12,
  },
  tipText: { flex: 1, fontSize: 13, color: C.muted2, lineHeight: 18 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border, padding: 14, gap: 12,
  },
  kanaBox:   { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  kanaChar:  { fontSize: 26, fontWeight: '700' },
  cardBody:  { flex: 1 },
  cardTitle: { fontSize: 16, color: C.text, fontWeight: '600' },
  cardSub:   { fontSize: 13, color: C.muted2, marginTop: 2 },
});
