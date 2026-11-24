import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../../components/ui/text';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <View className="mb-8 items-center">
      <View className="mb-5 h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
        <Ionicons name="heart" size={32} color="#4F46E5" />
      </View>

      <Text className="mb-2 text-sm font-bold uppercase tracking-[2px] text-indigo-600">
        Go-Along
      </Text>

      <Text className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </Text>

      <Text className="max-w-sm text-center text-sm leading-6 text-slate-500">
        {subtitle}
      </Text>
    </View>
  );
}