import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DEFAULT_PROFILE } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
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

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('profile_title')}</Text>

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
