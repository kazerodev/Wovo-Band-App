import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { ProgressBar } from '@/components/ProgressBar';
import { WeekBarChart } from '@/components/WeekBarChart';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

const ACCENT = '#818CF8';

function toHM(h: number, tH: string, tM: string) {
  const hours = Math.floor(h);
  const mins  = Math.round((h % 1) * 60);
  return `${hours}${tH} ${mins}${tM}`;
}

export default function SleepScreen() {
  const { t } = useLang();
  const h = t('sleep_h'), m = t('sleep_min');

  const sleepWeekly = [6.8, 7.2, 5.9, 8.1, 7.6, 6.4, DEMO.sleepHours];

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <DemoModeBanner />

      {/* Main card */}
      <View style={s.mainCard}>
        <Text style={s.cardLabel}>{t('sleep_last')}</Text>
        <Text style={[s.bigValue, { color: ACCENT }]}>{toHM(DEMO.sleepHours, h, m)}</Text>

        <View style={s.qualityRow}>
          <Text style={s.qualityLabel}>{t('sleep_quality')}</Text>
          <Text style={[s.qualityPct, { color: ACCENT }]}>{DEMO.sleepQuality}%</Text>
        </View>
        <ProgressBar progress={DEMO.sleepQuality / 100} color={ACCENT} height={8} />
      </View>

      {/* Breakdown */}
      <Text style={s.sectionTitle}>{t('sleep_breakdown')}</Text>
      <View style={s.card}>
        <SleepRow label={t('sleep_deep')}  value={toHM(DEMO.sleepDeep,  h, m)} color="#4F46E5" pct={DEMO.sleepDeep  / DEMO.sleepHours} />
        <SleepRow label={t('sleep_light')} value={toHM(DEMO.sleepLight, h, m)} color={ACCENT}  pct={DEMO.sleepLight / DEMO.sleepHours} />
        <SleepRow label={t('sleep_awake')} value={toHM(DEMO.sleepAwake, h, m)} color="#F87171" pct={DEMO.sleepAwake / DEMO.sleepHours} last />
      </View>

      {/* Visual timeline */}
      <View style={s.card}>
        <Text style={s.timelineLabel}>{t('sleep_breakdown')}</Text>
        <View style={s.timeline}>
          {[
            { color: '#4F46E5', flex: DEMO.sleepDeep },
            { color: ACCENT,    flex: DEMO.sleepLight },
            { color: '#F87171', flex: DEMO.sleepAwake },
          ].map((seg, i) => (
            <View key={i} style={[s.timelineSeg, { flex: seg.flex, backgroundColor: seg.color }]} />
          ))}
        </View>
        <View style={s.legend}>
          {[
            { color: '#4F46E5', label: t('sleep_deep') },
            { color: ACCENT,    label: t('sleep_light') },
            { color: '#F87171', label: t('sleep_awake') },
          ].map(item => (
            <View key={item.label} style={s.legendItem}>
              <View style={[s.legendDot, { backgroundColor: item.color }]} />
              <Text style={s.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Weekly chart */}
      <Text style={s.sectionTitle}>{t('sleep_trend')}</Text>
      <View style={s.card}>
        <WeekBarChart data={sleepWeekly} color={ACCENT} height={70} />
        <Text style={s.chartUnit}>{t('sleep_h')}</Text>
      </View>

      <View style={s.tipCard}>
        <Text style={s.tipText}>
          {DEMO.sleepQuality >= 70 ? t('insight_sleep_good') : t('insight_sleep_ok')}
        </Text>
      </View>
      <Text style={s.note}>{t('sleep_note')}</Text>
    </ScrollView>
  );
}

function SleepRow({ label, value, color, pct, last }: { label: string; value: string; color: string; pct: number; last?: boolean }) {
  return (
    <View style={[sr.row, !last && sr.border]}>
      <View style={[sr.dot, { backgroundColor: color }]} />
      <Text style={sr.label}>{label}</Text>
      <View style={sr.right}>
        <Text style={[sr.value, { color }]}>{value}</Text>
        <Text style={sr.pct}>{Math.round(pct * 100)}%</Text>
      </View>
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
    gap: 8,
  },
  cardLabel: { fontSize: 12, color: C.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8 },
  bigValue: { fontSize: 42, fontWeight: '800', lineHeight: 48 },
  qualityRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  qualityLabel: { fontSize: 13, color: C.muted2 },
  qualityPct: { fontSize: 13, fontWeight: '700' },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 2 },
  card: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  timelineLabel: { fontSize: 12, color: C.muted, padding: 12, paddingBottom: 8 },
  timeline: { flexDirection: 'row', height: 20, marginHorizontal: 12, borderRadius: 6, overflow: 'hidden' },
  timelineSeg: { height: '100%' },
  legend: { flexDirection: 'row', gap: 16, padding: 12, paddingTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 11, color: C.muted2 },
  chartUnit: { fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 4, padding: 8 },
  tipCard: { backgroundColor: C.card2, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: C.border },
  tipText: { fontSize: 13, color: C.muted2, lineHeight: 19 },
  note: { fontSize: 11, color: C.muted, textAlign: 'center' },
});

const sr = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  border: { borderBottomWidth: 1, borderBottomColor: C.border },
  dot: { width: 10, height: 10, borderRadius: 5 },
  label: { flex: 1, fontSize: 14, color: C.text },
  right: { alignItems: 'flex-end' },
  value: { fontSize: 14, fontWeight: '700' },
  pct: { fontSize: 11, color: C.muted, marginTop: 1 },
});
