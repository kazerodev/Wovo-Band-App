/**
 * useBandData — single source of truth for all band metrics.
 *
 * TODAY: returns static demo data. isDemo = true.
 *
 * TO CONNECT A REAL BAND:
 *  1. Install: npx expo install expo-modules-core react-native-ble-plx
 *  2. Request BLUETOOTH_SCAN + BLUETOOTH_CONNECT permissions (Android 12+)
 *  3. Scan for the Wovo Band service UUID (from supplier SDK docs)
 *  4. Read BLE characteristics for HR, steps, sleep, HRV, battery
 *  5. Replace the `return { data: DEMO, ... }` below with live BLE state
 *
 * Alternative path: if the supplier provides a REST/cloud API,
 * replace BLE reads with fetch() calls and poll on a timer.
 *
 * Health Connect (Android 8+) integration:
 *  - Install: npx expo install expo-health-connect
 *  - Write steps, HR, sleep to Android Health Connect after each sync
 *  - This lets other apps (Google Fit, Samsung Health) see the data
 */

import { DEMO } from '@/constants/demoData';

export type BandData = typeof DEMO;

export interface BandState {
  data: BandData;
  isConnected: boolean;
  isDemo: boolean;
  lastSyncTime: string | null;
}

export function useBandData(): BandState {
  // Swap this body for real BLE/API state when SDK is available
  return {
    data:         DEMO,
    isConnected:  false,
    isDemo:       true,
    lastSyncTime: DEMO.lastSync,
  };
}
