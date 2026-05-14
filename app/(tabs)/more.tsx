import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

interface RowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor?: string;
  label: string;
  sub?: string;
  onPress: () => void;
  last?: boolean;
}

function Row({ icon, iconColor = C.pri, label, sub, onPress, last }: RowProps) {
  return (
    <TouchableOpacity style={[r.row, !last && r.border]} onPress={onPress} activeOpacity={0.7}>
      <View style={[r.icon, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={r.text}>
        <Text style={r.label}>{label}</Text>
        {sub ? <Text style={r.sub}>{sub}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={14} color={C.muted} />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.section}>
        <Row icon="cart-outline"     iconColor={C.pri}      label={t('more_shop')}    onPress={() => router.push('/shop')} />
        <Row icon="person-outline"   iconColor="#818CF8"    label={t('more_profile')} onPress={() => router.push('/profile')} />
        <Row icon="flag-outline"     iconColor="#34D399"    label={t('more_goals')}   onPress={() => router.push('/goals')} last />
      </View>

      <View style={s.section}>
        <Row icon="help-circle-outline"   iconColor={C.muted2}  label={t('more_faq')}     onPress={() => router.push('/faq')} />
        <Row icon="document-text-outline" iconColor={C.muted2}  label={t('more_legal')}   onPress={() => router.push('/legal')} />
        <Row icon="language-outline"      iconColor={C.muted2}  label={t('more_lang')}    onPress={() => router.push('/settings')} last />
      </View>

      <View style={s.section}>
        <Row
          icon="mail-outline"
          iconColor={C.muted2}
          label={t('more_contact')}
          sub={t('more_contact_d')}
          onPress={() => Linking.openURL('mailto:hello@wovoband.com')}
        />
        <Row
          icon="globe-outline"
          iconColor={C.muted2}
          label={t('more_site')}
          sub="wovoband.com"
          onPress={() => WebBrowser.openBrowserAsync('https://wovoband.com', { toolbarColor: C.bg2, controlsColor: C.pri })}
          last
        />
      </View>

      <Text style={s.version}>{t('more_version')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  section: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  version: {
    textAlign: 'center',
    color: C.muted,
    fontSize: 12,
    marginTop: 4,
  },
});

const r = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  text: { flex: 1 },
  label: {
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
  sub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 1,
  },
});
