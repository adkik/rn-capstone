import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Brand from '../components/Brand';
import Field from '../components/Field';
import IntroHero from '../components/IntroHero';
import { colors } from '../constants/theme';
import { createProfile } from '../data/profile';
import { saveProfile } from '../storage/profileStorage';

export default function OnboardingScreen({ navigation, onComplete }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
  const ready = firstName.trim().length > 0 && validEmail;

  async function handleNext() {
    if (!ready) return;

    const profile = createProfile(firstName, email);
    await saveProfile(profile);
    onComplete(profile);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Brand />
        <IntroHero />
        <View style={styles.form}>
          <Text style={styles.heading}>Welcome to Little Lemon</Text>
          <Text style={styles.helper}>Tell us a little about yourself to get started.</Text>
          <Field
            label="First name *"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Your first name"
          />
          <Field
            label="Email *"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Pressable
            onPress={handleNext}
            disabled={!ready}
            style={[styles.nextButton, !ready && styles.disabledButton]}
          >
            <Text style={styles.nextText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 32 },
  form: { paddingHorizontal: 20, paddingTop: 22 },
  heading: { color: colors.ink, fontSize: 19, fontWeight: '900', letterSpacing: 0.3 },
  helper: { color: '#626c68', fontSize: 15, marginTop: 8, marginBottom: 18 },
  nextButton: {
    height: 52,
    backgroundColor: colors.yellow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  disabledButton: { opacity: 0.48 },
  nextText: { color: colors.ink, fontSize: 17, fontWeight: '800' },
});
