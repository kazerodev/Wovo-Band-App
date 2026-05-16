import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

const ACCENT = '#F87171';

function HRBarChart({ data }: { data: readonly number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const hours = ['0', '3', '6', '9', '12', '15', '18', '21', '23'];

  return (
    <View>
      <View style={bc.wrap}>
        {data.map((v, i) => {
          const h = ((v - min) / range) * 60 + 8;
          const isHigh = v === max;
          return (
            <View key={i} style={bc.col}>
              <View style={[bc.bar, { height: h, backgroundColor: isHigh ? ACCENT : ACCENT + '66' }]} />
            </View>
          );
        })}
      </View>
      <View style={bc.xRow}>
        {hours.map(h => (
          <Text key={h} style={bc.xLabel}>{h}</Text>
        ))}
      </View>
    </View>
  );
}

export default function HeartRateScreen() {
  const { t } = useLang();

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <DemoModeBanner />

      {/* Current */}
      <View style={s.mainCard}>
        <Text style={s.cardLabel}>{t('hr_current')}</Text>
        <View style={s.valueRow}>
          <Text style={[s.bigValue, { color: ACCENT }]}>{DEMO.heartRate}</Text>
          <Text style={s.unit}>{t('hr_bpm')}</Text>
        </View>

        <View style={s.statsRow}>
          <StatItem label={t('hr_resting')} value={DEMO.restingHR} unit={t('hr_bpm')} color={ACCENT} />
          <View style={s.divider} />
          <StatItem label={t('hr_high')}    value={DEMO.maxHR}     unit={t('hr_bpm')} color={ACCENT} />
          <View style={s.divider} />
          <StatItem label={t('hr_low')}     value={DEMO.minHR}     unit={t('hr_bpm')} color={C.muted2} />
        </View>
      </View>

      {/* Daily chart */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>{t('hr_today')}</Text>
        <HRBarChart data={DEMO.dailyHR} />
        <Text style={s.chartNote}>24h — peak: {DEMO.maxHR} {t('hr_bpm')}</Text>
      </View>

      <View style={s.insightCard}>
        <Text style={s.insightText}>{t('insight_hr')}</Text>
      </View>
      <Text style={s.note}>{t('hr_note')}</Text>
    </ScrollView>
  );
}

function StatItem({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 20, fontWeight: '800', color }}>{value}</Text>
      <Text style={{ fontSize: 11, color: C.muted }}>{unit}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  mainCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 16,
  },
  cardLabel: { fontSize: 12, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  bigValue: { fontSize: 64, fontWeight: '800', lineHeight: 68 },
  unit: { fontSize: 18, color: C.muted2, marginBottom: 10, fontWeight: '500' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: C.card2,
    borderRadius: 10,
    padding: 12,
  },
  divider: { width: 1, backgroundColor: C.border, marginVertical: 4 },
  sectionTitle: { fontSize: 12, color: C.muted, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 8,
  },
  chartNote: { fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 4 },
  note: { fontSize: 11, color: C.muted, textAlign: 'center' },
  insightCard: { backgroundColor: C.card2, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  insightText: { fontSize: 13, color: C.muted2, lineHeight: 19 },
});

const bc = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 72,
    gap: 1,
  },
  col: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 2,
  },
  xRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  xLabel: {
    fontSize: 9,
    color: C.muted,
  },
});
