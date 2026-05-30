import React, { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PHRASES } from '@/constants/japaneseData';
import { C } from '@/constants/colors';

export default function PhrasesScreen() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.banner}>
        <Ionicons name="airplane-outline" size={20} color={C.success} />
        <Text style={s.bannerText}>Frases esenciales para viajar a Japón</Text>
      </View>
      {PHRASES.map((p, i) => {
        const open = expanded.has(i);
        return (
          <TouchableOpacity key={i} style={s.card} onPress={() => toggle(i)} activeOpacity={0.8}>
            <View style={s.cardHeader}>
              <View style={s.numBadge}>
                <Text style={s.num}>{i + 1}</Text>
              </View>
              <View style={s.headerText}>
                <Text style={s.jp}>{p.jp}</Text>
                <Text style={s.romaji}>{p.romaji}</Text>
              </View>
              <Ionicons
                name={open ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={C.muted}
              />
            </View>
            {open && (
              <View style={s.cardBody}>
                <View style={s.separator} />
                <View style={s.translation}>
                  <Ionicons name="flag-outline" size={14} color={C.success} />
                  <Text style={s.es}>{p.es}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:   { backgroundColor: C.bg },
  content:  { padding: 16, paddingBottom: 48, gap: 8 },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.success + '18', borderRadius: 10, padding: 12, marginBottom: 4,
  },
  bannerText: { fontSize: 14, color: C.muted2, flex: 1 },
  card: {
    backgroundColor: C.card, borderRadius: 12,
    borderWidth: 1, borderColor: C.border, overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, gap: 12,
  },
  numBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: C.success + '22', alignItems: 'center', justifyContent: 'center',
  },
  num:        { fontSize: 12, color: C.success, fontWeight: '700' },
  headerText: { flex: 1 },
  jp:         { fontSize: 17, color: C.text, fontWeight: '600', lineHeight: 22 },
  romaji:     { fontSize: 12, color: C.muted2, marginTop: 2 },
  cardBody:   { paddingHorizontal: 14, paddingBottom: 14 },
  separator:  { height: 1, backgroundColor: C.border, marginBottom: 12 },
  translation:{ flexDirection: 'row', alignItems: 'center', gap: 8 },
  es:         { fontSize: 15, color: C.text, fontWeight: '500', flex: 1 },
});
