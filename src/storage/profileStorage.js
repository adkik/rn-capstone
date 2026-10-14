import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@little-lemon/profile';

export async function loadProfile() {
  const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
  return savedProfile ? JSON.parse(savedProfile) : null;
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearProfile() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}
