import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { DEMO } from '@/constants/demoData';
import { useLang } from '@/context/LanguageContext';
import { MetricCard } from '@/components/MetricCard';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

function fmt(n: number) {
  return n.toLocaleString('en');
}

export default function DashboardScreen() {
  const { t } = useLang();
  const router = useRouter();

  const sleepStr = `${Math.floor(DEMO.sleepHours)}${t('dash_h')} ${Math.round((DEMO.sleepHours % 1) * 60)}${t('dash_min')}`;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.title}>{t('dash_today')}</Text>
        <Text style={s.sub}>{t('dash_subtitle')}</Text>
      </View>

      <DemoModeBanner />

      <View style={s.grid}>
        {/* Steps — full width to show progress bar */}
        <View style={s.fullRow}>
          <MetricCard
            icon="footsteps-outline"
            iconColor={C.pri}
            label={t('dash_steps')}
            value={fmt(DEMO.steps)}
            sub={`${t('act_of')} ${fmt(DEMO.stepsGoal)}`}
            progress={DEMO.steps / DEMO.stepsGoal}
            onPress={() => router.navigate('/(tabs)/activity')}
          />
        </View>

        <View style={s.row}>
          <MetricCard
            icon="heart-outline"
            iconColor="#F87171"
            label={t('dash_heart')}
            value={DEMO.heartRate}
            unit={t('dash_bpm')}
            onPress={() => router.navigate('/heartrate')}
          />
          <MetricCard
            icon="moon-outline"
            iconColor="#818CF8"
            label={t('dash_sleep')}
            value={sleepStr}
            onPress={() => router.navigate('/sleep')}
          />
        </View>

        <View style={s.row}>
          <MetricCard
            icon="flame-outline"
            iconColor="#FB923C"
            label={t('dash_calories')}
            value={DEMO.calories}
            unit={t('dash_kcal')}
            onPress={() => router.navigate('/(tabs)/activity')}
          />
          <MetricCard
            icon="walk-outline"
            iconColor="#34D399"
            label={t('dash_active')}
            value={DEMO.activeMinutes}
            unit={t('dash_min')}
            progress={DEMO.activeMinutes / DEMO.activeGoal}
            onPress={() => router.navigate('/(tabs)/activity')}
          />
        </View>

        <View style={s.row}>
          <MetricCard
            icon="pulse-outline"
            iconColor="#60A5FA"
            label={t('dash_hrv')}
            value={DEMO.hrv}
            unit={t('dash_ms')}
            onPress={() => router.navigate('/hrv')}
          />
          <MetricCard
            icon="battery-charging-outline"
            iconColor="#FBBF24"
            label={t('dash_battery')}
            value={`${DEMO.battery}%`}
            progress={DEMO.battery / 100}
            onPress={() => router.navigate('/(tabs)/device')}
          />
        </View>
      </View>

      <Text style={s.disclaimer}>{t('dash_disclaimer')}</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  header: { paddingVertical: 4 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: C.text,
    marginBottom: 2,
  },
  sub: {
    fontSize: 13,
    color: C.muted,
  },
  grid: { gap: 10 },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  fullRow: {},
  disclaimer: {
    fontSize: 11,
    color: C.muted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
  },
});
