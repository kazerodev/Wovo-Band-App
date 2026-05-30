import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Modal, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HIRAGANA, Kana } from '@/constants/japaneseData';
import { C } from '@/constants/colors';
import { useJapanese } from '@/context/JapaneseContext';

const TIPS: Record<string, string> = {
  a: '"a" como en "casa"',   i: '"i" como en "sí"',
  u: '"u" como en "luna"',   e: '"e" como en "mesa"',
  o: '"o" como en "sol"',    shi: '"shi" · sh inglesa + i',
  chi: '"chi" como "Chile"', tsu: '"tsu" · ts + u',
  fu: 'entre "fu" y "hu"',   n: '"n" nasal, al final de sílaba',
};
const tip = (r: string) => TIPS[r] ?? `"${r}" como se escribe`;

export default function HiraganaScreen() {
  const { studiedHiragana, markHiragana } = useJapanese();
  const [selected, setSelected] = useState<Kana | null>(null);

  function onTap(item: Kana) {
    setSelected(item);
    markHiragana(item.kana);
  }

  const pct = Math.round((studiedHiragana.length / HIRAGANA.length) * 100);

  return (
    <>
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        <View style={s.progressRow}>
          <Text style={s.progressLabel}>Estudiados: {studiedHiragana.length}/{HIRAGANA.length}</Text>
          <Text style={s.progressPct}>{pct}%</Text>
        </View>
        <View style={s.progressBar}>
          <View style={[s.progressFill, { width: `${pct}%` as any }]} />
        </View>

        <Text style={s.desc}>
          Toca cada carácter para ver su pronunciación. Se marcarán como estudiados automáticamente.
        </Text>

        <View style={s.grid}>
          {HIRAGANA.map((item) => {
            const studied = studiedHiragana.includes(item.kana);
            return (
              <TouchableOpacity
                key={item.kana}
                style={[s.cell, studied && s.cellStudied, selected?.kana === item.kana && s.cellActive]}
                onPress={() => onTap(item)}
                activeOpacity={0.7}
              >
                <Text style={s.kana}>{item.kana}</Text>
                <Text style={s.romaji}>{item.romaji}</Text>
                {studied && <View style={s.dot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <Pressable style={s.overlay} onPress={() => setSelected(null)}>
          <Pressable style={s.modal} onPress={() => {}}>
            <Text style={s.modalKana}>{selected?.kana}</Text>
            <Text style={s.modalRomaji}>{selected?.romaji?.toUpperCase()}</Text>
            <View style={s.tipBox}>
              <Ionicons name="volume-high-outline" size={14} color={C.pri} />
              <Text style={s.tipText}>{selected ? tip(selected.romaji) : ''}</Text>
            </View>
            <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}>
              <Text style={s.closeBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  scroll:  { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 13, color: C.muted2 },
  progressPct:   { fontSize: 13, color: C.pri, fontWeight: '600' },
  progressBar:   { height: 5, backgroundColor: C.card2, borderRadius: 3, marginBottom: 16, overflow: 'hidden' },
  progressFill:  { height: 5, backgroundColor: C.pri, borderRadius: 3 },
  desc: { fontSize: 13, color: C.muted, lineHeight: 18, marginBottom: 14, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  cell: {
    width: 62, alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.card, borderRadius: 10,
    borderWidth: 1, borderColor: C.border, paddingVertical: 10, position: 'relative',
  },
  cellStudied: { borderColor: C.pri + '60', backgroundColor: C.pri + '0D' },
  cellActive:  { borderColor: C.pri, backgroundColor: C.pri + '20' },
  kana:   { fontSize: 26, color: C.text, fontWeight: '600' },
  romaji: { fontSize: 11, color: C.muted2, marginTop: 2 },
  dot: {
    position: 'absolute', top: 4, right: 4,
    width: 6, height: 6, borderRadius: 3, backgroundColor: C.pri,
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' },
  modal: {
    backgroundColor: C.card2, borderRadius: 20,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', padding: 32, width: 240,
  },
  modalKana:   { fontSize: 72, color: C.pri, fontWeight: '700' },
  modalRomaji: { fontSize: 24, color: C.text, fontWeight: '600', marginTop: 8 },
  tipBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.bg, borderRadius: 8, padding: 10, marginTop: 14,
  },
  tipText:      { fontSize: 13, color: C.muted2, flex: 1 },
  closeBtn:     { marginTop: 20, backgroundColor: C.pri + '22', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 28 },
  closeBtnText: { color: C.pri, fontWeight: '600', fontSize: 15 },
});
