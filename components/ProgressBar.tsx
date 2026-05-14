import React from 'react';
import { View, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

interface Props {
  progress: number; // 0–1
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color = C.pri, height = 6 }: Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <View style={[s.track, { height }]}>
      <View style={[s.fill, { width: `${clamped * 100}%`, backgroundColor: color, height }]} />
    </View>
  );
}

const s = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 99,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: 99,
  },
});
