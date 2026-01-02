import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { TaskStatus } from '@/src/features/tasks/data/models/task.model';
import { TaskEmptyStateProps } from './task-empty-state.types';

const messages: Record<TaskStatus, string> = {
  todo: 'No tasks yet. Create one to get started!',
  'in-progress': 'No tasks in progress',
  completed: 'No completed tasks',
};

export function TaskEmptyState({ status }: TaskEmptyStateProps) {
  return (
    <View className="items-center justify-center py-20">
      <Text className="text-muted-foreground">{messages[status]}</Text>
    </View>
  );
}

