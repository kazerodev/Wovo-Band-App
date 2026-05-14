import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DEMO, DEFAULT_GOALS } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
import { ProgressBar } from '@/components/ProgressBar';
import { C } from '@/constants/colors';
import { Button } from '@/components/Button';

type Goals = typeof DEFAULT_GOALS;

function GoalInput({ label, value, onChangeText, unit }: {
  label: string; value: string; onChangeText: (v: string) => void; unit: string;
}) {
  return (
    <View style={gi.wrap}>
      <Text style={gi.label}>{label}</Text>
      <View style={gi.inputRow}>
        <TextInput
          style={gi.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholderTextColor={C.muted}
        />
        <Text style={gi.unit}>{unit}</Text>
      </View>
    </View>
  );
}

export default function GoalsScreen() {
  const { t } = useLang();
  const [goals, setGoals] = useState({ steps: String(DEFAULT_GOALS.steps), sleepHours: String(DEFAULT_GOALS.sleepHours), activeMinutes: String(DEFAULT_GOALS.activeMinutes) });

  useEffect(() => {
    load(KEYS.GOALS, DEFAULT_GOALS).then(g => {
      setGoals({ steps: String(g.steps), sleepHours: String(g.sleepHours), activeMinutes: String(g.activeMinutes) });
    });
  }, []);

  async function handleSave() {
    const parsed = {
      steps:         parseInt(goals.steps)         || DEFAULT_GOALS.steps,
      sleepHours:    parseFloat(goals.sleepHours)   || DEFAULT_GOALS.sleepHours,
      activeMinutes: parseInt(goals.activeMinutes)  || DEFAULT_GOALS.activeMinutes,
    };
    await save(KEYS.GOALS, parsed);
    Alert.alert('', t('goals_saved'));
  }

  const stepsParsed = parseInt(goals.steps) || DEFAULT_GOALS.steps;
  const activeParsed = parseInt(goals.activeMinutes) || DEFAULT_GOALS.activeMinutes;
  const sleepParsed = parseFloat(goals.sleepHours) || DEFAULT_GOALS.sleepHours;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.title}>{t('goals_title')}</Text>

      {/* Today vs goal */}
      <Text style={s.sectionLabel}>{t('goals_today')}</Text>
      <View style={s.card}>
        <GoalProgress label={t('goals_steps')}  current={DEMO.steps}         goal={stepsParsed}  color={C.pri}    unit="steps" />
        <GoalProgress label={t('goals_sleep')}  current={DEMO.sleepHours}    goal={sleepParsed}  color="#818CF8"  unit="h" />
        <GoalProgress label={t('goals_active')} current={DEMO.activeMinutes} goal={activeParsed} color="#34D399"  unit="min" last />
      </View>

      {/* Edit goals */}
      <Text style={s.sectionLabel}>{t('goals_title')}</Text>
      <View style={[s.card, s.formCard]}>
        <GoalInput label={t('goals_steps')}  value={goals.steps}         onChangeText={v => setGoals(g => ({ ...g, steps: v }))}         unit="steps" />
        <GoalInput label={t('goals_sleep')}  value={goals.sleepHours}    onChangeText={v => setGoals(g => ({ ...g, sleepHours: v }))}     unit="h" />
        <GoalInput label={t('goals_active')} value={goals.activeMinutes} onChangeText={v => setGoals(g => ({ ...g, activeMinutes: v }))} unit="min" />
      </View>

      <Button label={t('goals_save')} onPress={handleSave} />
    </ScrollView>
  );
}

function GoalProgress({ label, current, goal, color, unit, last }: {
  label: string; current: number; goal: number; color: string; unit: string; last?: boolean;
}) {
  const pct = Math.min(1, current / goal);
  return (
    <View style={[gp.row, !last && gp.border]}>
      <View style={gp.top}>
        <Text style={gp.label}>{label}</Text>
        <Text style={[gp.value, { color }]}>{current}<Text style={gp.unit}> / {goal} {unit}</Text></Text>
      </View>
      <ProgressBar progress={pct} color={color} height={5} />
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  title: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 4 },
  sectionLabel: { fontSize: 12, fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 2 },
  card: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  formCard: { padding: 4, overflow: 'visible' },
});

const gp = StyleSheet.create({
  row: { paddingHorizontal: 16, paddingVertical: 12, gap: 6 },
  border: { borderBottomWidth: 1, borderBottomColor: C.border },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  label: { fontSize: 14, color: C.muted2 },
  value: { fontSize: 16, fontWeight: '700' },
  unit: { fontSize: 11, color: C.muted, fontWeight: '400' },
});

const gi = StyleSheet.create({
  wrap: { padding: 12 },
  label: { fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: '500' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: C.bg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: C.text,
    fontSize: 16,
    fontWeight: '700',
  },
  unit: { fontSize: 13, color: C.muted2, width: 40 },
});
