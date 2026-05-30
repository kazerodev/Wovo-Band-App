import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HIRAGANA, KATAKANA, VOCABULARY, Kana, VocabItem } from '@/constants/japaneseData';
import { C } from '@/constants/colors';
import { useJapanese } from '@/context/JapaneseContext';

const TOTAL = 10;

type QType = 'hiragana' | 'katakana' | 'vocab-jp-es' | 'vocab-es-jp';
type Mode = 'jp-es' | 'es-jp' | 'mixed';

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

function wrongRomaji(correct: string, pool: Kana[]) {
  return shuffle(pool.filter((k) => k.romaji !== correct)).slice(0, 3).map((k) => k.romaji);
}

function wrongEs(correct: string) {
  return shuffle(VOCABULARY.filter((v) => v.es !== correct)).slice(0, 3).map((v) => v.es);
}

function wrongJp(correct: string) {
  return shuffle(VOCABULARY.filter((v) => v.jp !== correct)).slice(0, 3).map((v) => v.jp);
}

function buildQuestions(mode: Mode): Question[] {
  const qs: Question[] = [];

  pick(HIRAGANA, 2).forEach((h) => {
    qs.push({ type: 'hiragana', prompt: h.kana, promptSub: 'Hiragana', correct: h.romaji, options: shuffle([h.romaji, ...wrongRomaji(h.romaji, HIRAGANA)]) });
  });
  pick(KATAKANA, 2).forEach((k) => {
    qs.push({ type: 'katakana', prompt: k.kana, promptSub: 'Katakana', correct: k.romaji, options: shuffle([k.romaji, ...wrongRomaji(k.romaji, KATAKANA)]) });
  });

  const vocabItems = pick(VOCABULARY, 6);
  vocabItems.forEach((v, i) => {
    const isEsJp = mode === 'es-jp' || (mode === 'mixed' && i % 2 === 1);
    if (isEsJp) {
      qs.push({
        type: 'vocab-es-jp', prompt: v.es, promptSub: 'Español → Japonés',
        correct: v.jp, options: shuffle([v.jp, ...wrongJp(v.jp)]),
      });
    } else {
      qs.push({
        type: 'vocab-jp-es', prompt: v.jp,
        promptSub: v.kana !== v.jp ? v.kana : v.romaji,
        correct: v.es, options: shuffle([v.es, ...wrongEs(v.es)]),
      });
    }
  });

  return shuffle(qs).slice(0, TOTAL);
}

type Phase = 'config' | 'playing' | 'done';

const PROMPT_COLOR: Record<QType, string> = {
  hiragana: C.pri, katakana: C.accent, 'vocab-jp-es': '#F59E0B', 'vocab-es-jp': C.success,
};

const MODE_LABELS: Record<Mode, string> = {
  'jp-es': 'JP → ES',
  'es-jp': 'ES → JP',
  'mixed': 'Mixto',
};

export default function QuizScreen() {
  const { quizBestScore, saveQuizScore } = useJapanese();
  const [phase, setPhase]     = useState<Phase>('config');
  const [mode, setMode]       = useState<Mode>('jp-es');
  const [questions, setQs]    = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore]     = useState(0);
  const [chosen, setChosen]   = useState<string | null>(null);

  const start = useCallback(() => {
    setQs(buildQuestions(mode));
    setCurrent(0); setScore(0); setChosen(null);
    setPhase('playing');
  }, [mode]);

  function select(opt: string) {
    if (chosen) return;
    setChosen(opt);
    if (opt === questions[current].correct) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      saveQuizScore(score + (chosen === questions[current].correct ? 0 : 0));
      setPhase('done');
    } else {
      setCurrent((c) => c + 1);
      setChosen(null);
    }
  }

  if (phase === 'config') {
    return (
      <View style={s.center}>
        <Text style={s.idleKana}>クイズ</Text>
        <Text style={s.idleTitle}>Quiz de japonés</Text>
        <Text style={s.idleSub}>{TOTAL} preguntas · hiragana, katakana y vocabulario</Text>
        {quizBestScore > 0 && (
          <View style={s.bestRow}>
            <Ionicons name="trophy-outline" size={14} color="#F59E0B" />
            <Text style={s.bestText}>Mejor puntuación: {quizBestScore}/{TOTAL}</Text>
          </View>
        )}
        <Text style={s.modeLabel}>Modo de traducción</Text>
        <View style={s.modeRow}>
          {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
            <TouchableOpacity
              key={m}
              style={[s.modeBtn, mode === m && s.modeBtnActive]}
              onPress={() => setMode(m)}
            >
              <Text style={[s.modeBtnText, mode === m && s.modeBtnTextActive]}>{MODE_LABELS[m]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.startBtn} onPress={start}>
          <Ionicons name="play" size={18} color={C.bg} style={{ marginRight: 8 }} />
          <Text style={s.startBtnText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((score / TOTAL) * 100);
    const msg =
      pct === 100 ? '¡Perfecto! 素晴らしい！' :
      pct >= 70   ? '¡Muy bien! よくできました！' :
      pct >= 40   ? 'Sigue practicando · がんばって！' :
                    'No te rindas · もう一度！';
    const isRecord = score >= quizBestScore && quizBestScore > 0 && score > 0;
    return (
      <View style={s.center}>
        {isRecord && (
          <View style={s.recordBadge}>
            <Ionicons name="trophy" size={14} color="#F59E0B" />
            <Text style={s.recordText}>¡Nuevo récord!</Text>
          </View>
        )}
        <View style={s.scoreCircle}>
          <Text style={s.scoreNum}>{score}</Text>
          <Text style={s.scoreDenom}>/{TOTAL}</Text>
        </View>
        <Text style={s.scoreMsg}>{msg}</Text>
        <Text style={s.scorePct}>{pct}% correcto</Text>
        <TouchableOpacity style={s.startBtn} onPress={() => setPhase('config')}>
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
        <Text style={s.progressLabel}>{current + 1} / {TOTAL}</Text>
        <Text style={s.progressScore}>✓ {score}</Text>
      </View>
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${(current / TOTAL) * 100}%` as any }]} />
      </View>

      <View style={s.promptCard}>
        <Text style={s.promptSub}>{q.promptSub}</Text>
        <Text style={[s.prompt, { color, fontSize: q.type.startsWith('vocab') ? 40 : 56 }]}>{q.prompt}</Text>
      </View>

      <View style={s.options}>
        {q.options.map((opt) => {
          const isCorrect = opt === q.correct;
          const isChosen  = opt === chosen;
          let bg = C.card, border = C.border, textColor = C.text;
          if (chosen) {
            if (isCorrect)         { bg = C.success + '25'; border = C.success; textColor = C.success; }
            else if (isChosen)     { bg = C.danger + '25';  border = C.danger;  textColor = C.danger; }
          }
          return (
            <TouchableOpacity
              key={opt}
              style={[s.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => select(opt)}
              activeOpacity={chosen ? 1 : 0.7}
            >
              {chosen && isCorrect  && <Ionicons name="checkmark-circle" size={18} color={C.success} style={s.optIcon} />}
              {chosen && isChosen && !isCorrect && <Ionicons name="close-circle" size={18} color={C.danger} style={s.optIcon} />}
              <Text style={[s.optText, { color: textColor }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {chosen && (
        <TouchableOpacity style={s.nextBtn} onPress={next}>
          <Text style={s.nextBtnText}>
            {current + 1 < TOTAL ? 'Siguiente →' : 'Ver resultados'}
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
  idleKana:    { fontSize: 64, color: C.danger, fontWeight: '700', marginBottom: 8 },
  idleTitle:   { fontSize: 24, color: C.text, fontWeight: '700' },
  idleSub:     { fontSize: 14, color: C.muted2, marginTop: 6, textAlign: 'center' },
  bestRow:     { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  bestText:    { fontSize: 13, color: '#F59E0B' },
  modeLabel:   { fontSize: 13, color: C.muted, marginTop: 24, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 },
  modeRow:     { flexDirection: 'row', gap: 8 },
  modeBtn: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1, borderColor: C.border, backgroundColor: C.card,
  },
  modeBtnActive:     { backgroundColor: C.pri + '22', borderColor: C.pri },
  modeBtnText:       { fontSize: 14, color: C.muted2, fontWeight: '500' },
  modeBtnTextActive: { color: C.pri },
  startBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.pri, borderRadius: 14,
    paddingVertical: 14, paddingHorizontal: 32, marginTop: 24,
  },
  startBtnText: { color: C.bg, fontWeight: '700', fontSize: 17 },
  recordBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#F59E0B20', borderRadius: 8, padding: 8, marginBottom: 16,
  },
  recordText:   { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
  scoreCircle: {
    flexDirection: 'row', alignItems: 'flex-end',
    backgroundColor: C.card, borderRadius: 80,
    width: 140, height: 140, justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: C.pri,
  },
  scoreNum:    { fontSize: 52, color: C.pri, fontWeight: '800' },
  scoreDenom:  { fontSize: 20, color: C.muted, fontWeight: '600', marginBottom: 8 },
  scoreMsg:    { fontSize: 20, color: C.text, fontWeight: '700', marginTop: 20, textAlign: 'center' },
  scorePct:    { fontSize: 14, color: C.muted2, marginTop: 6 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 13, color: C.muted2 },
  progressScore: { fontSize: 13, color: C.success, fontWeight: '600' },
  progressBar:   { height: 4, backgroundColor: C.card2, borderRadius: 2, marginBottom: 20, overflow: 'hidden' },
  progressFill:  { height: 4, backgroundColor: C.pri, borderRadius: 2 },
  promptCard: {
    backgroundColor: C.card, borderRadius: 16,
    borderWidth: 1, borderColor: C.border,
    alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, marginBottom: 20,
  },
  promptSub: { fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  prompt:    { fontWeight: '800', textAlign: 'center' },
  options:   { gap: 10 },
  option: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 12, borderWidth: 1.5,
    paddingVertical: 16, paddingHorizontal: 20,
  },
  optIcon:    { marginRight: 10 },
  optText:    { fontSize: 16, fontWeight: '500', flex: 1 },
  nextBtn: {
    marginTop: 20, backgroundColor: C.pri,
    borderRadius: 14, paddingVertical: 14, alignItems: 'center',
  },
  nextBtnText: { color: C.bg, fontSize: 16, fontWeight: '700' },
});
