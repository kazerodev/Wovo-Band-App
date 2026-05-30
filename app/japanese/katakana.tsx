import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  StyleSheet, Modal, Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KATAKANA, Kana } from '@/constants/japaneseData';
import { C } from '@/constants/colors';

const EXAMPLES: Record<string, string> = {
  a: 'ア → アイスクリーム (aisu kuriimu) = helado',
  i: 'イ → イタリア (itaria) = Italia',
  u: 'ウ → ウイスキー (uisukii) = whisky',
  ko: 'コ → コーヒー (koohii) = café',
  su: 'ス → スペイン (supein) = España',
  te: 'テ → テレビ (terebi) = televisión',
};

function example(romaji: string) {
  return EXAMPLES[romaji] ?? `"${romaji}" · usado en palabras extranjeras`;
}

export default function KatakanaScreen() {
  const [selected, setSelected] = useState<Kana | null>(null);

  return (
    <>
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        <Text style={s.desc}>
          Katakana se usa para palabras extranjeras, nombres propios y onomatopeyas.
          Los sonidos son idénticos a hiragana.
        </Text>
        <View style={s.grid}>
          {KATAKANA.map((item) => (
            <TouchableOpacity
              key={item.kana}
              style={[s.cell, selected?.kana === item.kana && s.cellActive]}
              onPress={() => setSelected(item)}
              activeOpacity={0.7}
            >
              <Text style={s.kana}>{item.kana}</Text>
              <Text style={s.romaji}>{item.romaji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <Pressable style={s.overlay} onPress={() => setSelected(null)}>
          <Pressable style={s.modal} onPress={() => {}}>
            <Text style={s.modalKana}>{selected?.kana}</Text>
            <Text style={s.modalRomaji}>{selected?.romaji?.toUpperCase()}</Text>
            <View style={s.modalTipBox}>
              <Ionicons name="information-circle-outline" size={14} color={C.accent} />
              <Text style={s.modalTip}>{selected ? example(selected.romaji) : ''}</Text>
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
  desc: {
    fontSize: 14, color: C.muted2, lineHeight: 20,
    marginBottom: 16, textAlign: 'center',
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
  },
  cell: {
    width: 62, alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.card, borderRadius: 10,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 10,
  },
  cellActive: { borderColor: C.accent, backgroundColor: C.accent + '18' },
  kana:   { fontSize: 26, color: C.text, fontWeight: '600' },
  romaji: { fontSize: 11, color: C.muted2, marginTop: 2 },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  modal: {
    backgroundColor: C.card2, borderRadius: 20,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', padding: 32, width: 260,
  },
  modalKana:   { fontSize: 72, color: C.accent, fontWeight: '700' },
  modalRomaji: { fontSize: 24, color: C.text, fontWeight: '600', marginTop: 8 },
  modalTipBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: C.bg, borderRadius: 8, padding: 10, marginTop: 14,
  },
  modalTip:  { fontSize: 13, color: C.muted2, flex: 1, lineHeight: 18 },
  closeBtn:  {
    marginTop: 20, backgroundColor: C.accent + '22',
    borderRadius: 10, paddingVertical: 10, paddingHorizontal: 28,
  },
  closeBtnText: { color: C.accent, fontWeight: '600', fontSize: 15 },
});
