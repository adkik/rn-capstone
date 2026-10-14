import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export default function UserBadge({ profile, onPress, size = 42 }) {
  const initials = `${profile?.firstName?.[0] || ''}${profile?.lastName?.[0] || ''}`
    .toUpperCase() || '🙂';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.avatar, { height: size, width: size, borderRadius: size / 2 }]}
      accessibilityRole="button"
      accessibilityLabel="Open profile"
    >
      <Text style={[styles.initials, size > 42 && styles.largeInitials]}>{initials}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#dfe8e4',
    borderWidth: 1,
    borderColor: '#d1ddd8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontWeight: '800', color: colors.green, fontSize: 16 },
  largeInitials: { fontSize: 22 },
});
