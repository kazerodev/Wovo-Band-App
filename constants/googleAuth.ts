// Google OAuth 2.0 credentials
// To enable Google Sign-In:
// 1. Go to https://console.cloud.google.com
// 2. Create a project → APIs & Services → Credentials
// 3. Create OAuth 2.0 Client IDs:
//    - Web client (needed for token exchange)
//    - Android client (SHA-1 fingerprint from: eas credentials)
// 4. Add authorized redirect URI: kinora://
// 5. Paste the client IDs below
export const GOOGLE_CLIENT_IDS = {
  androidClientId: '',
  webClientId:     '',
};
