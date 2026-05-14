import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DEMO, DEFAULT_DEVICE } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
import { ProgressBar } from '@/components/ProgressBar';
import { C } from '@/constants/colors';

type DeviceSettings = typeof DEFAULT_DEVICE;

export default function DeviceScreen() {
  const { t } = useLang();
  const [settings, setSettings] = useState<DeviceSettings>(DEFAULT_DEVICE);

  useEffect(() => {
    load(KEYS.DEVICE, DEFAULT_DEVICE).then(setSettings);
  }, []);

  async function update(patch: Partial<DeviceSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    await save(KEYS.DEVICE, next);
  }

  function handlePair() {
    Alert.alert(
      t('device_pair'),
      t('device_mode_note'),
      [{ text: 'OK' }]
    );
  }

  function handleSync() {
    Alert.alert('Sync', 'Demo mode — no real sync available yet.', [{ text: 'OK' }]);
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      {/* Band card */}
      <View style={s.bandCard}>
        <View style={s.bandTop}>
          <View style={s.bandIcon}>
            <Ionicons name="watch-outline" size={32} color={C.pri} />
          </View>
          <View style={s.bandInfo}>
            <Text style={s.bandName}>{t('device_name')}</Text>
            <View style={s.demoTag}>
              <Ionicons name="information-circle" size={12} color="#FBBF24" />
              <Text style={s.demoText}>{t('device_mode')}</Text>
            </View>
          </View>
        </View>

        {/* Battery */}
        <View style={s.battRow}>
          <Text style={s.battLabel}>{t('device_battery')}</Text>
          <Text style={s.battValue}>{DEMO.battery}%</Text>
        </View>
        <ProgressBar progress={DEMO.battery / 100} color="#FBBF24" height={6} />

        <View style={s.infoRow}>
          <InfoItem label={t('device_sync')} value={DEMO.lastSync} />
          <InfoItem label={t('device_firmware')} value={DEMO.firmwareVersion} />
        </View>

        <Text style={s.demoNote}>{t('device_mode_note')}</Text>

        <View style={s.btnRow}>
          <TouchableOpacity style={s.btn} onPress={handlePair} activeOpacity={0.8}>
            <Ionicons name="bluetooth-outline" size={16} color={C.text} />
            <Text style={s.btnText}>{t('device_pair')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn, s.btnOutline]} onPress={handleSync} activeOpacity={0.8}>
            <Ionicons name="sync-outline" size={16} color={C.pri} />
            <Text style={[s.btnText, { color: C.pri }]}>{t('device_sync_btn')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences */}
      <View style={s.sectionTitle}>
        <Text style={s.sectionTitleText}>{t('device_settings_title')}</Text>
      </View>

      <View style={s.prefCard}>
        <PrefRow
          label={t('device_notifications')}
          right={
            <Switch
              value={settings.notifications}
              onValueChange={(v) => update({ notifications: v })}
              trackColor={{ false: C.border, true: C.pri }}
              thumbColor={C.text}
            />
          }
        />
        <PrefRow
          label={t('device_wrist')}
          right={
            <View style={s.segmented}>
              {(['left', 'right'] as const).map(w => (
                <TouchableOpacity
                  key={w}
                  style={[s.seg, settings.wrist === w && s.segActive]}
                  onPress={() => update({ wrist: w })}
                >
                  <Text style={[s.segText, settings.wrist === w && s.segTextActive]}>
                    {t(w === 'left' ? 'device_left' : 'device_right')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
        />
        <PrefRow
          label={t('device_units')}
          right={
            <View style={s.segmented}>
              {(['metric', 'imperial'] as const).map(u => (
                <TouchableOpacity
                  key={u}
                  style={[s.seg, settings.units === u && s.segActive]}
                  onPress={() => update({ units: u })}
                >
                  <Text style={[s.segText, settings.units === u && s.segTextActive]}>
                    {u === 'metric' ? 'km' : 'mi'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          noBorder
        />
      </View>
    </ScrollView>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 14, color: C.text, fontWeight: '600' }}>{value}</Text>
    </View>
  );
}

function PrefRow({ label, right, noBorder }: { label: string; right: React.ReactNode; noBorder?: boolean }) {
  return (
    <View style={[pr.row, !noBorder && pr.border]}>
      <Text style={pr.label}>{label}</Text>
      {right}
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { backgroundColor: C.bg },
  content: { padding: 16, paddingBottom: 40, gap: 12 },
  bandCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 12,
  },
  bandTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  bandIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: C.card2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bandInfo: { flex: 1 },
  bandName: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 4,
  },
  demoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  demoText: {
    fontSize: 12,
    color: '#FBBF24',
    fontWeight: '500',
  },
  battRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  battLabel: {
    fontSize: 13,
    color: C.muted,
  },
  battValue: {
    fontSize: 13,
    color: '#FBBF24',
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  demoNote: {
    fontSize: 11,
    color: C.muted,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: C.card2,
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  btnOutline: {
    borderColor: C.pri,
    backgroundColor: 'transparent',
  },
  btnText: {
    fontSize: 13,
    color: C.text,
    fontWeight: '600',
  },
  sectionTitle: {
    paddingHorizontal: 4,
  },
  sectionTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  prefCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: C.card2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  seg: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  segActive: {
    backgroundColor: C.pri,
    borderRadius: 8,
  },
  segText: {
    fontSize: 12,
    color: C.muted2,
    fontWeight: '600',
  },
  segTextActive: {
    color: '#000',
  },
});

const pr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  label: {
    fontSize: 15,
    color: C.text,
  },
});
