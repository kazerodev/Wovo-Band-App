import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { ProgressBar } from '@/components/ProgressBar';
import { WeekBarChart } from '@/components/WeekBarChart';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

function Stat({ label, value, unit, color = C.pri }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <View style={st.statCard}>
      <Text style={st.statLabel}>{label}</Text>
      <View style={st.statValueRow}>
        <Text style={[st.statValue, { color }]}>{value}</Text>
        {unit ? <Text style={st.statUnit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

export default function ActivityScreen() {
  const { t } = useLang();
  const stepsPct = DEMO.steps / DEMO.stepsGoal;
  const activePct = DEMO.activeMinutes / DEMO.activeGoal;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <DemoModeBanner />

      <View style={s.card}>
        <Text style={s.sectionLabel}>{t('act_progress')}</Text>
        <View style={s.stepsRow}>
          <Text style={s.stepsValue}>{DEMO.steps.toLocaleString('en')}</Text>
          <Text style={s.stepsGoal}>/ {DEMO.stepsGoal.toLocaleString('en')} {t('act_goal').toLowerCase()}</Text>
        </View>
        <ProgressBar progress={stepsPct} color={C.pri} height={8} />
        <Text style={s.stepsCaption}>{Math.round(stepsPct * 100)}% {t('act_goal').toLowerCase()}</Text>
      </View>

      <View style={s.statsGrid}>
        <Stat label={t('act_distance')} value={DEMO.distance} unit={t('act_km')} color={C.pri} />
        <Stat label={t('act_calories')} value={DEMO.calories} unit={t('act_kcal')} color="#FB923C" />
        <Stat
          label={`${t('act_active')} (${t('act_goal_active')} ${DEMO.activeGoal}${t('act_min')})`}
          value={DEMO.activeMinutes}
          unit={t('act_min')}
          color="#34D399"
        />
        <View style={st.statCard}>
          <Text style={st.statLabel}>{t('act_active')} %</Text>
          <ProgressBar progress={activePct} color="#34D399" height={6} />
          <Text style={[st.statUnit, { marginTop: 4 }]}>{Math.round(activePct * 100)}%</Text>
        </View>
      </View>

      <View style={s.card}>
        <Text style={s.sectionLabel}>{t('act_week')}</Text>
        <WeekBarChart data={DEMO.weeklySteps} color={C.pri} height={80} />
        <Text style={s.chartCaption}>{t('act_steps')}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  stepsValue: {
    fontSize: 40,
    fontWeight: '800',
    color: C.pri,
    lineHeight: 44,
  },
  stepsGoal: {
    fontSize: 14,
    color: C.muted,
    marginBottom: 6,
  },
  stepsCaption: {
    fontSize: 12,
    color: C.muted,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chartCaption: {
    fontSize: 11,
    color: C.muted,
    textAlign: 'center',
    marginTop: 4,
  },
});

const st = StyleSheet.create({
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    color: C.muted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  statUnit: {
    fontSize: 12,
    color: C.muted2,
    marginBottom: 3,
  },
});
