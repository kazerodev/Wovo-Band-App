export const DEMO = {
  // Today's metrics
  steps:          8420,
  stepsGoal:      10000,
  heartRate:      72,
  restingHR:      64,
  maxHR:          118,
  minHR:          58,
  sleepHours:     7.4,
  sleepDeep:      1.8,
  sleepLight:     4.9,
  sleepAwake:     0.7,
  sleepQuality:   78,   // 0–100
  hrv:            58,   // ms
  stressLevel:    32,   // 0–100, lower = less stress
  recoveryScore:  74,   // 0–100
  calories:       420,
  activeMinutes:  48,
  activeGoal:     30,
  distance:       5.8,  // km
  battery:        84,   // %
  lastSync:       '09:45',
  firmwareVersion:'2.1.4',

  // Weekly (Mon → Sun, last index = today partial)
  weeklySteps: [6200, 9800, 7400, 10200, 5800, 8420, 3200],
  weeklyHRV:   [54,   61,   58,   72,    65,   58,   62],

  // Hourly heart rate (0–23 h)
  dailyHR: [
    62, 60, 61, 59, 61, 65,
    72, 78, 74, 71, 73, 76,
    74, 72, 75, 78, 80, 76,
    73, 71, 70, 68, 65, 64,
  ],
} as const;

// Default goals (overridden by AsyncStorage)
export const DEFAULT_GOALS = {
  steps:         10000,
  sleepHours:    8,
  activeMinutes: 30,
};

// Default profile
export const DEFAULT_PROFILE = {
  name:   '',
  age:    '',
  height: '',
  weight: '',
  gender: 'na',
  units:  'metric' as 'metric' | 'imperial',
};

// Default device settings
export const DEFAULT_DEVICE = {
  notifications: true,
  units:         'metric' as 'metric' | 'imperial',
  wrist:         'left' as 'left' | 'right',
};
