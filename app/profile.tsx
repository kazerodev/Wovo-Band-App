import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TextInput,
  TouchableOpacity, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_PROFILE } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';
import { C } from '@/constants/colors';

type Profile = typeof DEFAULT_PROFILE;
type Gender = 'm' | 'f' | 'nb' | 'na';

const GENDERS: Gender[] = ['m', 'f', 'nb', 'na'];

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default' }: {
  label: string; value: string; onChangeText: (v: string) => void;
  placeholder?: string; keyboardType?: 'default' | 'numeric';
}) {
  return (
    <View style={f.wrap}>
      <Text style={f.label}>{label}</Text>
      <TextInput
        style={f.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={C.muted}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const { t } = useLang();
  const { user, loading: authLoading, configured, signInWithGoogle, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    load(KEYS.PROFILE, DEFAULT_PROFILE).then(setProfile);
  }, []);

  function update(patch: Partial<Profile>) {
    setProfile(p => ({ ...p, ...patch }));
  }

  async function handleSave() {
    await save(KEYS.PROFILE, profile);
    Alert.alert('', t('profile_saved'));
  }

  function initials(name: string) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('profile_title')}</Text>

      {/* Google Account */}
      <Text style={s.sectionLabel}>{t('google_account')}</Text>
      <View style={s.card}>
        {authLoading ? (
          <View style={s.authRow}><ActivityIndicator color={C.pri} /></View>
        ) : user ? (
          <View style={s.authRow}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initials(user.name)}</Text>
            </View>
            <View style={s.authInfo}>
              <Text style={s.authName}>{user.name}</Text>
              <Text style={s.authEmail}>{user.email}</Text>
            </View>
            <TouchableOpacity style={s.signOutBtn} onPress={signOut} activeOpacity={0.8}>
              <Text style={s.signOutText}>{t('google_signout')}</Text>
            </TouchableOpacity>
          </View>
        ) : configured ? (
          <TouchableOpacity style={s.googleBtn} onPress={signInWithGoogle} activeOpacity={0.85}>
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text style={s.googleBtnText}>{t('google_signin')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={s.authRow}>
            <Text style={s.setupNote}>{t('google_setup')}</Text>
          </View>
        )}
      </View>

      {/* Personal info */}
      <Text style={s.sectionLabel}>{t('profile_personal')}</Text>
      <View style={s.card}>
        <Field
          label={t('profile_name')}
          value={profile.name}
          onChangeText={v => update({ name: v })}
          placeholder="Your name"
        />
        <Field
          label={t('profile_age')}
          value={profile.age}
          onChangeText={v => update({ age: v })}
          keyboardType="numeric"
          placeholder="e.g. 30"
        />
        <Field
          label={t('profile_height')}
          value={profile.height}
          onChangeText={v => update({ height: v })}
          keyboardType="numeric"
          placeholder="e.g. 175"
        />
        <Field
          label={t('profile_weight')}
          value={profile.weight}
          onChangeText={v => update({ weight: v })}
          keyboardType="numeric"
          placeholder="e.g. 70"
        />

        <View style={f.wrap}>
          <Text style={f.label}>{t('profile_gender')}</Text>
          <View style={s.genderRow}>
            {GENDERS.map(g => (
              <TouchableOpacity
                key={g}
                style={[s.gChip, profile.gender === g && s.gChipActive]}
                onPress={() => update({ gender: g })}
              >
                <Text style={[s.gChipText, profile.gender === g && s.gChipTextActive]}>
                  {t(`profile_g_${g}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Button label={t('profile_save')} onPress={handleSave} />
      <Text style={s.note}>{t('profile_note')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  title: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 4 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 2 },
  card: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  authRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.pri + '33',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: C.pri },
  authInfo: { flex: 1 },
  authName:  { fontSize: 15, fontWeight: '700', color: C.text },
  authEmail: { fontSize: 12, color: C.muted, marginTop: 2 },
  signOutBtn: {
    borderRadius: 8, borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  signOutText: { fontSize: 12, color: C.muted2, fontWeight: '600' },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    margin: 14, padding: 12, borderRadius: 10,
    backgroundColor: '#4285F4',
  },
  googleBtnText: { fontSize: 14, color: '#fff', fontWeight: '600' },
  setupNote: { fontSize: 12, color: C.muted, flex: 1, lineHeight: 18 },
  genderRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  gChip: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: C.border,
    backgroundColor: C.card2,
  },
  gChipActive: { borderColor: C.pri, backgroundColor: C.pri + '22' },
  gChipText: { fontSize: 13, color: C.muted2 },
  gChipTextActive: { color: C.pri, fontWeight: '600' },
  note: { fontSize: 11, color: C.muted, textAlign: 'center' },
});

const f = StyleSheet.create({
  wrap: { padding: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  label: { fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: '500' },
  input: {
    backgroundColor: C.bg,
    borderRadius: 8, borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 12, paddingVertical: 10,
    color: C.text, fontSize: 15,
  },
});
