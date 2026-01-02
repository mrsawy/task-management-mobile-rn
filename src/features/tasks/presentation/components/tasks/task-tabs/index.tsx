import React from 'react';
import { View } from 'react-native';
import { TaskStatus } from '@/src/features/tasks/data/models/task.model';
import { TaskTabButton } from './task-tab-button';

interface TaskTabsProps {
  tabs: { value: TaskStatus; label: string; count: number }[];
  activeTab: TaskStatus;
  onTabChange: (tab: TaskStatus) => void;
}

export function TaskTabs({ tabs, activeTab, onTabChange }: TaskTabsProps) {
  return (
    <View className="border-border  ">
      <View className="mx-4 mt-4 flex-row gap-2">
        {tabs.map((tab) => (
          <TaskTabButton
            key={tab.value}
            label={tab.label}
            count={tab.count}
            isActive={activeTab === tab.value}
            onPress={() => onTabChange(tab.value)}
          />
        ))}
      </View>
    </View>
  );
}

