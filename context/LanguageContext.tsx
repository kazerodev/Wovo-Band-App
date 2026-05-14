import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { T, Lang } from '@/constants/i18n';

interface LangCtx {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  t: (k) => k,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem('wb-lang').then(saved => {
      if (saved && T[saved as Lang]) setLangState(saved as Lang);
    });
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    AsyncStorage.setItem('wb-lang', l);
  }

  function t(key: string): string {
    return T[lang][key] ?? T['en'][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
