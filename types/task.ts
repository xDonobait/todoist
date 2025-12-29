export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'date' | 'priority' | 'alphabetical';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: Priority;
  dueDate?: number;
  category?: string;
  notes?: string;
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  dueToday: number;
  byPriority: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work', color: '#8b0000' },
  { id: 'personal', name: 'Personal', color: '#4a0080' },
  { id: 'study', name: 'Study', color: '#1a1a4a' },
  { id: 'health', name: 'Health', color: '#0a3a0a' },
  { id: 'creative', name: 'Creative', color: '#3a1a1a' },
];

export const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: '#dc143c' },
  high: { label: 'High', color: '#8b0000' },
  medium: { label: 'Medium', color: '#4a4a4a' },
  low: { label: 'Low', color: '#2a2a2a' },
};
