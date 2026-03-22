export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskBadge = 'not-started' | 'in-research' | 'on-track' | 'complete';

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  badge: TaskBadge;
  priority: Priority;
  dueDate?: number;
  createdAt: number;
  subtasks: SubTask[];
}

export const BADGE_CONFIG: Record<TaskBadge, { label: string; color: string }> = {
  'not-started': { label: 'Not Started', color: '#a1a1aa' },
  'in-research': { label: 'In Research', color: '#d4d4d8' },
  'on-track': { label: 'On Track', color: '#e4e4e7' },
  'complete': { label: 'Complete', color: '#fafafa' },
};

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  high: { label: 'High', color: '#fafafa' },
  medium: { label: 'Medium', color: '#a1a1aa' },
  low: { label: 'Low', color: '#71717a' },
};

export const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
  todo: { label: 'To do', color: '#a1a1aa' },
  'in-progress': { label: 'In Progress', color: '#d4d4d8' },
  done: { label: 'Done', color: '#fafafa' },
};

export const DEFAULT_BADGE_FOR_STATUS: Record<TaskStatus, TaskBadge> = {
  todo: 'not-started',
  'in-progress': 'on-track',
  done: 'complete',
};

export const BADGES_FOR_STATUS: Record<TaskStatus, TaskBadge[]> = {
  todo: ['not-started', 'in-research'],
  'in-progress': ['in-research', 'on-track'],
  done: ['complete'],
};
