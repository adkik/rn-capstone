import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { colors } from './constants/theme';
import { clearProfile, loadProfile, saveProfile } from './storage/profileStorage';

export default function AppContent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleProfileSave(nextProfile) {
    await saveProfile(nextProfile);
    setProfile(nextProfile);
  }

  async function handleLogout(navigation) {
    await clearProfile();
    setProfile(null);
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <StatusBar style="dark" />
        <ActivityIndicator color={colors.green} size="large" />
      </View>
    );
  }

  return (
    <AppNavigator
      profile={profile}
      onProfileComplete={setProfile}
      onProfileSave={handleProfileSave}
      onLogout={handleLogout}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white },
});
