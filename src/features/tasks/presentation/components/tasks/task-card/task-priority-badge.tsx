import React from 'react';
import { Badge } from '@/src/components/atoms/badge';
import { Text } from '@/src/components/atoms/text';
import { cn } from '@/src/lib/utils';
import { TaskPriorityBadgeProps } from './task-priority-badge.types';

const priorityColors = {
  low: 'bg-blue-100',
  medium: 'bg-yellow-100',
  high: 'bg-red-100',
};

const priorityTextColors = {
  low: 'text-blue-700',
  medium: 'text-yellow-700',
  high: 'text-red-700',
};

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <Badge
      className={cn(
        'px-2 py-0.5',
        priorityColors[priority],
        priorityTextColors[priority]
      )}>
      <Text className="text-xs font-medium capitalize text-black">{priority}</Text>
    </Badge>
  );
}

