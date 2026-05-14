import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  LANG:    'wb-lang',
  PROFILE: 'wb-profile',
  GOALS:   'wb-goals',
  DEVICE:  'wb-device',
} as const;

export async function load<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export async function save(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
