import React from 'react';
import { View } from 'react-native';
import { TaskCard } from '../task-card';
import { TaskListProps } from './task-list.types';

export function TaskList({ tasks, onToggle, onDelete, onPress }: TaskListProps) {
  return (
    <View className="gap-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onPress={() => onPress?.(task)}
        />
      ))}
    </View>
  );
}

