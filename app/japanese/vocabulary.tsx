import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { VOCABULARY, VOCAB_CATEGORIES } from '@/constants/japaneseData';
import { C } from '@/constants/colors';

const CAT_COLOR: Record<string, string> = {
  Saludos:  C.pri,
  Números:  C.accent,
  Colores:  '#F59E0B',
  Comida:   '#34D399',
  Familia:  '#F472B6',
  Lugares:  '#60A5FA',
  Verbos:   C.danger,
};

export default function VocabularyScreen() {
  const [cat, setCat] = useState<string>('Saludos');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const items = VOCABULARY.filter((v) => v.category === cat);
  const color = CAT_COLOR[cat] ?? C.pri;

  function toggle(key: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.tabs} contentContainerStyle={s.tabsContent}>
        {VOCAB_CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[s.tab, cat === c && { backgroundColor: (CAT_COLOR[c] ?? C.pri) + '25', borderColor: CAT_COLOR[c] ?? C.pri }]}
            onPress={() => { setCat(c); setRevealed(new Set()); }}
          >
            <Text style={[s.tabText, cat === c && { color: CAT_COLOR[c] ?? C.pri }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={s.hint}>Toca una tarjeta para revelar la traducción</Text>

      {items.map((item) => {
        const key = item.jp + item.romaji;
        const open = revealed.has(key);
        return (
          <TouchableOpacity key={key} style={s.card} onPress={() => toggle(key)} activeOpacity={0.8}>
            <View style={s.cardLeft}>
              <Text style={[s.jp, { color }]}>{item.jp}</Text>
              {item.jp !== item.kana && <Text style={s.kana}>{item.kana}</Text>}
              <Text style={s.romaji}>{item.romaji}</Text>
            </View>
            <View style={s.divider} />
            <View style={s.cardRight}>
              {open ? (
                <Text style={s.es}>{item.es}</Text>
              ) : (
                <Text style={s.hidden}>Toca para ver</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:       { backgroundColor: C.bg },
  content:      { padding: 16, paddingBottom: 48, gap: 8 },
  tabs:         { marginBottom: 4 },
  tabsContent:  { gap: 8, paddingBottom: 4 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: C.border,
    backgroundColor: C.card,
  },
  tabText:  { fontSize: 14, color: C.muted2, fontWeight: '500' },
  hint:     { fontSize: 13, color: C.muted, textAlign: 'center', marginBottom: 4 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.card, borderRadius: 12,
    borderWidth: 1, borderColor: C.border,
    overflow: 'hidden', minHeight: 72,
  },
  cardLeft:  { flex: 1, paddingVertical: 14, paddingHorizontal: 16, gap: 2 },
  cardRight: { flex: 1, paddingVertical: 14, paddingHorizontal: 16, justifyContent: 'center' },
  divider:   { width: 1, alignSelf: 'stretch', backgroundColor: C.border },
  jp:        { fontSize: 22, fontWeight: '700' },
  kana:      { fontSize: 13, color: C.muted2 },
  romaji:    { fontSize: 12, color: C.muted },
  es:        { fontSize: 15, color: C.text, fontWeight: '500' },
  hidden:    { fontSize: 13, color: C.muted, fontStyle: 'italic' },
});
