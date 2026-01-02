import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Input } from '@/src/components/atoms/input';
import { Label } from '@/src/components/atoms/label';

interface TaskTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TaskTitleInput({ value, onChange, error }: TaskTitleInputProps) {
  return (
    <View className="gap-2">
      <Label nativeID="title">Title</Label>
      <Input
        placeholder="Enter task title"
        value={value}
        onChangeText={onChange}
      />
      {error && (
        <Text className="text-sm text-destructive">{error}</Text>
      )}
    </View>
  );
}

