import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Input } from '../atoms/input';
import { Eye, EyeOff } from 'lucide-react-native';
import { useUniwind } from 'uniwind';
import { cn } from '@/src/lib/utils';

const PasswordInput = ({
  value,
  onChange,
  onBlur,
  placeholder = 'Create a password',
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { theme } = useUniwind();
  const isDark = theme === 'dark';

  // Define the icon color based on theme
  const iconColor = isDark ? '#fafafa' : '#71717a'; // zinc-50 : zinc-500

  return (
    <>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        aria-labelledby="password"
        aria-errormessage="password-error"
        style={{ paddingRight: 48 }}
      />
      <Pressable
        onPress={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        {showPassword ? (
          <EyeOff color={iconColor} size={20} />
        ) : (
          <Eye color={iconColor} size={20} />
        )}
      </Pressable>
    </>
  );
};

export default PasswordInput;