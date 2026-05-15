# Kinora

Companion app for the Wovo Band fitness tracker.

Tracks steps, heart rate, sleep, HRV, recovery, and daily activity.

**Stack:** Expo SDK 54 · React Native 0.81.5 · TypeScript · expo-router v4

---

## Requirements

- Node.js 18+
- npm 9+
- [Expo Go](https://expo.dev/client) on your Android device (for local testing)
- [EAS CLI](https://docs.expo.dev/eas/) for building APK / AAB

---

## Install

```bash
npm install --legacy-peer-deps
```

---

## Development

```bash
npx expo start
```

Scan the QR code with Expo Go.

---

## Validate bundle

```bash
npx expo export --platform android
```

---

## Build APK (for testing)

```bash
eas login
eas build --platform android --profile preview
```

Produces a `.apk` you can install directly on any Android device.

---

## Build AAB (for Google Play)

```bash
eas build --platform android --profile production
```

Produces a `.aab` ready to upload to Google Play.

---

## Upload to Google Play

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app → **Kinora**
3. Under **Release → Internal testing** → upload the `.aab`
4. Complete store listing, screenshots, and privacy policy
5. Promote to production when approved

---

## Project structure

```
app/
  (tabs)/          # Bottom tab screens
    index.tsx      # Dashboard
    activity.tsx   # Steps + weekly chart
    health.tsx     # Sleep / HR / HRV overview
    device.tsx     # Device screen (demo mode)
    more.tsx       # Shop, Profile, Goals, FAQ, Legal
  sleep.tsx
  heartrate.tsx
  hrv.tsx
  goals.tsx
  profile.tsx
  shop.tsx
  settings.tsx
  faq.tsx
  legal.tsx

components/        # Button, MetricCard, ProgressBar, WeekBarChart, DemoModeBanner
constants/         # colors, demoData, i18n (EN/NL/FR), storage keys
context/           # LanguageContext
hooks/             # useBandData (BLE stub)
```

---

## Before publishing

- [ ] BLE connection to Wovo Band hardware (`hooks/useBandData.ts`)
- [ ] Live sensor data replacing demo values
- [ ] Privacy policy at a public URL
- [ ] Google Play screenshots (min. 2)
- [ ] App signing keystore (EAS generates on first build)

---

## Contact

hello@wovoband.com
