import { TaskStatus } from '@/src/features/tasks/data/models/task.model';

export interface TabItem {
  value: TaskStatus;
  label: string;
  count: number;
}

export interface TaskTabsProps {
  tabs: TabItem[];
  activeTab: TaskStatus;
  onTabChange: (tab: TaskStatus) => void;
}

