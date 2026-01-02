import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Task } from '@/src/features/tasks/data/models/task.model';
import { cn } from '@/src/lib/utils';

interface TaskHeaderProps {
  task: Task;
}

export function TaskHeader({ task }: TaskHeaderProps) {
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

