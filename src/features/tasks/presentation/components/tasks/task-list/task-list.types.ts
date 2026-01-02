import { Task } from '@/src/features/tasks/data/models/task.model';

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress?: (task: Task) => void;
}

