import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { C } from '@/constants/colors';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', style }: Props) {
  if (variant === 'outline') {
    return (
      <TouchableOpacity style={[s.outline, style]} onPress={onPress} activeOpacity={0.75}>
        <Text style={s.outlineText}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
      <LinearGradient
        colors={[C.pri, '#1fb8a6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.gradient}
      >
        <Text style={s.primaryText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  outline: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.pri,
    alignItems: 'center',
  },
  outlineText: {
    color: C.pri,
    fontSize: 16,
    fontWeight: '600',
  },
});
