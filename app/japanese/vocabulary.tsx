import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VOCABULARY, VOCAB_CATEGORIES } from '@/constants/japaneseData';
import { C } from '@/constants/colors';
import { useJapanese } from '@/context/JapaneseContext';

const CAT_COLOR: Record<string, string> = {
  Saludos: C.pri,   Números: C.accent,   Colores: '#F59E0B',
  Comida:  C.success, Familia: '#F472B6', Lugares: '#60A5FA',
  Verbos:  C.danger,
};

const ALL_CATS = ['Todos', ...VOCAB_CATEGORIES];

export default function VocabularyScreen() {
  const router = useRouter();
  const { learnedVocab, toggleVocab } = useJapanese();
  const [cat, setCat]         = useState<string>('Todos');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = cat === 'Todos' ? VOCABULARY : VOCABULARY.filter((v) => v.category === cat);
  const catColor = cat === 'Todos' ? C.pri : (CAT_COLOR[cat] ?? C.pri);
  const learnedCount = items.filter((v) => learnedVocab.includes(v.jp + v.romaji)).length;

  function toggleReveal(key: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabsWrap} contentContainerStyle={s.tabs}>
        {ALL_CATS.map((c) => {
          const color = c === 'Todos' ? C.pri : (CAT_COLOR[c] ?? C.pri);
          const active = cat === c;
          return (
            <TouchableOpacity
              key={c}
              style={[s.tab, active && { backgroundColor: color + '22', borderColor: color }]}
              onPress={() => { setCat(c); setRevealed(new Set()); }}
            >
              <Text style={[s.tabText, active && { color }]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={s.toolbar}>
        <Text style={s.learnedBadge}>
          <Text style={{ color: catColor }}>{learnedCount}</Text>/{items.length} aprendidos
        </Text>
        <TouchableOpacity
          style={s.fichasBtn}
          onPress={() => router.push({ pathname: '/japanese/flashcards', params: { category: cat } } as any)}
        >
          <Ionicons name="layers-outline" size={14} color={C.bg} style={{ marginRight: 5 }} />
          <Text style={s.fichasBtnText}>Fichas</Text>
        </TouchableOpacity>
      </View>

      {items.map((item) => {
        const key = item.jp + item.romaji;
        const open    = revealed.has(key);
        const learned = learnedVocab.includes(key);
        return (
          <TouchableOpacity key={key} style={[s.card, learned && s.cardLearned]} onPress={() => toggleReveal(key)} activeOpacity={0.8}>
            <View style={s.cardLeft}>
              <Text style={[s.jp, { color: learned ? C.success : catColor }]}>{item.jp}</Text>
              {item.jp !== item.kana && <Text style={s.kana}>{item.kana}</Text>}
              <Text style={s.romaji}>{item.romaji}</Text>
            </View>
            <View style={s.divider} />
            <View style={s.cardRight}>
              {open
                ? <Text style={s.es}>{item.es}</Text>
                : <Text style={s.hidden}>Toca para ver</Text>
              }
            </View>
            <TouchableOpacity
              style={s.learnBtn}
              onPress={(e) => { e.stopPropagation?.(); toggleVocab(key); }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={learned ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={22}
                color={learned ? C.success : C.muted}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:    { backgroundColor: C.bg },
  content:   { padding: 16, paddingBottom: 48, gap: 8 },
  tabsWrap:  { marginBottom: 0 },
  tabs:      { gap: 8, paddingBottom: 4 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: C.border, backgroundColor: C.card,
  },
  tabText:     { fontSize: 13, color: C.muted2, fontWeight: '500' },
  toolbar:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  learnedBadge:{ fontSize: 13, color: C.muted2 },
  fichasBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.pri, borderRadius: 8,
    paddingVertical: 6, paddingHorizontal: 12,
  },
  fichasBtnText: { fontSize: 13, color: C.bg, fontWeight: '600' },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.card, borderRadius: 12,
    borderWidth: 1, borderColor: C.border, overflow: 'hidden', minHeight: 72,
  },
  cardLearned: { borderColor: C.success + '50' },
  cardLeft:    { flex: 1, paddingVertical: 14, paddingHorizontal: 16, gap: 2 },
  cardRight:   { flex: 1, paddingVertical: 14, paddingHorizontal: 12, justifyContent: 'center' },
  divider:     { width: 1, alignSelf: 'stretch', backgroundColor: C.border },
  learnBtn:    { paddingHorizontal: 12 },
  jp:          { fontSize: 22, fontWeight: '700' },
  kana:        { fontSize: 13, color: C.muted2 },
  romaji:      { fontSize: 12, color: C.muted },
  es:          { fontSize: 15, color: C.text, fontWeight: '500' },
  hidden:      { fontSize: 13, color: C.muted, fontStyle: 'italic' },
});
