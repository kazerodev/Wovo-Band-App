import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  RefreshControl, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { DEMO, DEFAULT_GOALS } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
import { MetricCard } from '@/components/MetricCard';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { C } from '@/constants/colors';

function fmt(n: number) {
  return n.toLocaleString('en');
}

function nowHHMM() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function DashboardScreen() {
  const { t } = useLang();
  const router = useRouter();

  const [goals, setGoals]         = useState(DEFAULT_GOALS);
  const [lastSync, setLastSync]   = useState('');
  const [syncing, setSyncing]     = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEYS.ONBOARDED).then(val => {
      if (!val) router.replace('/onboarding' as any);
    });
    loadAll();
  }, []);

  async function loadAll() {
    const [g, sync] = await Promise.all([
      load(KEYS.GOALS, DEFAULT_GOALS),
      AsyncStorage.getItem(KEYS.LAST_SYNC),
    ]);
    setGoals(g);
    setLastSync(sync ?? '');
  }

  async function doSync() {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1200));
    const time = nowHHMM();
    await AsyncStorage.setItem(KEYS.LAST_SYNC, time);
    setLastSync(time);
    setSyncing(false);
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadAll(), doSync()]);
    setRefreshing(false);
  }, []);

  const sleepStr = `${Math.floor(DEMO.sleepHours)}${t('dash_h')} ${Math.round((DEMO.sleepHours % 1) * 60)}${t('dash_min')}`;

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={C.pri}
          colors={[C.pri]}
        />
      }
    >
      <View style={s.header}>
        <View>
          <Text style={s.title}>{t('dash_today')}</Text>
          <Text style={s.sub}>{t('dash_subtitle')}</Text>
        </View>
        <TouchableOpacity
          style={[s.syncBtn, syncing && s.syncBtnDisabled]}
          onPress={doSync}
          disabled={syncing}
          activeOpacity={0.75}
        >
          {syncing
            ? <ActivityIndicator size={14} color={C.pri} />
            : <Ionicons name="sync-outline" size={16} color={C.pri} />
          }
          <Text style={s.syncText}>
            {syncing ? t('sync_syncing') : t('sync_now')}
          </Text>
        </TouchableOpacity>
      </View>

      {lastSync ? (
        <Text style={s.lastSync}>{t('sync_last')}: {lastSync}</Text>
      ) : null}

      <DemoModeBanner />

      <View style={s.grid}>
        <View style={s.fullRow}>
          <MetricCard
            icon="footsteps-outline"
            iconColor={C.pri}
            label={t('dash_steps')}
            value={fmt(DEMO.steps)}
            sub={`${t('act_of')} ${fmt(goals.steps)}`}
            progress={Math.min(1, DEMO.steps / goals.steps)}
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
            progress={Math.min(1, DEMO.calories / goals.calories)}
            onPress={() => router.navigate('/(tabs)/activity')}
          />
          <MetricCard
            icon="walk-outline"
            iconColor="#34D399"
            label={t('dash_active')}
            value={DEMO.activeMinutes}
            unit={t('dash_min')}
            progress={Math.min(1, DEMO.activeMinutes / goals.activeMinutes)}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  title: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 2 },
  sub:   { fontSize: 13, color: C.muted },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  syncBtnDisabled: { opacity: 0.6 },
  syncText: { fontSize: 12, color: C.pri, fontWeight: '600' },
  lastSync: { fontSize: 11, color: C.muted, marginTop: -4 },
  grid: { gap: 10 },
  row:  { flexDirection: 'row', gap: 10 },
  fullRow: {},
  disclaimer: {
    fontSize: 11,
    color: C.muted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
  },
});
