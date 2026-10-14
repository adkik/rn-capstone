import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

const options = [
  ['orders', 'Order statuses'],
  ['password', 'Password changes'],
  ['offers', 'Special offers'],
  ['newsletter', 'Newsletter'],
];

export default function NotificationPreferences({ value, onToggle }) {
  return (
    <View>
      <Text style={styles.heading}>Email notifications</Text>
      {options.map(([key, label]) => {
        const checked = Boolean(value?.[key]);
        return (
          <Pressable key={key} onPress={() => onToggle(key)} style={styles.row}>
            <View style={[styles.checkbox, checked && styles.checked]}>
              <Text style={styles.checkmark}>{checked ? '✓' : ''}</Text>
            </View>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { color: '#292a3d', fontSize: 17, fontWeight: '800', marginTop: 18, marginBottom: 6 },
  row: { height: 42, flexDirection: 'row', alignItems: 'center', gap: 11 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#91999a',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: colors.green, borderColor: colors.green },
  checkmark: { color: '#fff', fontWeight: '900', fontSize: 13 },
  label: { color: '#46495a', fontSize: 14 },
});
