import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
  Switch, StyleSheet, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { DEMO, DEFAULT_DEVICE } from '@/constants/demoData';
import { KEYS, load, save } from '@/constants/storage';
import { useLang } from '@/context/LanguageContext';
import { useBle } from '@/context/BleContext';
import { ProgressBar } from '@/components/ProgressBar';
import { C } from '@/constants/colors';

type DeviceSettings = typeof DEFAULT_DEVICE;

function nowHHMM() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export default function DeviceScreen() {
  const { t } = useLang();
  const {
    bleEnabled, scanning, devices, connectedDevice,
    requestPermissions, startScan, stopScan, connect, disconnect,
  } = useBle();

  const [settings, setSettings] = useState<DeviceSettings>(DEFAULT_DEVICE);
  const [lastSync, setLastSync]  = useState('');
  const [syncing, setSyncing]    = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([
      load(KEYS.DEVICE, DEFAULT_DEVICE),
      AsyncStorage.getItem(KEYS.LAST_SYNC),
    ]).then(([dev, sync]) => {
      setSettings(dev);
      setLastSync(sync ?? '');
    });
  }, []);

  async function update(patch: Partial<DeviceSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    await save(KEYS.DEVICE, next);
  }

  async function handleSync() {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 1200));
    const time = nowHHMM();
    await AsyncStorage.setItem(KEYS.LAST_SYNC, time);
    setLastSync(time);
    setSyncing(false);
  }

  async function handleScan() {
    if (hasPermission === null || !hasPermission) {
      const granted = await requestPermissions();
      setHasPermission(granted);
      if (!granted) return;
    }
    if (scanning) { stopScan(); return; }
    startScan();
  }

  const bleStatusColor = connectedDevice ? C.success : bleEnabled ? C.pri : C.muted;
  const bleStatusText  = connectedDevice
    ? t('ble_connected')
    : bleEnabled ? t('ble_disconnected') : t('ble_disabled');

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* BLE connection card */}
      <View style={s.bleCard}>
        <View style={s.bleHeader}>
          <View style={[s.bleDot, { backgroundColor: bleStatusColor }]} />
          <Text style={s.bleTitle}>{t('device_name')}</Text>
          <Text style={[s.bleStatus, { color: bleStatusColor }]}>{bleStatusText}</Text>
        </View>

        {connectedDevice ? (
          <View style={s.connectedBox}>
            <Ionicons name="bluetooth" size={20} color={C.success} />
            <View style={{ flex: 1 }}>
              <Text style={s.connName}>{connectedDevice.name ?? connectedDevice.id}</Text>
              {connectedDevice.rssi != null && (
                <Text style={s.connRssi}>{t('ble_rssi')}: {connectedDevice.rssi} dBm</Text>
              )}
            </View>
            <TouchableOpacity style={s.disconnectBtn} onPress={disconnect} activeOpacity={0.8}>
              <Text style={s.disconnectText}>{t('ble_disconnect')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={[s.scanBtn, !bleEnabled && s.scanBtnDisabled]}
              onPress={handleScan}
              disabled={!bleEnabled}
              activeOpacity={0.8}
            >
              {scanning
                ? <ActivityIndicator size={14} color={C.pri} />
                : <Ionicons name="bluetooth-outline" size={16} color={bleEnabled ? C.pri : C.muted} />
              }
              <Text style={[s.scanText, !bleEnabled && { color: C.muted }]}>
                {scanning ? t('ble_scanning') : t('ble_scan')}
              </Text>
            </TouchableOpacity>

            {devices.length > 0 && (
              <View style={s.deviceList}>
                {devices.map(device => (
                  <TouchableOpacity
                    key={device.id}
                    style={s.deviceRow}
                    onPress={() => connect(device)}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="watch-outline" size={18} color={C.muted2} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.deviceName}>{device.name}</Text>
                      {device.rssi != null && (
                        <Text style={s.deviceRssi}>{device.rssi} dBm</Text>
                      )}
                    </View>
                    <Text style={s.connectText}>{t('ble_connect')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!scanning && devices.length === 0 && bleEnabled && (
              <Text style={s.noDevices}>{t('ble_no_devices')}</Text>
            )}
          </>
        )}
      </View>

      {/* Demo device info */}
      <View style={s.bandCard}>
        <View style={s.battRow}>
          <Text style={s.battLabel}>{t('device_battery')}</Text>
          <Text style={s.battValue}>{DEMO.battery}%</Text>
        </View>
        <ProgressBar progress={DEMO.battery / 100} color="#FBBF24" height={6} />

        <View style={s.infoRow}>
          <InfoItem label={t('device_sync')} value={lastSync || t('sync_never')} />
          <InfoItem label={t('device_firmware')} value={DEMO.firmwareVersion} />
        </View>

        <Text style={s.demoNote}>{t('device_mode_note')}</Text>

        <TouchableOpacity
          style={[s.btn, s.btnOutline, syncing && s.btnDisabled]}
          onPress={handleSync}
          disabled={syncing}
          activeOpacity={0.8}
        >
          {syncing
            ? <ActivityIndicator size={14} color={C.pri} />
            : <Ionicons name="sync-outline" size={16} color={C.pri} />
          }
          <Text style={[s.btnText, { color: C.pri }]}>
            {syncing ? t('sync_syncing') : t('device_sync_btn')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={s.sectionTitle}>
        <Text style={s.sectionTitleText}>{t('device_settings_title')}</Text>
      </View>

      <View style={s.prefCard}>
        <PrefRow
          label={t('device_notifications')}
          right={
            <Switch
              value={settings.notifications}
              onValueChange={v => update({ notifications: v })}
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

  bleCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    gap: 12,
  },
  bleHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bleDot: { width: 8, height: 8, borderRadius: 4 },
  bleTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: C.text },
  bleStatus: { fontSize: 12, fontWeight: '600' },

  connectedBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.card2, borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: C.success + '44',
  },
  connName: { fontSize: 14, fontWeight: '700', color: C.text },
  connRssi: { fontSize: 11, color: C.muted, marginTop: 2 },
  disconnectBtn: {
    borderRadius: 8, borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  disconnectText: { fontSize: 12, color: C.muted2, fontWeight: '600' },

  scanBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 10, paddingVertical: 12,
    borderWidth: 1, borderColor: C.pri, backgroundColor: 'transparent',
  },
  scanBtnDisabled: { borderColor: C.border },
  scanText: { fontSize: 13, color: C.pri, fontWeight: '600' },

  deviceList: { gap: 2 },
  deviceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 10, paddingHorizontal: 4,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  deviceName: { fontSize: 14, color: C.text, fontWeight: '600' },
  deviceRssi: { fontSize: 11, color: C.muted },
  connectText: { fontSize: 12, color: C.pri, fontWeight: '700' },

  noDevices: { fontSize: 12, color: C.muted, textAlign: 'center', paddingVertical: 4 },

  bandCard: {
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border,
    padding: 16, gap: 12,
  },
  battRow: { flexDirection: 'row', justifyContent: 'space-between' },
  battLabel: { fontSize: 13, color: C.muted },
  battValue: { fontSize: 13, color: '#FBBF24', fontWeight: '700' },
  infoRow: { flexDirection: 'row', gap: 16 },
  demoNote: { fontSize: 11, color: C.muted, lineHeight: 16, fontStyle: 'italic' },
  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: 10, paddingVertical: 12,
    borderWidth: 1, borderColor: C.border,
  },
  btnOutline: { borderColor: C.pri, backgroundColor: 'transparent' },
  btnDisabled: { opacity: 0.6 },
  btnText: { fontSize: 13, color: C.text, fontWeight: '600' },

  sectionTitle: { paddingHorizontal: 4 },
  sectionTitleText: {
    fontSize: 12, fontWeight: '700', color: C.muted,
    textTransform: 'uppercase', letterSpacing: 0.8,
  },
  prefCard: {
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border, overflow: 'hidden',
  },
  segmented: {
    flexDirection: 'row', backgroundColor: C.card2,
    borderRadius: 8, overflow: 'hidden',
  },
  seg: { paddingHorizontal: 12, paddingVertical: 6 },
  segActive: { backgroundColor: C.pri, borderRadius: 8 },
  segText: { fontSize: 12, color: C.muted2, fontWeight: '600' },
  segTextActive: { color: '#000' },
});

const pr = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  border: { borderBottomWidth: 1, borderBottomColor: C.border },
  label: { fontSize: 15, color: C.text },
});
