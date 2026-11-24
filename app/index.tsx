
import { useRouter } from 'expo-router';
import LandingScreen from '../src/screens/LandingScreen';

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/register');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <LandingScreen
      onGetStarted={handleGetStarted}
      onLogin={handleLogin}
    />
  );
}
