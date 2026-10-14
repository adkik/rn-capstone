import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ profile, onProfileComplete, onProfileSave, onLogout }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={profile ? 'Home' : 'Onboarding'}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Onboarding">
          {props => <OnboardingScreen {...props} onComplete={onProfileComplete} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} profile={profile} />}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {props => (
            <ProfileScreen
              {...props}
              profile={profile}
              onSave={onProfileSave}
              onLogout={() => onLogout(props.navigation)}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
