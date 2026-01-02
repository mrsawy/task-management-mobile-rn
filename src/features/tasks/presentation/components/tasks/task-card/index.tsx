import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Card } from '@/src/components/atoms/card';
import { Task } from '@/src/features/tasks/data/models/task.model';
import { TaskStatusIcon } from './task-status-icon';
import { TaskHeader } from './task-header';
import { TaskActions } from './task-actions';
import { TaskMeta } from './task-meta';
import { cn } from '@/src/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

export function TaskCard({ task, onToggle, onDelete, onPress }: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  const handlePress = () => {
    console.log('handlePress');
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable onPress={handlePress} className="mb-3">
      <Card className="p-4">
        <View className="flex-row items-start justify-center gap-3">
          <TaskStatusIcon status={task.status} onPress={onToggle} />

          <View className="flex-1 gap-6">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <TaskHeader task={task} />
              </View>
              <TaskActions onDelete={onDelete} />
            </View>

            {task.description && (
              <Text
                className={cn(
                  'text-sm text-muted-foreground',
                  isCompleted && 'line-through'
                )}>
                {task.description}
              </Text>
            )}

            <TaskMeta task={task} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

