import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VOCABULARY } from '@/constants/japaneseData';
import { C } from '@/constants/colors';
import { useJapanese } from '@/context/JapaneseContext';

export default function FlashcardsScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { learnedVocab, toggleVocab } = useJapanese();

  const items = useMemo(
    () => (category && category !== 'Todos' ? VOCABULARY.filter((v) => v.category === category) : VOCABULARY),
    [category],
  );

  const [index, setIndex]     = useState(0);
  const [revealed, setRevealed] = useState(false);

  const item    = items[index];
  const key     = item ? item.jp + item.romaji : '';
  const learned = item ? learnedVocab.includes(key) : false;
  const total   = items.length;

  function next() { setIndex((i) => Math.min(i + 1, total - 1)); setRevealed(false); }
  function prev() { setIndex((i) => Math.max(i - 1, 0)); setRevealed(false); }

  if (!item) {
    return (
      <View style={s.center}>
        <Text style={s.empty}>Sin tarjetas disponibles</Text>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.topBar}>
        <Text style={s.counter}>{index + 1} / {total}</Text>
        {category && category !== 'Todos' && (
          <Text style={s.catBadge}>{category}</Text>
        )}
      </View>

      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${((index + 1) / total) * 100}%` as any }]} />
      </View>

      <View style={s.card}>
        <Text style={s.jpText}>{item.jp}</Text>
        {item.jp !== item.kana && <Text style={s.kanaText}>{item.kana}</Text>}
        <Text style={s.romajiText}>{item.romaji}</Text>

        {revealed ? (
          <View style={s.answer}>
            <View style={s.separator} />
            <Text style={s.esText}>{item.es}</Text>
            <Text style={s.catText}>{item.category}</Text>
          </View>
        ) : (
          <TouchableOpacity style={s.revealBtn} onPress={() => setRevealed(true)}>
            <Text style={s.revealBtnText}>Mostrar traducción</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.actions}>
        <TouchableOpacity style={[s.navBtn, index === 0 && s.navBtnDisabled]} onPress={prev} disabled={index === 0}>
          <Ionicons name="arrow-back" size={20} color={index === 0 ? C.muted : C.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.learnBtn, learned && s.learnBtnActive]}
          onPress={() => toggleVocab(key)}
        >
          <Ionicons name={learned ? 'checkmark-circle' : 'checkmark-circle-outline'} size={20} color={learned ? C.bg : C.success} style={{ marginRight: 6 }} />
          <Text style={[s.learnBtnText, learned && { color: C.bg }]}>
            {learned ? 'Aprendido' : 'Marcar aprendido'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[s.navBtn, index === total - 1 && s.navBtnDisabled]} onPress={next} disabled={index === total - 1}>
          <Ionicons name="arrow-forward" size={20} color={index === total - 1 ? C.muted : C.text} />
        </TouchableOpacity>
      </View>

      <Text style={s.swipeHint}>
        {learnedVocab.filter((k) => items.some((v) => v.jp + v.romaji === k)).length}/{total} aprendidos en esta sección
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, padding: 16 },
  center:    { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg },
  empty:     { color: C.muted, fontSize: 16 },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  counter:   { fontSize: 14, color: C.muted2, fontWeight: '600' },
  catBadge: {
    fontSize: 12, color: C.pri, fontWeight: '600',
    backgroundColor: C.pri + '20', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
  },
  progressBar:  { height: 4, backgroundColor: C.card2, borderRadius: 2, marginBottom: 24, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: C.pri, borderRadius: 2 },
  card: {
    flex: 1, backgroundColor: C.card, borderRadius: 20,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  jpText:     { fontSize: 64, color: C.pri, fontWeight: '800', textAlign: 'center' },
  kanaText:   { fontSize: 18, color: C.muted2, marginTop: 4 },
  romajiText: { fontSize: 16, color: C.muted, marginTop: 2 },
  answer:     { alignItems: 'center', marginTop: 24, width: '100%' },
  separator:  { height: 1, backgroundColor: C.border, width: '60%', marginBottom: 20 },
  esText:     { fontSize: 28, color: C.text, fontWeight: '700', textAlign: 'center' },
  catText:    { fontSize: 13, color: C.muted, marginTop: 8 },
  revealBtn: {
    marginTop: 28, backgroundColor: C.card2,
    borderRadius: 12, borderWidth: 1, borderColor: C.border,
    paddingVertical: 14, paddingHorizontal: 28,
  },
  revealBtnText: { color: C.muted2, fontSize: 15, fontWeight: '500' },
  actions: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginTop: 16,
  },
  navBtn: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  navBtnDisabled: { opacity: 0.35 },
  learnBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: 48, borderRadius: 12,
    backgroundColor: C.success + '22', borderWidth: 1, borderColor: C.success,
  },
  learnBtnActive:  { backgroundColor: C.success, borderColor: C.success },
  learnBtnText:    { fontSize: 14, color: C.success, fontWeight: '600' },
  swipeHint:       { textAlign: 'center', color: C.muted, fontSize: 12, marginTop: 10 },
});
