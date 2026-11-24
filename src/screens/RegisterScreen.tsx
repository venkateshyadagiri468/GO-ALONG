
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

interface RegisterScreenProps {
  onRegisterSuccess: (email: string) => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({
  onRegisterSuccess,
  onNavigateToLogin,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !dob.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess(email);
    }, 1000);
  };

  const renderInputIcon = (name: keyof typeof Ionicons.glyphMap) => (
    <Ionicons name={name} size={20} color="#6B7280" />
  );

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
        <View className="mb-6 items-center">
          <Text className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Project Companion
          </Text>

          <Text className="mb-2 text-3xl font-bold text-gray-800">
            Create Account
          </Text>

          <Text className="text-center text-base leading-6 text-gray-500">
            Join our trusted two-sided human companionship marketplace.
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

        {/* Registration Form */}
        <View className="mb-6">
          {/* Full Name */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </Text>

          <View className="mb-4 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            {renderInputIcon('person-outline')}

            <Input
              className="h-full flex-1 border-0 bg-transparent px-3 text-base text-gray-800 shadow-none"
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </Text>

          <View className="mb-4 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            {renderInputIcon('mail-outline')}

            <Input
              className="h-full flex-1 border-0 bg-transparent px-3 text-base text-gray-800 shadow-none"
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Date of Birth */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Date of Birth (Must be 18+)
          </Text>

          <View className="mb-4 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            {renderInputIcon('calendar-outline')}

            <Input
              className="h-full flex-1 border-0 bg-transparent px-3 text-base text-gray-800 shadow-none"
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9CA3AF"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          {/* Password */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Password
          </Text>

          <View className="mb-4 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            {renderInputIcon('lock-closed-outline')}

            <Input
              className="h-full flex-1 border-0 bg-transparent px-3 text-base text-gray-800 shadow-none"
              placeholder="At least 8 characters"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              className="p-2"
              onPress={() => setShowPassword((previous) => !previous)}
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

          {/* Confirm Password */}
          <Text className="mb-2 text-sm font-semibold text-gray-700">
            Confirm Password
          </Text>

          <View className="mb-4 h-[52px] flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            {renderInputIcon('lock-closed-outline')}

            <Input
              className="h-full flex-1 border-0 bg-transparent px-3 text-base text-gray-800 shadow-none"
              placeholder="Re-enter your password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              className="p-2"
              onPress={() =>
                setShowConfirmPassword((previous) => !previous)
              }
              accessibilityRole="button"
              accessibilityLabel={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? 'eye-off-outline'
                    : 'eye-outline'
                }
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            className="mb-6 mt-2 flex-row items-center"
            onPress={() => setAgreeTerms((previous) => !previous)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreeTerms }}
          >
            <View
              className={`mr-3 h-5 w-5 items-center justify-center rounded border ${
                agreeTerms
                  ? 'border-indigo-600 bg-indigo-600'
                  : 'border-indigo-600 bg-white'
              }`}
            >
              {agreeTerms && (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              )}
            </View>

            <Text className="flex-1 text-[13px] leading-[18px] text-gray-600">
              I confirm I am at least 18 years old and agree to the Terms of
              Service and Privacy Policy.
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <Button
            className="h-[52px] w-full rounded-xl bg-indigo-600"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-bold text-white">
                Create Account
              </Text>
            )}
          </Button>
        </View>

        {/* Login Footer */}
        <View className="mb-6 flex-row justify-center">
          <Text className="text-[15px] text-gray-500">
            Already have an account?{' '}
          </Text>

          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text className="text-[15px] font-bold text-indigo-600">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
