import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import IntroHero from '../components/IntroHero';
import { colors } from '../constants/theme';
import { categories, dishes } from '../data/menu';

export default function HomeScreen({ navigation, profile }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState('');

  const visibleDishes = useMemo(() => dishes.filter(dish => {
    const matchesCategory = !selectedCategory || dish.category === selectedCategory;
    const searchText = `${dish.name} ${dish.description}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  }), [selectedCategory, query]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader profile={profile} onProfilePress={() => navigation.navigate('Profile')} />
        <IntroHero showSearch query={query} setQuery={setQuery} />
        <View style={styles.menu}>
          <Text style={styles.heading}>ORDER FOR DELIVERY!</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map(category => {
              const selected = selectedCategory === category;
              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(selected ? null : category)}
                  style={[styles.categoryChip, selected && styles.selectedChip]}
                >
                  <Text style={[styles.categoryText, selected && styles.selectedText]}>{category}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={styles.rule} />
          {visibleDishes.map(dish => <DishRow key={dish.name} dish={dish} />)}
          {visibleDishes.length === 0 && (
            <Text style={styles.empty}>No dishes found. Try another search.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DishRow({ dish }) {
  return (
    <View style={styles.dishRow}>
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
        <Text style={styles.price}>{dish.price}</Text>
      </View>
      <Image source={{ uri: dish.image }} style={styles.dishImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 24 },
  menu: { paddingHorizontal: 20, paddingTop: 28 },
  heading: { color: colors.ink, fontSize: 19, fontWeight: '900', letterSpacing: 0.3 },
  categoryList: { gap: 12, paddingVertical: 18 },
  categoryChip: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#edefee', borderRadius: 22 },
  selectedChip: { backgroundColor: colors.green },
  categoryText: { color: colors.green, fontWeight: '800', fontSize: 15 },
  selectedText: { color: colors.white },
  rule: { height: 1, backgroundColor: colors.border, marginBottom: 4 },
  dishRow: {
    minHeight: 126,
    borderBottomWidth: 1,
    borderColor: '#eceeed',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 12,
  },
  dishInfo: { flex: 1 },
  dishName: { fontSize: 17, fontWeight: '800', color: colors.ink },
  description: { color: colors.muted, fontSize: 14, lineHeight: 19, marginTop: 7 },
  price: { color: colors.green, fontSize: 15, fontWeight: '700', marginTop: 9 },
  dishImage: { height: 84, width: 84, borderRadius: 8, backgroundColor: '#e7ebe9' },
  empty: { color: '#65716d', paddingVertical: 24 },
});
