import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { Label } from '@/src/components/atoms/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/atoms/select';
import { TaskStatus } from '@/src/features/tasks/data/models/task.model';

interface TaskStatusSelectProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

const statuses: { label: string; value: TaskStatus }[] = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'completed' },
];

export function TaskStatusSelect({ value, onChange }: TaskStatusSelectProps) {
  return (
    <View className="gap-2">
      <Label nativeID="status">Status</Label>
      <Select
        value={value ? { value, label: statuses.find(s => s.value === value)?.label || value } : undefined}
        onValueChange={(option) => {
          if (option) {
            onChange(option.value as TaskStatus);
          }
        }}>
        <SelectTrigger className="w-full">
          <SelectValue
            className="native:text-lg text-sm text-foreground"
            placeholder="Select status"
          />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {statuses.map((s) => (
              <SelectItem key={s.value} value={s.value} label={s.label}>
                <Text>{s.label}</Text>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
}

