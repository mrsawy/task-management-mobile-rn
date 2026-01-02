import { create } from 'zustand';
import { Task, CreateTaskInput, TaskStatus, TaskPriority } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  initialized: boolean;
  repository: TaskRepository;
  initialize: () => Promise<void>;
  loadTasks: () => Promise<void>;
  addTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  initialized: false,
  repository: new TaskRepository(),
  initialize: async () => {
    if (get().initialized) return;
    set({ isLoading: true });
    try {
      await get().repository.initialize();
      await get().loadTasks();
      set({ initialized: true });
    } catch (error) {
      console.error('Failed to initialize database:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  loadTasks: async () => {
    try {
      const tasks = await get().repository.getAllTasks();
      set({ tasks });
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  },
  addTask: async (taskInput) => {
    try {
      const newTask = await get().repository.createTask(taskInput);
      set((state) => ({ tasks: [newTask, ...state.tasks] }));
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },
  updateTask: async (id, updates) => {
    try {
      await get().repository.updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        ),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },
  deleteTask: async (id) => {
    try {
      await get().repository.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  },
  toggleTaskStatus: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const newStatus = await get().repository.toggleTaskStatus(id, task.status);
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, status: newStatus, updatedAt: new Date() } : t
        ),
      }));
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    }
  },
  getTasksByStatus: (status) => {
    return get().tasks.filter((task) => task.status === status);
  },
  getTasksByPriority: (priority) => {
    return get().tasks.filter((task) => task.priority === priority);
  },
}));

