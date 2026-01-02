import { TaskStatus } from '@/src/features/tasks/data/models/task.model';

export interface TaskStatusIconProps {
  status: TaskStatus;
  onPress: () => void;
  className?: string;
}

