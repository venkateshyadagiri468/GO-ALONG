
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../../components/ui/text';

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null;

  return (
    <View className="mb-5 flex-row items-start rounded-xl border border-red-200 bg-red-50 p-3">
      <Ionicons
        name="alert-circle-outline"
        size={20}
        color="#DC2626"
      />

      <Text className="ml-2 flex-1 text-sm leading-5 text-red-700">
        {message}
      </Text>
    </View>
  );
}
