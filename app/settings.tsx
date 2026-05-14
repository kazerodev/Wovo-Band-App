import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { Lang } from '@/constants/i18n';
import { C } from '@/constants/colors';

const LANGS: { code: Lang; labelKey: string }[] = [
  { code: 'en', labelKey: 'lang_en' },
  { code: 'nl', labelKey: 'lang_nl' },
  { code: 'fr', labelKey: 'lang_fr' },
];

export default function SettingsScreen() {
  const { t, lang, setLang } = useLang();

  return (
    <View style={s.wrap}>
      <Text style={s.title}>{t('lang_title')}</Text>
      <View style={s.list}>
        {LANGS.map(({ code, labelKey }) => {
          const active = lang === code;
          return (
            <TouchableOpacity
              key={code}
              style={[s.row, active && s.rowActive]}
              onPress={() => setLang(code)}
              activeOpacity={0.7}
            >
              <Text style={[s.label, active && s.labelActive]}>{t(labelKey)}</Text>
              {active && <Ionicons name="checkmark-circle" size={20} color={C.pri} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: C.bg,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 20,
  },
  list: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  rowActive: {
    backgroundColor: C.card2,
  },
  label: {
    fontSize: 16,
    color: C.text,
    fontWeight: '500',
  },
  labelActive: {
    color: C.pri,
    fontWeight: '700',
  },
});
