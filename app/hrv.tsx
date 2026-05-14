import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { ProgressBar } from '@/components/ProgressBar';
import { WeekBarChart } from '@/components/WeekBarChart';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

const BLUE   = '#60A5FA';
const GREEN  = '#34D399';
const AMBER  = '#FBBF24';
const ORANGE = '#FB923C';

function stressLabel(t: (k: string) => string, pct: number) {
  if (pct < 40)  return { label: t('hrv_low_stress'),  color: GREEN  };
  if (pct < 70)  return { label: t('hrv_med_stress'),  color: AMBER  };
  return            { label: t('hrv_high_stress'), color: ORANGE };
}

function recoveryLabel(pct: number) {
  if (pct >= 70) return { label: 'Good',   color: GREEN  };
  if (pct >= 50) return { label: 'Fair',   color: AMBER  };
  return            { label: 'Low',    color: ORANGE };
}

export default function HrvScreen() {
  const { t } = useLang();
  const stress   = stressLabel(t, DEMO.stressLevel);
  const recovery = recoveryLabel(DEMO.recoveryScore);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <DemoModeBanner />

      {/* HRV + Recovery */}
      <View style={s.topRow}>
        <View style={[s.bigCard, { borderColor: BLUE + '44' }]}>
          <Text style={s.cardLabel}>{t('hrv_value')}</Text>
          <Text style={[s.bigNum, { color: BLUE }]}>{DEMO.hrv}</Text>
          <Text style={s.cardUnit}>{t('hrv_ms')}</Text>
        </View>
        <View style={[s.bigCard, { borderColor: GREEN + '44' }]}>
          <Text style={s.cardLabel}>{t('hrv_recovery')}</Text>
          <Text style={[s.bigNum, { color: recovery.color }]}>{DEMO.recoveryScore}</Text>
          <Text style={[s.cardUnit, { color: recovery.color }]}>{recovery.label}</Text>
        </View>
      </View>

      {/* Stress */}
      <View style={s.card}>
        <View style={s.cardRow}>
          <Text style={s.cardLabel}>{t('hrv_stress')}</Text>
          <Text style={[s.stressLabel, { color: stress.color }]}>{stress.label}</Text>
        </View>
        <ProgressBar progress={DEMO.stressLevel / 100} color={stress.color} height={8} />
        <Text style={s.stressSub}>{DEMO.stressLevel}% · {stress.label}</Text>
      </View>

      {/* Readiness */}
      <View style={s.card}>
        <View style={s.cardRow}>
          <Text style={s.cardLabel}>{t('hrv_readiness')}</Text>
          <Text style={[s.stressLabel, { color: recovery.color }]}>{DEMO.recoveryScore}%</Text>
        </View>
        <ProgressBar progress={DEMO.recoveryScore / 100} color={recovery.color} height={8} />
      </View>

      {/* 7-day HRV trend */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>{t('hrv_trend')}</Text>
        <WeekBarChart data={DEMO.weeklyHRV} color={BLUE} height={70} />
        <Text style={s.chartUnit}>{t('hrv_ms')}</Text>
      </View>

      <Text style={s.note}>{t('hrv_note')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  topRow: { flexDirection: 'row', gap: 10 },
  bigCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 2,
  },
  bigNum: { fontSize: 44, fontWeight: '800', lineHeight: 50 },
  cardLabel: { fontSize: 11, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  cardUnit: { fontSize: 13, color: C.muted2, fontWeight: '600' },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 8,
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stressLabel: { fontSize: 13, fontWeight: '700' },
  stressSub: { fontSize: 11, color: C.muted, marginTop: 2 },
  sectionTitle: { fontSize: 12, color: C.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  chartUnit: { fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 4 },
  note: { fontSize: 11, color: C.muted, textAlign: 'center', lineHeight: 16 },
});
