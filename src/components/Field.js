import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'words',
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8b8f98"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginTop: 15 },
  label: { fontSize: 16, color: '#686868', fontWeight: '700', marginBottom: 8 },
  input: {
    height: 54,
    borderWidth: 1.5,
    borderColor: '#c5c8d2',
    borderRadius: 9,
    paddingHorizontal: 13,
    fontSize: 17,
    color: '#252638',
    backgroundColor: '#fff',
  },
});
