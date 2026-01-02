import React from 'react';
import { View } from 'react-native';
import { Input } from '@/src/components/atoms/input';
import { Label } from '@/src/components/atoms/label';
import { TaskDescriptionInputProps } from './task-description-input.types';

export function TaskDescriptionInput({ value, onChange }: TaskDescriptionInputProps) {
  return (
    <View className="gap-2">
      <Label nativeID="description">Description</Label>
      <Input
        placeholder="Enter task description (optional)"
        value={value}
        onChangeText={onChange}
        multiline
        numberOfLines={4}
        className="h-20"
      />
    </View>
  );
}

