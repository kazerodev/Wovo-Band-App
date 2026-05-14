import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@/components/ProgressBar';
import { C } from '@/constants/colors';

interface Props {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  iconColor: string;
  label: string;
  value: string | number;
  unit?: string;
  sub?: string;
  progress?: number; // 0–1, shows bar if provided
  onPress?: () => void;
}

export function MetricCard({ icon, iconColor, label, value, unit, sub, progress, onPress }: Props) {
  const Inner = (
    <View style={s.card}>
      <View style={[s.iconWrap, { backgroundColor: iconColor + '22' }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={s.label}>{label}</Text>
      <View style={s.valueRow}>
        <Text style={[s.value, { color: iconColor }]}>{value}</Text>
        {unit ? <Text style={s.unit}>{unit}</Text> : null}
      </View>
      {sub ? <Text style={s.sub}>{sub}</Text> : null}
      {progress !== undefined && (
        <View style={s.barWrap}>
          <ProgressBar progress={progress} color={iconColor} height={4} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.75} style={s.root}>
        {Inner}
      </TouchableOpacity>
    );
  }
  return <View style={s.root}>{Inner}</View>;
}

const s = StyleSheet.create({
  root: { flex: 1 },
  card: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    gap: 4,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: C.muted,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
  },
  unit: {
    fontSize: 12,
    color: C.muted2,
    marginBottom: 3,
    fontWeight: '500',
  },
  sub: {
    fontSize: 11,
    color: C.muted,
    marginTop: 2,
  },
  barWrap: {
    marginTop: 6,
  },
});
