
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { AuthUser } from './types/auth.types';
import { useLogin } from './hooks/useLogin';
import { AuthInput } from './components/AuthInput';
import { AuthError } from './components/AuthError';
import { PasswordInput } from './components/PasswordInput';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AuthHeader } from './components/AuthHeader';



interface LoginScreenProps {
  onLoginSuccess: (user: AuthUser) => void;
  onNavigateToRegister: () => void;
  onForgotPassword?: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onNavigateToRegister,
  onForgotPassword,
}: LoginScreenProps) {
  const {
    email,
    password,
    showPassword,
    isSubmitting,
    error,
    updateEmail,
    updatePassword,
    togglePasswordVisibility,
    submit,
  } = useLogin({
    onSuccess: onLoginSuccess,
  });

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
      return;
    }

    Alert.alert(
      'Forgot Password?',
      'Password recovery will be available once authentication is connected.',
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-50"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="grow justify-center px-5 py-10 md:px-8"
      >
        <View className="w-full max-w-md self-center">
          {/* Login Card */}
          <View className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
            <AuthHeader
              title="Welcome back"
              subtitle="Sign in to continue your journey with meaningful connections."
            />

            <AuthError message={error} />

            {/* Form */}
            <View>
              <AuthInput
                label="Email address"
                icon="mail-outline"
                placeholder="you@example.com"
                value={email}
                onChangeText={updateEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <PasswordInput
                label="Password"
                value={password}
                placeholder="Enter your password"
                showPassword={showPassword}
                onChangeText={updatePassword}
                onToggleVisibility={togglePasswordVisibility}
              />

              {/* Forgot Password */}
              <TouchableOpacity
                className="mb-6 self-end"
                onPress={handleForgotPassword}
              >
                <Text className="text-sm font-semibold text-indigo-600">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Submit */}
              <Button
                className="h-12 w-full rounded-xl bg-indigo-600"
                onPress={submit}
                disabled={isSubmitting}
              >
                <Text className="text-[15px] font-semibold text-white">
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Text>
              </Button>
            </View>

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-slate-200" />
              <Text className="mx-3 text-xs text-slate-400">
                SECURE ACCOUNT ACCESS
              </Text>
              <View className="h-px flex-1 bg-slate-200" />
            </View>

            {/* Register Link */}
            <View className="flex-row flex-wrap justify-center">
              <Text className="text-sm text-slate-500">
                Don't have an account?{' '}
              </Text>

              <TouchableOpacity onPress={onNavigateToRegister}>
                <Text className="text-sm font-bold text-indigo-600">
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <Text className="mt-6 px-5 text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to our Terms of Service and Privacy
            Policy.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
