
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Input } from '../../../components/ui/input';
import { Text } from '../../../components/ui/text';

interface PasswordInputProps {
  label: string;
  value: string;
  placeholder: string;
  showPassword: boolean;
  onChangeText: (value: string) => void;
  onToggleVisibility: () => void;
}

export function PasswordInput({
  label,
  value,
  placeholder,
  showPassword,
  onChangeText,
  onToggleVisibility,
}: PasswordInputProps) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-semibold text-slate-700">
        {label}
      </Text>

      <View className="h-12 flex-row items-center rounded-xl border border-slate-200 bg-white px-3">
        <Ionicons
          name="lock-closed-outline"
          size={19}
          color="#64748B"
        />

        <Input
          className="h-full flex-1 border-0 bg-transparent px-3 text-[15px] text-slate-900 shadow-none"
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          className="p-2"
          onPress={onToggleVisibility}
          accessibilityRole="button"
          accessibilityLabel={
            showPassword ? 'Hide password' : 'Show password'
          }
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#64748B"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
