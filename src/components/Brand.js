import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function Brand({ compact = false }) {
  return (
    <View style={[styles.brand, compact && styles.compact]}>
      <Text style={styles.lemon}>🍋</Text>
      <Text style={styles.name}>LITTLE LEMON</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.white,
  },
  compact: { height: 48 },
  lemon: { fontSize: 30 },
  name: { color: colors.green, fontWeight: '900', fontSize: 13, letterSpacing: 3 },
});
