import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, heroImage } from '../constants/theme';

export default function IntroHero({ showSearch = false, query = '', setQuery }) {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.city}>Chicago</Text>
      <View style={styles.body}>
        <View style={styles.copy}>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image source={{ uri: heroImage }} style={styles.image} />
      </View>
      {showSearch && (
        <View style={styles.search}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search menu"
            placeholderTextColor="#596c65"
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.green, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },
  title: {
    color: colors.yellow,
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 43,
    lineHeight: 49,
  },
  city: { color: '#fff', fontFamily: 'serif', fontSize: 26, marginTop: -2 },
  body: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 16 },
  copy: { flex: 1 },
  description: { color: '#fff', fontSize: 16, lineHeight: 22, letterSpacing: 0.2 },
  image: { width: '39%', height: 138, borderRadius: 18, backgroundColor: '#d8dedb' },
  search: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 14,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIcon: { fontSize: 28, color: colors.green, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#202124' },
});
