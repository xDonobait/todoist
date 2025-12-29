import { useState, useEffect, useCallback } from 'react';
import { Task, FilterType, SortType, TaskStats, Priority } from '@/types/task';

const STORAGE_KEY = 'fokus-tasks-v2';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migration: add priority to old tasks without it
        const migrated = parsed.map((task: Task) => ({
          ...task,
          priority: task.priority || 'medium',
        }));
        setTasks(migrated);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = useCallback((
    text: string, 
    priority: Priority = 'medium', 
    dueDate?: number, 
    category?: string
  ) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      priority,
      dueDate,
      category,
    };

    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  // Sorting function
  const sortTasks = (tasksToSort: Task[]): Task[] => {
    return [...tasksToSort].sort((a, b) => {
      switch (sort) {
        case 'priority': {
          const priorityOrder: Record<Priority, number> = {
            critical: 0,
            high: 1,
            medium: 2,
            low: 3,
          };
          const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
          if (priorityDiff !== 0) return priorityDiff;
          return b.createdAt - a.createdAt;
        }
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'date':
        default:
          return b.createdAt - a.createdAt;
      }
    });
  };

  const getFilteredTasks = (): Task[] => {
    let filtered: Task[];
    
    switch (filter) {
      case 'active':
        filtered = tasks.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter((task) => task.completed);
        break;
      default:
        filtered = tasks;
    }
    
    return sortTasks(filtered);
  };

  // Calculate statistics
  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayEnd = new Date().setHours(23, 59, 59, 999);

  const stats: TaskStats = {
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
    overdue: tasks.filter((task) => 
      task.dueDate && !task.completed && task.dueDate < now
    ).length,
    dueToday: tasks.filter((task) => 
      task.dueDate && !task.completed && 
      task.dueDate >= todayStart && task.dueDate <= todayEnd
    ).length,
    byPriority: {
      critical: tasks.filter((task) => !task.completed && task.priority === 'critical').length,
      high: tasks.filter((task) => !task.completed && task.priority === 'high').length,
      medium: tasks.filter((task) => !task.completed && task.priority === 'medium').length,
      low: tasks.filter((task) => !task.completed && task.priority === 'low').length,
    },
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    filter,
    setFilter,
    sort,
    setSort,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    reorderTasks,
    stats,
  };
};
