import { TaskPriority } from '@/src/features/tasks/data/models/task.model';

export interface TaskPrioritySelectProps {
  value: TaskPriority;
  onChange: (priority: TaskPriority) => void;
}

