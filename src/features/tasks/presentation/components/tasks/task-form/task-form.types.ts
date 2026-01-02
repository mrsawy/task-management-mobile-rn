import { CreateTaskInput } from '@/src/features/tasks/data/models/task.model';

export interface TaskFormProps {
  onSubmit: (data: CreateTaskInput) => void | Promise<void>;
  onCancel: () => void;
  initialData?: CreateTaskInput;
  isOpen: boolean;
}

