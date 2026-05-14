import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

interface Props {
  data: readonly number[];
  color?: string;
  height?: number;
  todayIndex?: number;
}

const DEFAULT_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function WeekBarChart({ data, color = C.pri, height = 80, todayIndex }: Props) {
  const max = Math.max(...data, 1);
  const today = todayIndex ?? ((new Date().getDay() + 6) % 7); // Mon=0

  return (
    <View style={[s.wrap, { height: height + 20 }]}>
      {data.map((val, i) => {
        const barH = Math.max(4, (val / max) * height);
        const isToday = i === today;
        return (
          <View key={i} style={s.col}>
            <View style={[s.barBg, { height }]}>
              <View style={[
                s.bar,
                { height: barH, backgroundColor: isToday ? color : color + '55' },
              ]} />
            </View>
            <Text style={[s.day, isToday && { color: color, fontWeight: '700' }]}>
              {DEFAULT_DAYS[i]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barBg: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  day: {
    fontSize: 10,
    color: C.muted,
  },
});
