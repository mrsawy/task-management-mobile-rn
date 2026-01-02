import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/src/components/atoms/text';
import { Button } from '@/src/components/atoms/button';
import { Icon } from '@/src/components/atoms/icon';
import { Plus } from 'lucide-react-native';
import { useTaskStore } from '@/src/features/tasks/data/store/task.store';
import { TaskStatus, CreateTaskInput, Task } from '@/src/features/tasks/data/models/task.model';
import { TaskHeader } from '../../components/tasks/task-header';
import { TaskTabs } from '../../components/tasks/task-tabs';
import { TaskList } from '../../components/tasks/task-list';
import { TaskEmptyState } from '../../components/tasks/task-empty-state';
import { TaskForm } from '../../components/tasks/task-form';
import ThemeToggle from '@/src/components/molecules/theme-toggle';
import { THEME } from '@/src/lib/theme';
import { useUniwind } from 'uniwind';
import { TasksPageProps, TabItem } from './task.types';

export function TasksPage({}: TasksPageProps) {
  const { tasks, deleteTask, toggleTaskStatus, updateTask, initialize, loadTasks, isLoading, initialized } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TaskStatus>('todo');

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await loadTasks();
    } finally {
      setRefreshing(false);
    }
  }, [loadTasks]);

  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const getFilteredTasks = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const tabs: TabItem[] = [
    { value: 'todo' as TaskStatus, label: 'Todo', count: todoCount },
    { value: 'in-progress' as TaskStatus, label: 'In Progress', count: inProgressCount },
    { value: 'completed' as TaskStatus, label: 'Completed', count: completedCount },
  ];

  const handleAddTask = async (data: CreateTaskInput) => {
    try {
      if (editingTask) {
        // Update existing task
        await updateTask(editingTask.id, {
          title: data.title,
          description: data.description,
          status: data.status || editingTask.status,
          priority: data.priority || editingTask.priority,
        });
        // Navigate to the correct tab based on the updated task status
        if (data.status) {
          setActiveTab(data.status);
        }
      } else {
        // Create new task
        await useTaskStore.getState().addTask(data);
        // Navigate to the correct tab based on the task status
        if (data.status) {
          setActiveTab(data.status);
        }
      }
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    console.log('Editing task:', task);
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTaskStatus(id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Tasks',
          headerRight: () => <ThemeToggle />,
        }}
      />
      <View className="flex-1 bg-background pb-12">
        <TaskHeader taskCount={tasks.length} />

        <TaskTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {isLoading && !initialized ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted-foreground">Loading tasks...</Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="px-4 py-4">
              {getFilteredTasks(activeTab).length === 0 ? (
                <TaskEmptyState status={activeTab} />
              ) : (
                <TaskList
                  tasks={getFilteredTasks(activeTab)}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onPress={handleEditTask}
                />
              )}
            </View>
          </ScrollView>
        )}

        <View className="p-4">
          <Button
            onPress={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="w-full">
            <Icon as={Plus} className="size-5" color={THEME['dark'].primary} />
            <Text className="text-primary-foreground">Add New Task</Text>
          </Button>
        </View>

        <TaskForm
          isOpen={isFormOpen}
          onSubmit={handleAddTask}
          onCancel={handleCloseForm}
          initialData={editingTask ? {
            title: editingTask.title,
            description: editingTask.description,
            status: editingTask.status,
            priority: editingTask.priority,
          } : undefined}
        />
      </View>
    </>
  );
}

