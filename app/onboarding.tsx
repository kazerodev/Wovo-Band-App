import React, { useState } from 'react';
import {
  ScrollView, View, Text, TextInput,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLang } from '@/context/LanguageContext';
import { KEYS, save } from '@/constants/storage';
import { DEFAULT_GOALS, DEFAULT_PROFILE } from '@/constants/demoData';
import { C } from '@/constants/colors';

export default function OnboardingScreen() {
  const { t } = useLang();
  const router = useRouter();

  const [name, setName]   = useState('');
  const [steps, setSteps] = useState(String(DEFAULT_GOALS.steps));
  const [sleep, setSleep] = useState(String(DEFAULT_GOALS.sleepHours));
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  async function handleStart() {
    const parsedSteps = parseInt(steps) || DEFAULT_GOALS.steps;
    const parsedSleep = parseFloat(sleep) || DEFAULT_GOALS.sleepHours;

    await Promise.all([
      save(KEYS.PROFILE, { ...DEFAULT_PROFILE, name: name.trim(), units }),
      save(KEYS.GOALS,   { ...DEFAULT_GOALS, steps: parsedSteps, sleepHours: parsedSleep }),
      AsyncStorage.setItem(KEYS.ONBOARDED, '1'),
    ]);

    router.replace('/(tabs)');
  }

  async function handleSkip() {
    await AsyncStorage.setItem(KEYS.ONBOARDED, '1');
    router.replace('/(tabs)');
  }

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={s.header}>
        <Text style={s.title}>{t('onboard_title')}</Text>
        <Text style={s.sub}>{t('onboard_sub')}</Text>
      </View>

      <View style={s.card}>
        <Field
          label={t('onboard_name_label')}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Alex"
        />
        <Field
          label={t('onboard_goal_steps')}
          value={steps}
          onChangeText={setSteps}
          keyboardType="numeric"
          placeholder="10000"
          last
        />
      </View>

      <View style={s.card}>
        <Field
          label={t('onboard_goal_sleep')}
          value={sleep}
          onChangeText={setSleep}
          keyboardType="numeric"
          placeholder="8"
          last
        />
      </View>

      <View style={s.card}>
        <View style={s.unitsWrap}>
          <Text style={s.unitsLabel}>{t('onboard_units')}</Text>
          <View style={s.seg}>
            {(['metric', 'imperial'] as const).map(u => (
              <TouchableOpacity
                key={u}
                style={[s.segBtn, units === u && s.segBtnActive]}
                onPress={() => setUnits(u)}
              >
                <Text style={[s.segText, units === u && s.segTextActive]}>
                  {t(u === 'metric' ? 'onboard_metric' : 'onboard_imperial')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={s.startBtn} onPress={handleStart} activeOpacity={0.85}>
        <Text style={s.startText}>{t('onboard_start')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.skipBtn} onPress={handleSkip} activeOpacity={0.7}>
        <Text style={s.skipText}>{t('onboard_skip')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', last }: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
  last?: boolean;
}) {
  return (
    <View style={[f.wrap, !last && f.border]}>
      <Text style={f.label}>{label}</Text>
      <TextInput
        style={f.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={C.muted}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { padding: 24, paddingTop: 72, paddingBottom: 48, gap: 16 },
  header: { gap: 6, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: C.text },
  sub:   { fontSize: 15, color: C.muted, lineHeight: 22 },
  card:  {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  unitsWrap: { padding: 14, gap: 10 },
  unitsLabel: { fontSize: 12, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6 },
  seg: {
    flexDirection: 'row',
    backgroundColor: C.card2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  segBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  segBtnActive: { backgroundColor: C.pri },
  segText: { fontSize: 13, color: C.muted2, fontWeight: '500' },
  segTextActive: { color: '#000', fontWeight: '700' },
  startBtn: {
    backgroundColor: C.pri,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  startText: { fontSize: 16, fontWeight: '700', color: '#000' },
  skipBtn: { alignItems: 'center', paddingVertical: 8 },
  skipText: { fontSize: 14, color: C.muted },
});

const f = StyleSheet.create({
  wrap:   { padding: 14 },
  border: { borderBottomWidth: 1, borderBottomColor: C.border },
  label:  { fontSize: 12, color: C.muted, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.6 },
  input:  {
    backgroundColor: C.bg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: C.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
