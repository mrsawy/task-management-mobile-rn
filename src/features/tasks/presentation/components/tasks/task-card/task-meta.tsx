import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Task } from '@/src/features/tasks/data/models/task.model';
import { TaskPriorityBadge } from './task-priority-badge';
import { cn } from '@/src/lib/utils';

const statusColors = {
  todo: 'bg-gray-500',
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
};

interface TaskMetaProps {
  task: Task;
}

export function TaskMeta({ task }: TaskMetaProps) {
  return (
    <View className="flex-row items-center gap-2">
      <TaskPriorityBadge priority={task.priority} />
      <View className={cn('h-2 w-2 rounded-full', statusColors[task.status])} />
      <Text className="text-xs text-muted-foreground capitalize">{task.status}</Text>
      {task.dueDate && (
        <Text className="text-xs text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Text>
      )}
    </View>
  );
}

