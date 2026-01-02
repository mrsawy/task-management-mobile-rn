import React, { useState, useEffect } from 'react';
import { View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Text } from '@/src/components/atoms/text';
import { CreateTaskInput } from '@/src/features/tasks/data/models/task.model';
import { TaskTitleInput } from './task-title-input';
import { TaskDescriptionInput } from './task-description-input';
import { TaskPrioritySelect } from './task-priority-select';
import { TaskStatusSelect } from './task-status-select';
import { TaskFormActions } from './task-form-actions';
import { TaskPriority, TaskStatus } from '@/src/features/tasks/data/models/task.model';
import { Icon } from '@/src/components/atoms/icon';
import { X } from 'lucide-react-native';
import { TaskFormProps } from './task-form.types';

export function TaskForm({ onSubmit, onCancel, initialData, isOpen }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'todo');
      setPriority(initialData.priority || 'medium');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
    });

    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setErrors({});
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle={'pageSheet'}
      transparent={false}
      onRequestClose={onCancel}>
      <View className="flex-1 bg-transparent">
        <View className="bg-background  flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-border px-6 py-4">
            <Text className="text-xl font-bold">
              {initialData ? 'Edit Task' : 'Create New Task'}
            </Text>
            <TouchableOpacity onPress={onCancel} className="p-2">
              <Icon as={X} className="text-muted-foreground" size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-4 px-6 pt-6">
              <TaskTitleInput
                value={title}
                onChange={(text) => {
                  setTitle(text);
                  if (errors.title) setErrors({});
                }}
                error={errors.title}
              />

              <TaskDescriptionInput
                value={description}
                onChange={setDescription}
              />

              <TaskStatusSelect
                value={status}
                onChange={setStatus}
              />

              <TaskPrioritySelect
                value={priority}
                onChange={setPriority}
              />

              <TaskFormActions
                isEdit={!!initialData}
                onCancel={onCancel}
                onSubmit={handleSubmit}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

