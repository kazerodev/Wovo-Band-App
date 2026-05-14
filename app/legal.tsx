import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

const LEGAL_LINKS = [
  { key: 'legal_privacy', url: 'https://wovoband.com/privacy.html' },
  { key: 'legal_terms',   url: 'https://wovoband.com/terms.html' },
];

export default function LegalScreen() {
  const { t } = useLang();

  function open(url: string) {
    WebBrowser.openBrowserAsync(url, {
      toolbarColor: C.bg2,
      controlsColor: C.pri,
    });
  }

  return (
    <View style={s.wrap}>
      <Text style={s.title}>{t('legal_title')}</Text>
      <View style={s.list}>
        {LEGAL_LINKS.map(({ key, url }) => (
          <TouchableOpacity key={key} style={s.row} onPress={() => open(url)} activeOpacity={0.7}>
            <Text style={s.label}>{t(key)}</Text>
            <View style={s.openWrap}>
              <Text style={s.openText}>{t('legal_open')}</Text>
              <Ionicons name="open-outline" size={14} color={C.pri} />
            </View>
          </TouchableOpacity>
        ))}
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
  label: {
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
  openWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openText: {
    fontSize: 13,
    color: C.pri,
  },
});
