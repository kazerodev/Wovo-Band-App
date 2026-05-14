import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6', '7'];

export default function FaqScreen() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('faq_title')}</Text>
      {FAQ_KEYS.map(n => {
        const isOpen = open === n;
        return (
          <TouchableOpacity
            key={n}
            style={[s.item, isOpen && s.itemOpen]}
            onPress={() => setOpen(isOpen ? null : n)}
            activeOpacity={0.8}
          >
            <View style={s.qRow}>
              <Text style={[s.q, isOpen && s.qOpen]}>{t(`faq_q${n}`)}</Text>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={isOpen ? C.pri : C.muted}
              />
            </View>
            {isOpen && <Text style={s.a}>{t(`faq_a${n}`)}</Text>}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 48 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 20,
  },
  item: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 10,
  },
  itemOpen: {
    borderColor: C.pri,
  },
  qRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  q: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
    lineHeight: 21,
  },
  qOpen: {
    color: C.pri,
  },
  a: {
    fontSize: 14,
    color: C.muted2,
    lineHeight: 21,
    marginTop: 10,
  },
});
