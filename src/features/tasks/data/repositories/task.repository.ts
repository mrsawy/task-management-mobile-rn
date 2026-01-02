import { Task, CreateTaskInput, TaskStatus } from '../models/task.model';
import { TaskDataSource } from '../datasources/task.datasource';

const generateId = () => Math.random().toString(36).substring(2, 9);

export class TaskRepository {
  private dataSource: TaskDataSource;

  constructor() {
    this.dataSource = new TaskDataSource();
  }

  async initialize(): Promise<void> {
    await this.dataSource.initDatabase();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.dataSource.getAllTasks();
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const newTask: Task = {
      id: generateId(),
      title: input.title,
      description: input.description,
      status: input.status || 'todo',
      priority: input.priority || 'medium',
      dueDate: input.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.dataSource.addTask(newTask);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    await this.dataSource.updateTask(id, { ...updates, updatedAt: new Date() });
  }

  async deleteTask(id: string): Promise<void> {
    await this.dataSource.deleteTask(id);
  }

  async toggleTaskStatus(id: string, currentStatus: TaskStatus): Promise<TaskStatus> {
    const statusMap: Record<TaskStatus, TaskStatus> = {
      todo: 'in-progress',
      'in-progress': 'completed',
      completed: 'todo',
    };
    const newStatus = statusMap[currentStatus];
    await this.updateTask(id, { status: newStatus });
    return newStatus;
  }
}

