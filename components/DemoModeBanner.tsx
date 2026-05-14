import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '@/constants/colors';

export function DemoModeBanner() {
  return (
    <View style={s.wrap}>
      <Ionicons name="information-circle-outline" size={14} color="#FBBF24" />
      <Text style={s.text}>Demo data — connect your Wovo Band for live data</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.25)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  text: {
    fontSize: 12,
    color: '#FBBF24',
    flex: 1,
  },
});
