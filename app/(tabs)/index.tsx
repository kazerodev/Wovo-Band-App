import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { Button } from '@/components/Button';
import { C } from '@/constants/colors';

const FEATURES = [
  { k: 'home_feat1', icon: 'heart-outline' as const },
  { k: 'home_feat2', icon: 'moon-outline' as const },
  { k: 'home_feat3', icon: 'pulse-outline' as const },
  { k: 'home_feat4', icon: 'walk-outline' as const },
  { k: 'home_feat5', icon: 'battery-charging-outline' as const },
  { k: 'home_feat6', icon: 'water-outline' as const },
];

export default function HomeScreen() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={[C.bg2, C.bg]} style={s.hero}>
        <Image
          source={{ uri: 'https://wovoband.com/images/wovo-product-hero.webp' }}
          style={s.heroImg}
          resizeMode="contain"
        />
        <Text style={s.tagline}>{t('home_tagline')}</Text>
        <Text style={s.sub}>{t('home_sub')}</Text>

        <View style={s.badges}>
          {(['home_badge1', 'home_badge2', 'home_badge3'] as const).map(k => (
            <View key={k} style={s.badge}>
              <Text style={s.badgeText}>{t(k)}</Text>
            </View>
          ))}
        </View>

        <Button
          label={t('home_cta')}
          onPress={() => router.push('/(tabs)/pricing')}
          style={s.cta}
        />
      </LinearGradient>

      {/* Features */}
      <View style={s.section}>
        {FEATURES.map(({ k, icon }) => (
          <View key={k} style={s.featRow}>
            <View style={s.iconWrap}>
              <Ionicons name={icon} size={22} color={C.pri} />
            </View>
            <View style={s.featText}>
              <Text style={s.featTitle}>{t(`${k}_t`)}</Text>
              <Text style={s.featDesc}>{t(`${k}_d`)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={s.disclaimerWrap}>
        <Text style={s.disclaimer}>{t('home_disclaimer')}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { paddingBottom: 40 },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  heroImg: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '800',
    color: C.text,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    color: C.muted2,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
  },
  badge: {
    backgroundColor: C.card,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: C.border,
  },
  badgeText: {
    color: C.muted2,
    fontSize: 12,
    fontWeight: '500',
  },
  cta: { width: '100%' },
  section: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: C.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: C.card2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featText: { flex: 1 },
  featTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
    marginBottom: 4,
  },
  featDesc: {
    fontSize: 13,
    color: C.muted2,
    lineHeight: 19,
  },
  disclaimerWrap: {
    marginHorizontal: 20,
    marginTop: 8,
    padding: 14,
    backgroundColor: C.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
  },
  disclaimer: {
    fontSize: 11,
    color: C.muted,
    lineHeight: 16,
    textAlign: 'center',
  },
});
