import React from 'react';
import { View } from 'react-native';
import { TaskTabButton } from './task-tab-button';
import { TaskTabsProps } from './task-tabs.types';

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

