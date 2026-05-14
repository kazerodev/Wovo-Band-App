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
  WebBrowser.openBrowserAsync(url, {
    toolbarColor: C.bg2,
    controlsColor: C.pri,
  });
}

const INCLUDES_SINGLE = ['price_inc1', 'price_inc2', 'price_inc3', 'price_inc4', 'price_inc5'];
const INCLUDES_DUO    = ['price_inc1d', 'price_inc2', 'price_inc3', 'price_inc4', 'price_inc5'];

export default function PricingScreen() {
  const { t } = useLang();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('price_title')}</Text>
      <Text style={s.sub}>{t('price_sub')}</Text>

      {/* Single */}
      <View style={s.card}>
        <Text style={s.cardTitle}>{t('price_single')}</Text>
        <Text style={s.price}>{t('price_s_price')}</Text>
        <View style={s.includesList}>
          {INCLUDES_SINGLE.map(k => (
            <View key={k} style={s.includeRow}>
              <Ionicons name="checkmark-circle" size={16} color={C.pri} />
              <Text style={s.includeText}>{t(k)}</Text>
            </View>
          ))}
        </View>
        <Button
          label={t('price_buy_s')}
          onPress={() => openCheckout(LINK_SINGLE)}
          style={s.btn}
        />
      </View>

      {/* Duo */}
      <View style={[s.card, s.cardFeatured]}>
        <View style={s.featuredTag}>
          <Text style={s.featuredTagText}>{t('price_duo_tag')}</Text>
        </View>
        <Text style={s.cardTitle}>{t('price_duo')}</Text>
        <View style={s.priceRow}>
          <Text style={s.price}>{t('price_d_price')}</Text>
          <View style={s.saveBadge}>
            <Text style={s.saveText}>{t('price_d_save')}</Text>
          </View>
        </View>
        <View style={s.includesList}>
          {INCLUDES_DUO.map(k => (
            <View key={k} style={s.includeRow}>
              <Ionicons name="checkmark-circle" size={16} color={C.pri} />
              <Text style={s.includeText}>{t(k)}</Text>
            </View>
          ))}
        </View>
        <Button
          label={t('price_buy_d')}
          onPress={() => openCheckout(LINK_DUO)}
          style={s.btn}
        />
      </View>

      {/* Trust */}
      <View style={s.trust}>
        <Ionicons name="lock-closed-outline" size={14} color={C.muted} />
        <Text style={s.trustText}>{t('price_secure')}</Text>
      </View>
      <Text style={s.returnText}>{t('price_return')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 48 },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: C.text,
    marginBottom: 6,
  },
  sub: {
    fontSize: 14,
    color: C.muted,
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 20,
    marginBottom: 16,
  },
  cardFeatured: {
    borderColor: C.pri,
    borderWidth: 1.5,
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: C.pri,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 12,
  },
  featuredTagText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 36,
    fontWeight: '800',
    color: C.pri,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  saveBadge: {
    backgroundColor: C.card2,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  saveText: {
    color: C.success,
    fontSize: 12,
    fontWeight: '700',
  },
  includesList: {
    gap: 8,
    marginBottom: 20,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  includeText: {
    fontSize: 14,
    color: C.muted2,
  },
  btn: { width: '100%' },
  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    marginBottom: 6,
  },
  trustText: {
    fontSize: 12,
    color: C.muted,
  },
  returnText: {
    fontSize: 12,
    color: C.muted,
    textAlign: 'center',
  },
});
