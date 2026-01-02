import React from 'react';
import { View } from 'react-native';
import { Task } from '@/src/features/tasks/data/models/task.model';
import { TaskCard } from '../task-card';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress?: (task: Task) => void;
}

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

