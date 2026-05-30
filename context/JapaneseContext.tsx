import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'wovo-jp-progress-v1';

interface Progress {
  studiedHiragana: string[];
  studiedKatakana: string[];
  learnedVocab: string[];
  quizBestScore: number;
  quizTotalPlayed: number;
}

interface JapaneseCtx extends Progress {
  markHiragana: (kana: string) => void;
  markKatakana: (kana: string) => void;
  toggleVocab: (key: string) => void;
  saveQuizScore: (score: number) => void;
  resetProgress: () => void;
  loaded: boolean;
}

const DEFAULT: Progress = {
  studiedHiragana: [],
  studiedKatakana: [],
  learnedVocab: [],
  quizBestScore: 0,
  quizTotalPlayed: 0,
};

const JapaneseContext = createContext<JapaneseCtx>({
  ...DEFAULT,
  loaded: false,
  markHiragana: () => {},
  markKatakana: () => {},
  toggleVocab: () => {},
  saveQuizScore: () => {},
  resetProgress: () => {},
});

export function JapaneseProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Progress>(DEFAULT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => {
      if (v) setData({ ...DEFAULT, ...JSON.parse(v) });
      setLoaded(true);
    });
  }, []);

  function persist(next: Progress) {
    setData(next);
    AsyncStorage.setItem(KEY, JSON.stringify(next));
  }

  function markHiragana(kana: string) {
    if (data.studiedHiragana.includes(kana)) return;
    persist({ ...data, studiedHiragana: [...data.studiedHiragana, kana] });
  }

  function markKatakana(kana: string) {
    if (data.studiedKatakana.includes(kana)) return;
    persist({ ...data, studiedKatakana: [...data.studiedKatakana, kana] });
  }

  function toggleVocab(key: string) {
    const next = data.learnedVocab.includes(key)
      ? data.learnedVocab.filter((k) => k !== key)
      : [...data.learnedVocab, key];
    persist({ ...data, learnedVocab: next });
  }

  function saveQuizScore(score: number) {
    persist({
      ...data,
      quizBestScore: Math.max(data.quizBestScore, score),
      quizTotalPlayed: data.quizTotalPlayed + 1,
    });
  }

  function resetProgress() {
    persist(DEFAULT);
  }

  return (
    <JapaneseContext.Provider
      value={{ ...data, loaded, markHiragana, markKatakana, toggleVocab, saveQuizScore, resetProgress }}
    >
      {children}
    </JapaneseContext.Provider>
  );
}

export function useJapanese() {
  return useContext(JapaneseContext);
}
