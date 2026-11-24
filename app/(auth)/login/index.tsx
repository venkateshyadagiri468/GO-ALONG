import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import LoginScreen from '@/screens/LoginScreen';


export default function LoginRoute() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    Alert.alert(
      'Login successful',
      'Mock authentication completed successfully.',
    );

    // Later:
    // router.replace('/(tabs)');
  };

  return (
    <LoginScreen
      onLoginSuccess={handleLoginSuccess}
      onNavigateToRegister={() => {
        router.push('/(auth)/register' as never);
      }}
    />
  );
}