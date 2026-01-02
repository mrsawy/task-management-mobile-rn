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
import { TaskPriority } from '@/src/features/tasks/data/models/task.model';
import { TaskPrioritySelectProps } from './task-priority-select.types';

const priorities: { label: string; value: TaskPriority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export function TaskPrioritySelect({ value, onChange }: TaskPrioritySelectProps) {
  return (
    <View className="gap-2">
      <Label nativeID="priority">Priority</Label>
      <Select
        value={value ? { value, label: value } : undefined}
        onValueChange={(option) => {
          if (option) {
            onChange(option.value as TaskPriority);
          }
        }}>
        <SelectTrigger className="w-full">
          <SelectValue
            className="native:text-lg text-sm text-foreground"
            placeholder="Select priority"
          />
        </SelectTrigger>
        <SelectContent className="w-full">
          <SelectGroup>
            {priorities.map((p) => (
              <SelectItem key={p.value} value={p.value} label={p.label}>
                <Text className="capitalize">{p.label}</Text>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
}

