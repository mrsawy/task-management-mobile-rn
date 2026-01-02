import React from 'react';
import { Pressable } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { Icon } from '@/src/components/atoms/icon';
import { TaskStatus } from '@/src/features/tasks/data/models/task.model';
import { cn } from '@/src/lib/utils';

interface TaskStatusIconProps {
  status: TaskStatus;
  onPress: () => void;
  className?: string;
}

export function TaskStatusIcon({ status, onPress, className }: TaskStatusIconProps) {
  const isCompleted = status === 'completed';

  return (
    <Pressable onPress={onPress} className={cn( className)}>
      {isCompleted ? (
        <Icon as={CheckCircle2} className="text-green-500" size={24} />
      ) : (
        <Icon as={Circle} className="text-muted-foreground" size={24} />
      )}
    </Pressable>
  );
}

