// Returns demo data for all screens. Replace with BLE reads or API calls when hardware is available.
import { DEMO } from '@/constants/demoData';

export type BandData = typeof DEMO;

export interface BandState {
  data: BandData;
  isConnected: boolean;
  isDemo: boolean;
  lastSyncTime: string | null;
}

export function useBandData(): BandState {
  return {
    data:         DEMO,
    isConnected:  false,
    isDemo:       true,
    lastSyncTime: DEMO.lastSync,
  };
}
