import { TaskStatus } from '@/src/features/tasks/data/models/task.model';

export interface TaskStatusSelectProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

