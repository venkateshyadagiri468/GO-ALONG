import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import LandingScreen from './src/screens/LandingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

type ScreenState = 'LANDING' | 'LOGIN' | 'REGISTER' | 'HOME';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('LANDING');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentScreen('HOME');
  };

  const handleRegisterSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentScreen('HOME');
  };

  const handleLogout = () => {
    setUserEmail(null);
    setCurrentScreen('LANDING');
  };

  // Render Screens based on navigation state
  if (currentScreen === 'LANDING') {
    return (
      <LandingScreen
        onGetStarted={() => setCurrentScreen('REGISTER')}
        onLogin={() => setCurrentScreen('LOGIN')}
      />
    );
  }

  if (currentScreen === 'LOGIN') {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.topBackBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('LANDING')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#A84218" />
            <Text style={styles.backText}>Back to Welcome</Text>
          </TouchableOpacity>
        </View>
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setCurrentScreen('REGISTER')}
        />
      </View>
    );
  }

  if (currentScreen === 'REGISTER') {
    return (
      <View style={styles.fullScreen}>
        <View style={styles.topBackBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('LANDING')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#A84218" />
            <Text style={styles.backText}>Back to Welcome</Text>
          </TouchableOpacity>
        </View>
        <RegisterScreen
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateToLogin={() => setCurrentScreen('LOGIN')}
        />
      </View>
    );
  }

  // Home Screen placeholder when logged in
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar style="dark" />
      <View style={styles.homeContent}>
        <View style={styles.homeBadge}>
          <Ionicons name="checkmark-circle" size={48} color="#0D7A3E" />
        </View>
        <Text style={styles.homeTitle}>Welcome to GoAlong!</Text>
        <Text style={styles.homeSubtitle}>Signed in as: {userEmail}</Text>
        <Text style={styles.homeDesc}>
          You are now connected to the GoAlong verified companionship marketplace.
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#FDF8F5',
  },
  topBackBar: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#FDF8F5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#A84218',
    marginLeft: 6,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#FDF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  homeContent: {
    alignItems: 'center',
    maxWidth: 380,
  },
  homeBadge: {
    marginBottom: 16,
  },
  homeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E1612',
    marginBottom: 8,
    textAlign: 'center',
  },
  homeSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#A84218',
    marginBottom: 12,
  },
  homeDesc: {
    fontSize: 14,
    color: '#66574F',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A84218',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
