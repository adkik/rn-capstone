import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform,
  Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const STORAGE_KEY = '@little-lemon/profile';
const GREEN = '#495e57';
const YELLOW = '#f4ce14';
const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];
const DISHES = [
  { name: 'Greek Salad', category: 'Starters', description: 'Crisp lettuce, peppers, olives and our house-made feta.', price: '$12.99', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=240&h=240&fit=crop' },
  { name: 'Bruschetta', category: 'Starters', description: 'Grilled bread with garlic, tomatoes and fresh basil.', price: '$7.99', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=240&h=240&fit=crop' },
  { name: 'Grilled Fish', category: 'Mains', description: 'Catch of the day with lemon, herbs and seasonal greens.', price: '$20.00', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=240&h=240&fit=crop' },
  { name: 'Pasta', category: 'Mains', description: 'Penne with roasted aubergine, tomato and fresh basil.', price: '$18.99', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=240&h=240&fit=crop' },
  { name: 'Lemon Dessert', category: 'Desserts', description: 'Light and fluffy lemon and ricotta cake, made in house.', price: '$6.99', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=240&h=240&fit=crop' },
  { name: 'Fresh Lemonade', category: 'Drinks', description: 'Freshly squeezed lemons, a little sweetness, lots of ice.', price: '$4.50', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=240&h=240&fit=crop' },
];
const HERO_IMAGE = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&h=520&fit=crop';

function Brand({ compact = false }) {
  return <View style={[styles.brand, compact && styles.brandCompact]}><Text style={styles.lemon}>🍋</Text><Text style={styles.brandText}>LITTLE LEMON</Text></View>;
}

function UserBadge({ profile, onPress }) {
  const initials = `${profile?.firstName?.[0] || ''}${profile?.lastName?.[0] || ''}`.toUpperCase() || '🙂';
  return <Pressable onPress={onPress} style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></Pressable>;
}

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', autoCapitalize = 'words' }) {
  return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#8b8f98" keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoCorrect={false} /></View>;
}

function IntroHero({ showSearch = false, query, setQuery }) {
  return <View style={styles.hero}><Text style={styles.heroTitle}>Little Lemon</Text><Text style={styles.heroCity}>Chicago</Text><View style={styles.heroBody}><View style={styles.heroCopy}><Text style={styles.heroDescription}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text></View><Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} /></View>{showSearch && <View style={styles.searchWrap}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Search menu" placeholderTextColor="#596c65" style={styles.searchInput} returnKeyType="search" /></View>}</View>;
}

function OnboardingScreen({ navigation, onComplete }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const ready = firstName.trim().length > 0 && validEmail;
  const submit = async () => {
    if (!ready) return;
    const profile = { firstName: firstName.trim(), lastName: '', email: email.trim(), phone: '', notifications: { orders: true, password: true, offers: false, newsletter: false } };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    onComplete(profile);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };
  return <SafeAreaView style={styles.safe}><StatusBar style="dark" /><ScrollView contentContainerStyle={styles.onboardingContent} keyboardShouldPersistTaps="handled"><Brand /><IntroHero /><View style={styles.form}><Text style={styles.sectionHeading}>Welcome to Little Lemon</Text><Text style={styles.helper}>Tell us a little about yourself to get started.</Text><Field label="First name *" value={firstName} onChangeText={setFirstName} placeholder="Your first name" /><Field label="Email *" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" /><Pressable onPress={submit} disabled={!ready} style={[styles.primaryButton, !ready && styles.disabledButton]}><Text style={styles.primaryButtonText}>Next</Text></Pressable></View></ScrollView></SafeAreaView>;
}

function HomeScreen({ navigation, profile }) {
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState('');
  const shown = useMemo(() => DISHES.filter(dish => (!category || dish.category === category) && `${dish.name} ${dish.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <SafeAreaView style={styles.safe} edges={['top']}><StatusBar style="dark" /><ScrollView contentContainerStyle={styles.homeContent}><View style={styles.header}><View style={styles.headerSpacer} /><Brand compact /><UserBadge profile={profile} onPress={() => navigation.navigate('Profile')} /></View><IntroHero showSearch query={query} setQuery={setQuery} /><View style={styles.menuSection}><Text style={styles.sectionHeading}>ORDER FOR DELIVERY!</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{CATEGORIES.map(item => <Pressable key={item} onPress={() => setCategory(category === item ? null : item)} style={[styles.chip, category === item && styles.chipActive]}><Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text></Pressable>)}</ScrollView><View style={styles.rule} />{shown.map(dish => <View key={dish.name} style={styles.dishRow}><View style={styles.dishInfo}><Text style={styles.dishName}>{dish.name}</Text><Text style={styles.dishDescription} numberOfLines={2}>{dish.description}</Text><Text style={styles.dishPrice}>{dish.price}</Text></View><Image source={{ uri: dish.image }} style={styles.dishImage} /></View>)}{shown.length === 0 && <Text style={styles.emptyText}>No dishes found. Try another search.</Text>}</View></ScrollView></SafeAreaView>;
}

function ProfileScreen({ navigation, profile, onSave, onLogout }) {
  const [draft, setDraft] = useState(profile);
  useEffect(() => setDraft(profile), [profile]);
  const update = (key, value) => setDraft(current => ({ ...current, [key]: value }));
  const toggle = key => setDraft(current => ({ ...current, notifications: { ...current.notifications, [key]: !current.notifications[key] } }));
  const save = async () => { await onSave(draft); Alert.alert('Saved', 'Your profile changes have been saved.'); };
  const logout = () => Alert.alert('Log out?', 'This clears your saved profile and returns to onboarding.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Log out', style: 'destructive', onPress: onLogout }]);
  return <SafeAreaView style={styles.safe} edges={['top']}><StatusBar style="dark" /><ScrollView contentContainerStyle={styles.profileContent} keyboardShouldPersistTaps="handled"><View style={styles.header}><Pressable onPress={() => navigation.goBack()} style={styles.backButton}><Text style={styles.backText}>‹</Text></Pressable><Brand compact /><UserBadge profile={draft} onPress={() => {}} /></View><View style={styles.profileCard}><Text style={styles.profileHeading}>Personal information</Text><Text style={styles.avatarLabel}>Avatar</Text><View style={styles.avatarActions}><View style={[styles.avatar, styles.largeAvatar]}><Text style={styles.avatarText}>{`${draft.firstName?.[0] || ''}${draft.lastName?.[0] || ''}`.toUpperCase() || '🙂'}</Text></View><Pressable onPress={() => Alert.alert('Avatar', 'Avatar photo selection can be added here.')} style={styles.smallButton}><Text style={styles.smallButtonText}>Change</Text></Pressable><Pressable onPress={() => {}} style={styles.outlineButton}><Text style={styles.outlineButtonText}>Remove</Text></Pressable></View><Field label="First name" value={draft.firstName} onChangeText={v => update('firstName', v)} placeholder="First name" /><Field label="Last name" value={draft.lastName} onChangeText={v => update('lastName', v)} placeholder="Last name" /><Field label="Email" value={draft.email} onChangeText={v => update('email', v)} placeholder="Email" keyboardType="email-address" autoCapitalize="none" /><Field label="Phone number" value={draft.phone} onChangeText={v => update('phone', v)} placeholder="Phone number" keyboardType="phone-pad" /><Text style={styles.notificationHeading}>Email notifications</Text>{[['orders', 'Order statuses'], ['password', 'Password changes'], ['offers', 'Special offers'], ['newsletter', 'Newsletter']].map(([key, label]) => <Pressable key={key} onPress={() => toggle(key)} style={styles.checkRow}><View style={[styles.checkbox, draft.notifications?.[key] && styles.checked]}><Text style={styles.checkmark}>{draft.notifications?.[key] ? '✓' : ''}</Text></View><Text style={styles.checkLabel}>{label}</Text></Pressable>)}<Pressable onPress={logout} style={styles.logoutButton}><Text style={styles.logoutText}>Log out</Text></Pressable><View style={styles.profileActions}><Pressable onPress={() => { setDraft(profile); navigation.goBack(); }} style={styles.outlineButton}><Text style={styles.outlineButtonText}>Discard changes</Text></Pressable><Pressable onPress={save} style={styles.smallButton}><Text style={styles.smallButtonText}>Save changes</Text></Pressable></View></View></ScrollView></SafeAreaView>;
}

function AppContent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then(value => { if (value) setProfile(JSON.parse(value)); }).catch(() => {}).finally(() => setLoading(false)); }, []);
  const saveProfile = async next => { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setProfile(next); };
  const logout = async navigation => { await AsyncStorage.removeItem(STORAGE_KEY); setProfile(null); navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] }); };
  if (loading) return <SafeAreaView style={styles.loading}><ActivityIndicator color={GREEN} size="large" /></SafeAreaView>;
  return <NavigationContainer><Stack.Navigator initialRouteName={profile ? 'Home' : 'Onboarding'} screenOptions={{ headerShown: false, animation: 'slide_from_right' }}><Stack.Screen name="Onboarding">{props => <OnboardingScreen {...props} onComplete={setProfile} />}</Stack.Screen><Stack.Screen name="Home">{props => <HomeScreen {...props} profile={profile} />}</Stack.Screen><Stack.Screen name="Profile">{props => <ProfileScreen {...props} profile={profile} onSave={saveProfile} onLogout={() => logout(props.navigation)} />}</Stack.Screen></Stack.Navigator></NavigationContainer>;
}

export default function App() { return <SafeAreaProvider><AppContent /></SafeAreaProvider>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' }, loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  onboardingContent: { paddingBottom: 32 }, brand: { height: 76, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, backgroundColor: '#fff' }, brandCompact: { height: 48 }, lemon: { fontSize: 30 }, brandText: { color: GREEN, fontWeight: '900', fontSize: 13, letterSpacing: 3 },
  hero: { backgroundColor: GREEN, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 }, heroTitle: { color: YELLOW, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }), fontWeight: 'bold', fontSize: 43, lineHeight: 49 }, heroCity: { color: '#fff', fontFamily: 'serif', fontSize: 26, marginTop: -2 }, heroBody: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 16 }, heroCopy: { flex: 1 }, heroDescription: { color: '#fff', fontSize: 16, lineHeight: 22, letterSpacing: 0.2 }, heroImage: { width: '39%', height: 138, borderRadius: 18, backgroundColor: '#d8dedb' }, searchWrap: { marginTop: 18, backgroundColor: '#fff', borderRadius: 14, height: 48, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }, searchIcon: { fontSize: 28, color: GREEN, marginRight: 8 }, searchInput: { flex: 1, fontSize: 16, color: '#202124' },
  form: { paddingHorizontal: 20, paddingTop: 22 }, sectionHeading: { color: '#151515', fontSize: 19, fontWeight: '900', letterSpacing: 0.3 }, helper: { color: '#626c68', fontSize: 15, marginTop: 8, marginBottom: 18 }, field: { marginTop: 15 }, fieldLabel: { fontSize: 16, color: '#686868', fontWeight: '700', marginBottom: 8 }, input: { height: 54, borderWidth: 1.5, borderColor: '#c5c8d2', borderRadius: 9, paddingHorizontal: 13, fontSize: 17, color: '#252638', backgroundColor: '#fff' }, primaryButton: { height: 52, backgroundColor: YELLOW, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 26 }, disabledButton: { opacity: 0.48 }, primaryButtonText: { color: '#151515', fontSize: 17, fontWeight: '800' },
  homeContent: { paddingBottom: 24 }, header: { height: 60, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff' }, headerSpacer: { width: 42 }, avatar: { height: 42, width: 42, borderRadius: 24, backgroundColor: '#dfe8e4', borderWidth: 1, borderColor: '#d1ddd8', alignItems: 'center', justifyContent: 'center' }, avatarText: { fontWeight: '800', color: GREEN, fontSize: 16 }, menuSection: { paddingHorizontal: 20, paddingTop: 28 }, categoryRow: { gap: 12, paddingVertical: 18 }, chip: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#edefee', borderRadius: 22 }, chipActive: { backgroundColor: GREEN }, chipText: { color: GREEN, fontWeight: '800', fontSize: 15 }, chipTextActive: { color: '#fff' }, rule: { height: 1, backgroundColor: '#d4d7d5', marginBottom: 4 }, dishRow: { minHeight: 126, borderBottomWidth: 1, borderColor: '#eceeed', flexDirection: 'row', alignItems: 'center', paddingVertical: 15, gap: 12 }, dishInfo: { flex: 1 }, dishName: { fontSize: 17, fontWeight: '800', color: '#171717' }, dishDescription: { color: '#62736d', fontSize: 14, lineHeight: 19, marginTop: 7 }, dishPrice: { color: GREEN, fontSize: 15, fontWeight: '700', marginTop: 9 }, dishImage: { height: 84, width: 84, borderRadius: 8, backgroundColor: '#e7ebe9' }, emptyText: { color: '#65716d', paddingVertical: 24 },
  profileContent: { paddingBottom: 24 }, backButton: { width: 40, height: 40, backgroundColor: GREEN, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }, backText: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -4 }, profileCard: { borderWidth: 1, borderColor: '#e5e6e8', borderRadius: 18, marginHorizontal: 12, paddingHorizontal: 14, paddingTop: 22, paddingBottom: 24 }, profileHeading: { color: '#292a3d', fontSize: 19, fontWeight: '800' }, avatarLabel: { color: '#74798b', fontSize: 12, marginTop: 18 }, avatarActions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10, marginBottom: 8 }, largeAvatar: { height: 76, width: 76 }, smallButton: { backgroundColor: GREEN, minHeight: 44, paddingHorizontal: 16, borderRadius: 9, alignItems: 'center', justifyContent: 'center' }, smallButtonText: { color: '#fff', fontWeight: '800', fontSize: 14 }, outlineButton: { minHeight: 44, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: GREEN, alignItems: 'center', justifyContent: 'center' }, outlineButtonText: { color: '#656b83', fontWeight: '700', fontSize: 14 }, notificationHeading: { color: '#292a3d', fontSize: 17, fontWeight: '800', marginTop: 18, marginBottom: 6 }, checkRow: { height: 42, flexDirection: 'row', alignItems: 'center', gap: 11 }, checkbox: { width: 20, height: 20, borderWidth: 1.5, borderColor: '#91999a', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: GREEN, borderColor: GREEN }, checkmark: { color: '#fff', fontWeight: '900', fontSize: 13 }, checkLabel: { color: '#46495a', fontSize: 14 }, logoutButton: { marginTop: 20, backgroundColor: YELLOW, borderRadius: 8, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#dfa900' }, logoutText: { color: '#171717', fontWeight: '800', fontSize: 15 }, profileActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 10 },
});
