
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../../../components/ui/input';
import { Text } from '../../../components/ui/text';

interface AuthInputProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function AuthInput({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: AuthInputProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-slate-700">
        {label}
      </Text>

      <View className="h-12 flex-row items-center rounded-xl border border-slate-200 bg-white px-3">
        <Ionicons name={icon} size={19} color="#64748B" />

        <Input
          className="h-full flex-1 border-0 bg-transparent px-3 text-[15px] text-slate-900 shadow-none"
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}
