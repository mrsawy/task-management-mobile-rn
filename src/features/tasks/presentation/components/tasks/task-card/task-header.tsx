import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { cn } from '@/src/lib/utils';
import { TaskCardHeaderProps } from './task-header.types';

export function TaskCardHeader({ task }: TaskCardHeaderProps) {
  const isCompleted = task.status === 'completed';

  return (
    <View className="flex-1 flex-row items-start justify-between gap-2">
      <Text
        className={cn(
          'flex-1 text-base font-medium',
          isCompleted && 'text-muted-foreground line-through'
        )}>
        {task.title}
      </Text>
    </View>
  );
}

