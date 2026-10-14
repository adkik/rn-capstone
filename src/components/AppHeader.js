import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Brand from './Brand';
import UserBadge from './UserBadge';
import { colors } from '../constants/theme';

export default function AppHeader({ profile, onProfilePress, onBack }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Go back">
          <Text style={styles.backText}>‹</Text>
        </Pressable>
      ) : <View style={styles.spacer} />}
      <Brand compact />
      <UserBadge profile={profile} onPress={onProfilePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  spacer: { width: 42 },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.green,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -4 },
});
