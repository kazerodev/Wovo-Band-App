import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HIRAGANA, KATAKANA, VOCABULARY, Kana, VocabItem } from '@/constants/japaneseData';
import { C } from '@/constants/colors';

const QUESTIONS_PER_ROUND = 10;

type QType = 'hiragana' | 'katakana' | 'vocab';

interface Question {
  type: QType;
  prompt: string;
  promptSub?: string;
  correct: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function wrongKanaOptions(correct: string, pool: Kana[]): string[] {
  return shuffle(pool.filter((k) => k.romaji !== correct))
    .slice(0, 3)
    .map((k) => k.romaji);
}

function wrongVocabOptions(correct: string, pool: VocabItem[]): string[] {
  return shuffle(pool.filter((v) => v.es !== correct))
    .slice(0, 3)
    .map((v) => v.es);
}

function buildQuestions(): Question[] {
  const qs: Question[] = [];

  const hPick = pick(HIRAGANA, 3);
  hPick.forEach((h) => {
    const opts = shuffle([h.romaji, ...wrongKanaOptions(h.romaji, HIRAGANA)]);
    qs.push({ type: 'hiragana', prompt: h.kana, promptSub: 'Hiragana', correct: h.romaji, options: opts });
  });

  const kPick = pick(KATAKANA, 3);
  kPick.forEach((k) => {
    const opts = shuffle([k.romaji, ...wrongKanaOptions(k.romaji, KATAKANA)]);
    qs.push({ type: 'katakana', prompt: k.kana, promptSub: 'Katakana', correct: k.romaji, options: opts });
  });

  const vPick = pick(VOCABULARY, 4);
  vPick.forEach((v) => {
    const opts = shuffle([v.es, ...wrongVocabOptions(v.es, VOCABULARY)]);
    qs.push({
      type: 'vocab',
      prompt: v.jp,
      promptSub: v.kana !== v.jp ? v.kana : v.romaji,
      correct: v.es,
      options: opts,
    });
  });

  return shuffle(qs).slice(0, QUESTIONS_PER_ROUND);
}

type Phase = 'idle' | 'playing' | 'done';

const PROMPT_COLOR: Record<QType, string> = {
  hiragana: C.pri,
  katakana: C.accent,
  vocab:    '#F59E0B',
};

export default function QuizScreen() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);

  const start = useCallback(() => {
    setQuestions(buildQuestions());
    setCurrent(0);
    setScore(0);
    setChosen(null);
    setPhase('playing');
  }, []);

  function select(opt: string) {
    if (chosen) return;
    setChosen(opt);
    if (opt === questions[current].correct) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setPhase('done');
    } else {
      setCurrent((c) => c + 1);
      setChosen(null);
    }
  }

  if (phase === 'idle') {
    return (
      <View style={s.center}>
        <Text style={s.idleKana}>クイズ</Text>
        <Text style={s.idleTitle}>Quiz de japonés</Text>
        <Text style={s.idleSub}>
          {QUESTIONS_PER_ROUND} preguntas · hiragana, katakana y vocabulario
        </Text>
        <TouchableOpacity style={s.startBtn} onPress={start}>
          <Ionicons name="play" size={18} color={C.bg} style={{ marginRight: 8 }} />
          <Text style={s.startBtnText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((score / QUESTIONS_PER_ROUND) * 100);
    const msg =
      pct === 100 ? '¡Perfecto! 素晴らしい！' :
      pct >= 70   ? '¡Muy bien! よくできました！' :
      pct >= 40   ? 'Sigue practicando · がんばって！' :
                    'No te rindas · もう一度！';
    return (
      <View style={s.center}>
        <View style={s.scoreCircle}>
          <Text style={s.scoreNum}>{score}</Text>
          <Text style={s.scoreDenom}>/{QUESTIONS_PER_ROUND}</Text>
        </View>
        <Text style={s.scoreMsg}>{msg}</Text>
        <Text style={s.scorePct}>{pct}% correcto</Text>
        <TouchableOpacity style={s.startBtn} onPress={start}>
          <Ionicons name="refresh" size={18} color={C.bg} style={{ marginRight: 8 }} />
          <Text style={s.startBtnText}>Jugar de nuevo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];
  const color = PROMPT_COLOR[q.type];

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <View style={s.progressRow}>
        <Text style={s.progressLabel}>{current + 1} / {QUESTIONS_PER_ROUND}</Text>
        <Text style={s.progressScore}>✓ {score}</Text>
      </View>
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${((current) / QUESTIONS_PER_ROUND) * 100}%` as any }]} />
      </View>

      <View style={s.promptCard}>
        <Text style={s.promptSub}>{q.promptSub}</Text>
        <Text style={[s.prompt, { color }]}>{q.prompt}</Text>
        <Text style={s.promptQuestion}>¿Qué significa?</Text>
      </View>

      <View style={s.options}>
        {q.options.map((opt) => {
          const isCorrect = opt === q.correct;
          const isChosen  = opt === chosen;
          let bg = C.card;
          let border = C.border;
          let textColor = C.text;
          if (chosen) {
            if (isCorrect)        { bg = C.success + '25'; border = C.success; textColor = C.success; }
            else if (isChosen)    { bg = C.danger + '25';  border = C.danger;  textColor = C.danger; }
          }
          return (
            <TouchableOpacity
              key={opt}
              style={[s.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => select(opt)}
              activeOpacity={chosen ? 1 : 0.7}
            >
              {chosen && isCorrect && <Ionicons name="checkmark-circle" size={18} color={C.success} style={s.optIcon} />}
              {chosen && isChosen && !isCorrect && <Ionicons name="close-circle" size={18} color={C.danger} style={s.optIcon} />}
              <Text style={[s.optText, { color: textColor }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {chosen && (
        <TouchableOpacity style={s.nextBtn} onPress={next}>
          <Text style={s.nextBtnText}>
            {current + 1 < QUESTIONS_PER_ROUND ? 'Siguiente →' : 'Ver resultados'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll:   { backgroundColor: C.bg },
  content:  { padding: 16, paddingBottom: 48 },
  center: {
    flex: 1, backgroundColor: C.bg,
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  idleKana:  { fontSize: 64, color: C.danger, fontWeight: '700', marginBottom: 8 },
  idleTitle: { fontSize: 24, color: C.text, fontWeight: '700' },
  idleSub:   { fontSize: 14, color: C.muted2, marginTop: 8, textAlign: 'center' },
  startBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.pri, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 32, marginTop: 28,
  },
  startBtnText: { color: C.bg, fontWeight: '700', fontSize: 17 },
  scoreCircle: {
    flexDirection: 'row', alignItems: 'flex-end',
    backgroundColor: C.card, borderRadius: 80,
    width: 140, height: 140, justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: C.pri,
  },
  scoreNum:   { fontSize: 52, color: C.pri, fontWeight: '800' },
  scoreDenom: { fontSize: 20, color: C.muted, fontWeight: '600', marginBottom: 8 },
  scoreMsg:   { fontSize: 20, color: C.text, fontWeight: '700', marginTop: 20, textAlign: 'center' },
  scorePct:   { fontSize: 14, color: C.muted2, marginTop: 6 },
  progressRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6,
  },
  progressLabel: { fontSize: 13, color: C.muted2 },
  progressScore: { fontSize: 13, color: C.success, fontWeight: '600' },
  progressBar:  { height: 4, backgroundColor: C.card2, borderRadius: 2, marginBottom: 20 },
  progressFill: { height: 4, backgroundColor: C.pri, borderRadius: 2 },
  promptCard: {
    backgroundColor: C.card, borderRadius: 16,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20,
    marginBottom: 20,
  },
  promptSub:      { fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  prompt:         { fontSize: 56, fontWeight: '800' },
  promptQuestion: { fontSize: 15, color: C.muted2, marginTop: 16 },
  options:  { gap: 10 },
  option: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, borderWidth: 1.5,
    paddingVertical: 16, paddingHorizontal: 20,
  },
  optIcon: { marginRight: 10 },
  optText: { fontSize: 16, fontWeight: '500', flex: 1 },
  nextBtn: {
    marginTop: 20, backgroundColor: C.pri,
    borderRadius: 14, paddingVertical: 14, alignItems: 'center',
  },
  nextBtnText: { color: C.bg, fontSize: 16, fontWeight: '700' },
});
