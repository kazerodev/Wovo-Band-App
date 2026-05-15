# Kinora — companion app for Wovo Band

Kinora is the official companion app for the **Wovo Band** smart fitness tracker.
Track steps, heart rate, sleep, HRV, recovery, and daily activity — all in one dark-premium interface.

Built with **Expo SDK 54 · React Native 0.81.5 · TypeScript · expo-router v4**.

---

## Requirements

- Node.js 18+
- npm 9+
- [Expo Go](https://expo.dev/client) on your Android or iOS device (for local testing)
- [EAS CLI](https://docs.expo.dev/eas/) for building APK / AAB

---

## Install

```bash
npm install --legacy-peer-deps
```

---

## Run with Expo (dev mode)

```bash
npx expo start
# or on a specific port:
npx expo start --port 8082
```

Scan the QR code in the terminal with the Expo Go app on your device.

---

## Test on Android (without device)

Validate the bundle compiles cleanly:

```bash
npx expo export --platform android
```

No errors = bundle is valid.

---

## Generate APK (for testing)

Requires an [Expo account](https://expo.dev) and EAS CLI installed:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

This produces a `.apk` you can install directly on any Android device.

---

## Generate AAB (for Google Play)

```bash
eas build --platform android --profile production
```

This produces a `.aab` (Android App Bundle) ready to upload to Google Play.

---

## Upload to Google Play

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app → **Kinora**
3. Complete the store listing (see `docs/play-store-listing.md`)
4. Under **Release → Internal testing** → upload the `.aab`
5. Once approved, promote to production

---

## Project structure

```
app/
  (tabs)/          # Bottom tab screens
    index.tsx      # Dashboard
    activity.tsx   # Steps + weekly chart
    health.tsx     # Health hub (Sleep / HR / HRV)
    device.tsx     # Device settings (demo mode)
    more.tsx       # Shop, Profile, Goals, FAQ, Legal
  sleep.tsx        # Sleep detail screen
  heartrate.tsx    # Heart rate detail screen
  hrv.tsx          # HRV & recovery detail screen
  goals.tsx        # Editable daily goals
  profile.tsx      # User profile (stored locally)
  shop.tsx         # Buy Wovo Band (Stripe Payment Links)
  settings.tsx     # Language selector
  faq.tsx          # FAQ
  legal.tsx        # Legal / disclaimer

components/        # Shared UI: Button, MetricCard, ProgressBar, WeekBarChart, DemoModeBanner
constants/         # Colors, demoData, i18n (EN/NL/FR), storage keys
context/           # LanguageContext (AsyncStorage-persisted)
hooks/             # useBandData (BLE-ready stub)
scripts/           # generate-icons.ps1 (PNG icon generator)
```

---

## What's missing before publishing

- [ ] Real BLE connection to Wovo Band hardware (see `hooks/useBandData.ts`)
- [ ] Replace demo data with live sensor readings
- [ ] Privacy policy page hosted at a public URL
- [ ] Google Play store screenshots (5 required)
- [ ] `google-services-key.json` for automated Google Play submission
- [ ] App signing keystore (generated automatically by EAS on first build)
- [ ] Final review of legal disclaimers with legal counsel

---

## Contact

Support: hello@wovoband.com  
Website: https://wovoband.com
