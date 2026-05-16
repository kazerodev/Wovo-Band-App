import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CLIENT_IDS } from '@/constants/googleAuth';

WebBrowser.maybeCompleteAuthSession();

const USER_KEY = 'wb-google-user';

export type GoogleUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

type AuthContextType = {
  user: GoogleUser | null;
  loading: boolean;
  configured: boolean;
  signInWithGoogle: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  configured: false,
  signInWithGoogle: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [loading, setLoading] = useState(true);

  const configured = Boolean(
    GOOGLE_CLIENT_IDS.androidClientId || GOOGLE_CLIENT_IDS.webClientId
  );

  const [, response, promptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_CLIENT_IDS.androidClientId || undefined,
    webClientId: GOOGLE_CLIENT_IDS.webClientId || undefined,
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    AsyncStorage.getItem(USER_KEY).then(v => {
      if (v) setUser(JSON.parse(v));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  async function fetchUserInfo(token: string) {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const u: GoogleUser = {
        id: data.id ?? '',
        name: data.name ?? '',
        email: data.email ?? '',
        picture: data.picture,
      };
      setUser(u);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {
      // sign-in completed but user info fetch failed — user stays null
    }
  }

  function signInWithGoogle() {
    if (configured) promptAsync();
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, configured, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
