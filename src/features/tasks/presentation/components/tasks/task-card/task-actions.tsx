import React from 'react';
import { Pressable } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { Icon } from '@/src/components/atoms/icon';

interface TaskActionsProps {
  onDelete: () => void;
}

export function TaskActions({ onDelete }: TaskActionsProps) {
  return (
    <Pressable onPress={onDelete} className="p-1">
      <Icon as={Trash2} className="text-destructive" size={18} />
    </Pressable>
  );
}

