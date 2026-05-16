import React, {
  createContext, useContext, useState, useEffect, useCallback, useRef,
} from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { BleManager, Device, State } from 'react-native-ble-plx';

type BleContextType = {
  bleEnabled: boolean;
  scanning: boolean;
  devices: Device[];
  connectedDevice: Device | null;
  requestPermissions: () => Promise<boolean>;
  startScan: () => void;
  stopScan: () => void;
  connect: (device: Device) => Promise<void>;
  disconnect: () => Promise<void>;
};

const BleContext = createContext<BleContextType>({
  bleEnabled: false,
  scanning: false,
  devices: [],
  connectedDevice: null,
  requestPermissions: async () => false,
  startScan: () => {},
  stopScan: () => {},
  connect: async () => {},
  disconnect: async () => {},
});

async function askAndroidPermissions(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  if ((Platform.Version as number) >= 31) {
    const results = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
    return (
      results[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === 'granted' &&
      results[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === 'granted'
    );
  }
  const r = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    { title: 'Location', message: 'Bluetooth scanning requires location on Android 11 and below.', buttonPositive: 'Allow' }
  );
  return r === 'granted';
}

export function BleProvider({ children }: { children: React.ReactNode }) {
  const [manager] = useState(() => new BleManager());
  const [bleEnabled, setBleEnabled] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sub = manager.onStateChange(state => {
      setBleEnabled(state === State.PoweredOn);
    }, true);
    return () => {
      sub.remove();
      if (scanTimer.current) clearTimeout(scanTimer.current);
      manager.destroy();
    };
  }, [manager]);

  // Monitor unexpected disconnections
  useEffect(() => {
    if (!connectedDevice) return;
    const sub = manager.onDeviceDisconnected(connectedDevice.id, () => {
      setConnectedDevice(null);
    });
    return () => sub.remove();
  }, [connectedDevice, manager]);

  const requestPermissions = useCallback(askAndroidPermissions, []);

  const stopScan = useCallback(() => {
    manager.stopDeviceScan();
    setScanning(false);
    if (scanTimer.current) { clearTimeout(scanTimer.current); scanTimer.current = null; }
  }, [manager]);

  const startScan = useCallback(() => {
    if (scanning || !bleEnabled) return;
    setDevices([]);
    setScanning(true);
    manager.startDeviceScan(null, { allowDuplicates: false }, (_err, device) => {
      if (!device?.name) return;
      setDevices(prev =>
        prev.find(d => d.id === device.id) ? prev : [...prev, device]
      );
    });
    scanTimer.current = setTimeout(stopScan, 10_000);
  }, [scanning, bleEnabled, manager, stopScan]);

  const connect = useCallback(async (device: Device) => {
    stopScan();
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
    } catch {
      // connection failed — keep disconnected state
    }
  }, [manager, stopScan]);

  const disconnect = useCallback(async () => {
    if (!connectedDevice) return;
    try { await manager.cancelDeviceConnection(connectedDevice.id); } catch {}
    setConnectedDevice(null);
  }, [manager, connectedDevice]);

  return (
    <BleContext.Provider value={{
      bleEnabled, scanning, devices, connectedDevice,
      requestPermissions, startScan, stopScan, connect, disconnect,
    }}>
      {children}
    </BleContext.Provider>
  );
}

export const useBle = () => useContext(BleContext);
