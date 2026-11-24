
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateToRegister: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onNavigateToRegister,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Successful mock login
      onLoginSuccess(email);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="grow justify-center px-6 py-8"
      >
        {/* Header */}
        <View className="mb-8 items-center">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <Ionicons name="heart" size={32} color="#4F46E5" />
          </View>

          <Text className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Project Companion
          </Text>

          <Text className="mb-2 text-3xl font-bold text-gray-800">
            Welcome Back
          </Text>

          <Text className="px-4 text-center text-base leading-6 text-gray-500">
            Continue your journey with verified companionship and meaningful
            conversations.
          </Text>
        </View>

        {/* Error Message */}
        {error ? (
          <View className="mb-4 flex-row items-center rounded-lg bg-red-100 p-3">
            <Ionicons name="alert-circle" size={20} color="#DC2626" />
            <Text className="ml-2 flex-1 text-sm font-medium text-red-600">
              {error}
            </Text>
          </View>
        ) : null}

        {/* Login Form */}
        <View className="mb-6">
          {/* Email */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </Text>

          <View className="mb-5 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            <Ionicons
              name="mail-outline"
              size={20}
              color="#6B7280"
              style={{ marginRight: 10 }}
            />

            <Input
              className="h-full flex-1 border-0 bg-transparent px-0 text-base text-gray-800 shadow-none"
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Password
          </Text>

          <View className="mb-2 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#6B7280"
              style={{ marginRight: 10 }}
            />

            <Input
              className="h-full flex-1 border-0 bg-transparent px-0 text-base text-gray-800 shadow-none"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={() => setShowPassword((previous) => !previous)}
              className="p-2"
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? 'Hide password' : 'Show password'
              }
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            className="mb-6 self-end"
            onPress={() =>
              alert('Password reset link sent to your email (Mock).')
            }
          >
            <Text className="text-sm font-semibold text-indigo-600">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            className="h-[52px] w-full rounded-xl bg-indigo-600"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">Login</Text>
            )}
          </Button>
        </View>

        {/* Register Footer */}
        <View className="mb-6 flex-row justify-center">
          <Text className="text-[15px] text-gray-500">
            Don't have an account?{' '}
          </Text>

          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text className="text-[15px] font-bold text-indigo-600">
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text className="px-4 text-center text-xs leading-[18px] text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Secure Better Auth protected session.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
