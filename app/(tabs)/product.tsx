import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

const IMAGES = [
  { uri: 'https://wovoband.com/images/wovo-product-hero.webp', label: 'Hero' },
  { uri: 'https://wovoband.com/images/wovo-clean-sensors.webp', label: 'Sensors' },
  { uri: 'https://wovoband.com/images/wovo-clean-lifestyle.webp', label: 'Lifestyle' },
  { uri: 'https://wovoband.com/images/wovo-clean-waterproof.webp', label: 'Waterproof' },
];

const SPECS = [
  ['prod_s1', 'prod_s1v'],
  ['prod_s2', 'prod_s2v'],
  ['prod_s3', 'prod_s3v'],
  ['prod_s4', 'prod_s4v'],
  ['prod_s5', 'prod_s5v'],
  ['prod_s6', 'prod_s6v'],
];

const COMPARE_ROWS = [
  ['prod_c1', '✓', '✓'],
  ['prod_c2', '✓', '✓'],
  ['prod_c3', '✓', '✓'],
  ['prod_c4', '✓', '✓'],
  ['prod_c5', 'prod_c5_wovo', 'prod_c5_other'],
  ['prod_c6', 'prod_c6_wovo', 'prod_c6_other'],
];

export default function ProductScreen() {
  const { t } = useLang();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      {/* Gallery */}
      <View style={s.galleryWrap}>
        <Image
          source={{ uri: IMAGES[activeImg].uri }}
          style={s.mainImg}
          resizeMode="contain"
        />
        <View style={s.thumbRow}>
          {IMAGES.map((img, i) => (
            <TouchableOpacity
              key={img.uri}
              onPress={() => setActiveImg(i)}
              style={[s.thumb, i === activeImg && s.thumbActive]}
            >
              <Image source={{ uri: img.uri }} style={s.thumbImg} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.body}>
        <Text style={s.title}>{t('prod_title')}</Text>
        <Text style={s.sub}>{t('prod_sub')}</Text>

        {/* Specs */}
        <Text style={s.sectionTitle}>{t('prod_spec_t')}</Text>
        <View style={s.card}>
          {SPECS.map(([lk, vk], i) => (
            <View key={lk} style={[s.specRow, i < SPECS.length - 1 && s.specBorder]}>
              <Text style={s.specLabel}>{t(lk)}</Text>
              <Text style={s.specValue}>{t(vk)}</Text>
            </View>
          ))}
        </View>

        {/* App note */}
        <Text style={s.sectionTitle}>{t('prod_app_t')}</Text>
        <View style={[s.card, s.appNote]}>
          <Ionicons name="phone-portrait-outline" size={18} color={C.pri} style={{ marginBottom: 6 }} />
          <Text style={s.appNoteText}>{t('prod_app_d')}</Text>
        </View>

        {/* Comparison */}
        <Text style={s.sectionTitle}>{t('prod_compare_t')}</Text>
        <View style={s.card}>
          <View style={[s.tableRow, s.tableHeader]}>
            <Text style={[s.tableCell, s.tableCellHead, { flex: 2 }]}>{t('prod_c_feat')}</Text>
            <Text style={[s.tableCell, s.tableCellHead, s.tableCellCenter]}>{t('prod_c_wovo')}</Text>
            <Text style={[s.tableCell, s.tableCellHead, s.tableCellCenter]}>{t('prod_c_other')}</Text>
          </View>
          {COMPARE_ROWS.map(([feat, wovo, other], i) => (
            <View key={feat} style={[s.tableRow, i < COMPARE_ROWS.length - 1 && s.specBorder]}>
              <Text style={[s.tableCell, s.tableCellLabel, { flex: 2 }]}>{t(feat)}</Text>
              <Text style={[s.tableCell, s.tableCellCenter, { color: wovo === '✓' ? C.success : C.muted2 }]}>
                {wovo === '✓' ? '✓' : t(wovo)}
              </Text>
              <Text style={[s.tableCell, s.tableCellCenter, { color: C.muted2 }]}>
                {other === '✓' ? '✓' : t(other)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { paddingBottom: 40 },
  galleryWrap: {
    backgroundColor: C.bg2,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  mainImg: {
    width: 260,
    height: 260,
    marginBottom: 16,
  },
  thumbRow: {
    flexDirection: 'row',
    gap: 10,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbActive: {
    borderColor: C.pri,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  body: { padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: C.muted,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 24,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  specBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  specLabel: {
    fontSize: 13,
    color: C.muted2,
    flex: 1,
  },
  specValue: {
    fontSize: 13,
    color: C.text,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  appNote: {
    padding: 16,
  },
  appNoteText: {
    fontSize: 13,
    color: C.muted2,
    lineHeight: 19,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: C.card2,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
  },
  tableCellHead: {
    color: C.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCellLabel: {
    color: C.text,
    fontSize: 13,
  },
  tableCellCenter: {
    textAlign: 'center',
    color: C.muted2,
    fontWeight: '600',
  },
});
