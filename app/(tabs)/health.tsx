import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { ProgressBar } from '@/components/ProgressBar';
import { C } from '@/constants/colors';

interface HealthCardProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  title: string;
  sub: string;
  value: string;
  unit?: string;
  progress?: number;
  route: string;
}

function HealthCard({ icon, color, title, sub, value, unit, progress, route }: HealthCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity style={s.card} onPress={() => router.navigate(route as any)} activeOpacity={0.75}>
      <View style={s.cardTop}>
        <View style={[s.iconWrap, { backgroundColor: color + '22' }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={s.cardText}>
          <Text style={s.cardTitle}>{title}</Text>
          <Text style={s.cardSub}>{sub}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={C.muted} />
      </View>
      <View style={s.cardMetric}>
        <Text style={[s.metricValue, { color }]}>{value}</Text>
        {unit ? <Text style={s.metricUnit}>{unit}</Text> : null}
      </View>
      {progress !== undefined && (
        <ProgressBar progress={progress} color={color} height={4} />
      )}
    </TouchableOpacity>
  );
}

export default function HealthScreen() {
  const { t } = useLang();
  const sleepStr = `${Math.floor(DEMO.sleepHours)}${t('dash_h')} ${Math.round((DEMO.sleepHours % 1) * 60)}${t('dash_min')}`;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Text style={s.pageTitle}>{t('health_title')}</Text>
      <Text style={s.pageSub}>{t('health_subtitle')}</Text>
      <DemoModeBanner />

      <HealthCard
        icon="moon-outline"
        color="#818CF8"
        title={t('health_sleep')}
        sub={t('health_sleep_sub')}
        value={sleepStr}
        progress={DEMO.sleepQuality / 100}
        route="/sleep"
      />

      <HealthCard
        icon="heart-outline"
        color="#F87171"
        title={t('health_heart')}
        sub={t('health_heart_sub')}
        value={`${DEMO.heartRate}`}
        unit={t('hr_bpm')}
        route="/heartrate"
      />

      <HealthCard
        icon="pulse-outline"
        color="#60A5FA"
        title={t('health_hrv')}
        sub={t('health_hrv_sub')}
        value={`${DEMO.hrv}`}
        unit={t('hrv_ms')}
        progress={DEMO.recoveryScore / 100}
        route="/hrv"
      />

      <View style={s.noteWrap}>
        <Ionicons name="alert-circle-outline" size={13} color={C.muted} />
        <Text style={s.note}>{t('health_note')}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 10 },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 2,
  },
  pageSub: {
    fontSize: 13,
    color: C.muted,
    marginBottom: 4,
  },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 10,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  cardSub: {
    fontSize: 12,
    color: C.muted,
    marginTop: 1,
  },
  cardMetric: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
  },
  metricUnit: {
    fontSize: 14,
    color: C.muted2,
    marginBottom: 4,
  },
  noteWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  note: {
    flex: 1,
    fontSize: 11,
    color: C.muted,
    lineHeight: 16,
  },
});
