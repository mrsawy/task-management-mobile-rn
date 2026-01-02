import { Task } from '@/src/features/tasks/data/models/task.model';

export interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onPress?: () => void;
}

