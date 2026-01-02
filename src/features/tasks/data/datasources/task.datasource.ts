import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';
import { Task, CreateTaskInput, TaskStatus, TaskPriority } from '../models/task.model';

let db: SQLiteDatabase | null = null;

const getDatabase = (): SQLiteDatabase => {
    if (!db) {
        db = openDatabaseSync('tasks.db');
    }
    return db;
};

export class TaskDataSource {
    async initDatabase(): Promise<void> {
        try {
            const database = getDatabase();
            database.execSync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          priority TEXT NOT NULL,
          dueDate TEXT,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        );
      `);
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Database initialization error:', error);
            throw error;
        }
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            const database = getDatabase();
            const result = database.getAllSync<{
                id: string;
                title: string;
                description: string | null;
                status: string;
                priority: string;
                dueDate: string | null;
                createdAt: string;
                updatedAt: string;
            }>('SELECT * FROM tasks ORDER BY createdAt DESC;');
            const tasks: Task[] = [];
            for (const item of result) {
                tasks.push({
                    id: item.id,
                    title: item.title,
                    description: item.description || undefined,
                    status: item.status as TaskStatus,
                    priority: item.priority as TaskPriority,
                    dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
                    createdAt: new Date(item.createdAt),
                    updatedAt: new Date(item.updatedAt),
                });
            }
            return tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    }

    async addTask(task: Task): Promise<void> {
        try {
            const database = getDatabase();
            database.runSync(
                `INSERT INTO tasks (id, title, description, status, priority, dueDate, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    task.id,
                    task.title,
                    task.description || null,
                    task.status,
                    task.priority,
                    task.dueDate ? task.dueDate.toISOString() : null,
                    task.createdAt.toISOString(),
                    task.updatedAt.toISOString(),
                ]
            );
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<void> {
        try {
            const database = getDatabase();
            const fields: string[] = [];
            const values: any[] = [];

            if (updates.title !== undefined) {
                fields.push('title = ?');
                values.push(updates.title);
            }
            if (updates.description !== undefined) {
                fields.push('description = ?');
                values.push(updates.description || null);
            }
            if (updates.status !== undefined) {
                fields.push('status = ?');
                values.push(updates.status);
            }
            if (updates.priority !== undefined) {
                fields.push('priority = ?');
                values.push(updates.priority);
            }
            if (updates.dueDate !== undefined) {
                fields.push('dueDate = ?');
                values.push(updates.dueDate ? updates.dueDate.toISOString() : null);
            }
            fields.push('updatedAt = ?');
            values.push(new Date().toISOString());
            values.push(id);

            database.runSync(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?;`, values);
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    async deleteTask(id: string): Promise<void> {
        try {
            const database = getDatabase();
            database.runSync('DELETE FROM tasks WHERE id = ?;', [id]);
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
}
