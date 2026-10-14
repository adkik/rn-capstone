import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Field from '../components/Field';
import NotificationPreferences from '../components/NotificationPreferences';
import UserBadge from '../components/UserBadge';
import { colors } from '../constants/theme';

export default function ProfileScreen({ navigation, profile, onSave, onLogout }) {
  const [draft, setDraft] = useState(profile);

  useEffect(() => setDraft(profile), [profile]);

  function updateField(field, value) {
    setDraft(current => ({ ...current, [field]: value }));
  }

  function toggleNotification(key) {
    setDraft(current => ({
      ...current,
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    }));
  }

  async function saveChanges() {
    await onSave(draft);
    Alert.alert('Saved', 'Your profile changes have been saved.');
  }

  function confirmLogout() {
    Alert.alert(
      'Log out?',
      'This clears your saved profile and returns to onboarding.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log out', style: 'destructive', onPress: onLogout },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppHeader
          profile={draft}
          onBack={() => navigation.goBack()}
          onProfilePress={() => {}}
        />
        <View style={styles.card}>
          <Text style={styles.title}>Personal information</Text>
          <Text style={styles.avatarLabel}>Avatar</Text>
          <View style={styles.avatarActions}>
            <View style={styles.largeAvatar}><UserBadge profile={draft} size={76} /></View>
            <Pressable
              onPress={() => Alert.alert('Avatar', 'Avatar photo selection can be added here.')}
              style={styles.primarySmallButton}
            >
              <Text style={styles.primarySmallText}>Change</Text>
            </Pressable>
            <Pressable style={styles.outlineButton}>
              <Text style={styles.outlineText}>Remove</Text>
            </Pressable>
          </View>

          <Field label="First name" value={draft.firstName} onChangeText={value => updateField('firstName', value)} placeholder="First name" />
          <Field label="Last name" value={draft.lastName} onChangeText={value => updateField('lastName', value)} placeholder="Last name" />
          <Field label="Email" value={draft.email} onChangeText={value => updateField('email', value)} placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
          <Field label="Phone number" value={draft.phone} onChangeText={value => updateField('phone', value)} placeholder="Phone number" keyboardType="phone-pad" />

          <NotificationPreferences
            value={draft.notifications}
            onToggle={toggleNotification}
          />

          <Pressable onPress={confirmLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
          <View style={styles.actions}>
            <Pressable
              onPress={() => { setDraft(profile); navigation.goBack(); }}
              style={styles.outlineButton}
            >
              <Text style={styles.outlineText}>Discard changes</Text>
            </Pressable>
            <Pressable onPress={saveChanges} style={styles.primarySmallButton}>
              <Text style={styles.primarySmallText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 24 },
  card: {
    borderWidth: 1,
    borderColor: '#e5e6e8',
    borderRadius: 18,
    marginHorizontal: 12,
    paddingHorizontal: 14,
    paddingTop: 22,
    paddingBottom: 24,
  },
  title: { color: '#292a3d', fontSize: 19, fontWeight: '800' },
  avatarLabel: { color: '#74798b', fontSize: 12, marginTop: 18 },
  avatarActions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 10, marginBottom: 8 },
  largeAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe8e4',
    overflow: 'hidden',
  },
  primarySmallButton: {
    backgroundColor: colors.green,
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primarySmallText: { color: '#fff', fontWeight: '800', fontSize: 14 },
  outlineButton: {
    minHeight: 44,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: { color: '#656b83', fontWeight: '700', fontSize: 14 },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.yellow,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dfa900',
  },
  logoutText: { color: colors.ink, fontWeight: '800', fontSize: 15 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 10 },
});
