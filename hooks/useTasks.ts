import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskBadge, Priority, DEFAULT_BADGE_FOR_STATUS } from '@/types/task';

const STORAGE_KEY = 'fokus-tasks-v3';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = useCallback((taskData: {
    title: string;
    description?: string;
    status: TaskStatus;
    badge?: TaskBadge;
    priority: Priority;
    dueDate?: number;
  }) => {
    if (!taskData.title.trim()) return;
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: taskData.status,
      badge: taskData.badge || DEFAULT_BADGE_FOR_STATUS[taskData.status],
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdAt: Date.now(),
      subtasks: [],
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        return {
          ...task,
          status: newStatus,
          badge: DEFAULT_BADGE_FOR_STATUS[newStatus],
        };
      })
    );
  }, []);

  const getTasksByStatus = useCallback(
    (status: TaskStatus): Task[] => {
      return tasks.filter(task => task.status === status);
    },
    [tasks]
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
  };
};
