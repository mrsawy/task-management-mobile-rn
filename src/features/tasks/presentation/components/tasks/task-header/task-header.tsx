import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { TaskHeaderProps } from './task-header.types';

export function TaskHeader({ taskCount }: TaskHeaderProps) {
  return (
    <View className="border-b border-border bg-card p-4">
      <Text className="text-lg font-semibold">Task Manager</Text>
      <Text className="text-sm text-muted-foreground">You have {taskCount} tasks</Text>
    </View>
  );
}

