import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { Button } from '@/components/Button';
import { C } from '@/constants/colors';

const LINK_SINGLE = 'https://buy.stripe.com/7sYaEQ9FbdVqfyAfp7c7u07';
const LINK_DUO    = 'https://buy.stripe.com/00w7sEcRn8B6aeg0udc7u08';

function openCheckout(url: string) {
  WebBrowser.openBrowserAsync(url, { toolbarColor: C.bg2, controlsColor: C.pri });
}

const SPECS = ['s1','s2','s3','s4','s5'] as const;
const INCLUDES_S = ['shop_inc1','shop_inc2','shop_inc3','shop_inc4','shop_inc5'];
const INCLUDES_D = ['shop_inc1d','shop_inc2','shop_inc3','shop_inc4','shop_inc5'];

export default function ShopScreen() {
  const { t } = useLang();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('shop_title')}</Text>
      <Text style={s.sub}>{t('shop_sub')}</Text>

      {/* Specs */}
      <View style={s.card}>
        <Text style={s.sectionLabel}>{t('shop_specs')}</Text>
        {SPECS.map((k, i) => (
          <View key={k} style={[s.specRow, i < SPECS.length - 1 && s.specBorder]}>
            <Text style={s.specLabel}>{t(`shop_${k}`)}</Text>
            <Text style={s.specValue}>{t(`shop_${k}v`)}</Text>
          </View>
        ))}
      </View>

      {/* Single */}
      <View style={s.priceCard}>
        <Text style={s.planTitle}>{t('shop_single')}</Text>
        <Text style={s.price}>{t('shop_s_price')}</Text>
        <View style={s.includes}>
          {INCLUDES_S.map(k => (
            <View key={k} style={s.includeRow}>
              <Ionicons name="checkmark-circle" size={15} color={C.pri} />
              <Text style={s.includeText}>{t(k)}</Text>
            </View>
          ))}
        </View>
        <Button label={t('shop_buy_s')} onPress={() => openCheckout(LINK_SINGLE)} />
      </View>

      {/* Duo */}
      <View style={[s.priceCard, s.priceCardFeatured]}>
        <View style={s.featTag}>
          <Text style={s.featTagText}>{t('shop_duo_tag')}</Text>
        </View>
        <Text style={s.planTitle}>{t('shop_duo')}</Text>
        <View style={s.priceRow}>
          <Text style={s.price}>{t('shop_d_price')}</Text>
          <View style={s.saveBadge}>
            <Text style={s.saveText}>{t('shop_d_save')}</Text>
          </View>
        </View>
        <View style={s.includes}>
          {INCLUDES_D.map(k => (
            <View key={k} style={s.includeRow}>
              <Ionicons name="checkmark-circle" size={15} color={C.pri} />
              <Text style={s.includeText}>{t(k)}</Text>
            </View>
          ))}
        </View>
        <Button label={t('shop_buy_d')} onPress={() => openCheckout(LINK_DUO)} />
      </View>

      {/* Trust */}
      <View style={s.trust}>
        <Ionicons name="lock-closed-outline" size={13} color={C.muted} />
        <Text style={s.trustText}>{t('shop_secure')}</Text>
      </View>
      <Text style={s.returnText}>{t('shop_return')}</Text>
      <Text style={s.disclaimer}>{t('shop_disclaimer')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  title: { fontSize: 24, fontWeight: '800', color: C.text },
  sub: { fontSize: 14, color: C.muted },
  card: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden', padding: 12 },
  sectionLabel: { fontSize: 11, color: C.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  specBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  specLabel: { fontSize: 13, color: C.muted2 },
  specValue: { fontSize: 13, color: C.text, fontWeight: '600' },
  priceCard: {
    backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
    borderColor: C.border, padding: 16, gap: 12,
  },
  priceCardFeatured: { borderColor: C.pri, borderWidth: 1.5 },
  featTag: { alignSelf: 'flex-start', backgroundColor: C.pri, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 3 },
  featTagText: { color: '#000', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  planTitle: { fontSize: 18, fontWeight: '700', color: C.text },
  price: { fontSize: 36, fontWeight: '800', color: C.pri },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  saveBadge: { backgroundColor: C.card2, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  saveText: { color: C.success, fontSize: 12, fontWeight: '700' },
  includes: { gap: 8 },
  includeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  includeText: { fontSize: 14, color: C.muted2 },
  trust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 },
  trustText: { fontSize: 12, color: C.muted },
  returnText: { fontSize: 12, color: C.muted, textAlign: 'center' },
  disclaimer: { fontSize: 11, color: C.muted, textAlign: 'center', lineHeight: 16 },
});
