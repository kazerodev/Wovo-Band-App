import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '@/context/LanguageContext';
import { C } from '@/constants/colors';

interface RowProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  sub?: string;
  onPress: () => void;
}

function Row({ icon, label, sub, onPress }: RowProps) {
  return (
    <TouchableOpacity style={s.row} onPress={onPress} activeOpacity={0.7}>
      <View style={s.rowIcon}>
        <Ionicons name={icon} size={20} color={C.pri} />
      </View>
      <View style={s.rowText}>
        <Text style={s.rowLabel}>{label}</Text>
        {sub ? <Text style={s.rowSub}>{sub}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={16} color={C.muted} />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.section}>
        <Row
          icon="help-circle-outline"
          label={t('more_faq')}
          onPress={() => router.push('/faq')}
        />
        <Row
          icon="document-text-outline"
          label={t('more_legal')}
          onPress={() => router.push('/legal')}
        />
        <Row
          icon="language-outline"
          label={t('more_lang')}
          onPress={() => router.push('/settings')}
        />
      </View>

      <View style={s.section}>
        <Row
          icon="mail-outline"
          label={t('more_contact')}
          sub={t('more_contact_d')}
          onPress={() => Linking.openURL('mailto:hello@wovoband.com')}
        />
        <Row
          icon="globe-outline"
          label={t('more_site')}
          sub="wovoband.com"
          onPress={() => WebBrowser.openBrowserAsync('https://wovoband.com', {
            toolbarColor: C.bg2,
            controlsColor: C.pri,
          })}
        />
      </View>

      <Text style={s.version}>{t('more_version')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 48 },
  section: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: C.card2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowText: { flex: 1 },
  rowLabel: {
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
  rowSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 1,
  },
  version: {
    textAlign: 'center',
    color: C.muted,
    fontSize: 12,
    marginTop: 8,
  },
});
