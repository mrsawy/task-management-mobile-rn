import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Button } from '@/src/components/atoms/button';
import { TaskFormActionsProps } from './task-form-actions.types';

export function TaskFormActions({ isEdit, onCancel, onSubmit }: TaskFormActionsProps) {
  return (
    <View className="flex-row gap-2 mt-12">
      <Button variant="outline" onPress={onCancel} className="flex-1">
        <Text>Cancel</Text>
      </Button>
      <Button onPress={onSubmit} className="flex-1">
        <Text>{isEdit ? 'Update' : 'Create'}</Text>
      </Button>
    </View>
  );
}

