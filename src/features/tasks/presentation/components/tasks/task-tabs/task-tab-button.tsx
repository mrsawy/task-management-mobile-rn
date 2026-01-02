import React from 'react';
import { Pressable } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { cn } from '@/src/lib/utils';

interface TaskTabButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}

export function TaskTabButton({ label, count, isActive, onPress }: TaskTabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-1 rounded-md border px-3 py-2',
        isActive
          ? 'border-primary bg-primary/10'
          : 'border-border bg-transparent'
      )}>
      <Text
        className={cn(
          'text-center text-sm font-medium',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}>
        {label}
      </Text>
      <Text
        className={cn(
          'text-center text-sm font-medium',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}>
        ({count})
      </Text>
    </Pressable>
  );
}

