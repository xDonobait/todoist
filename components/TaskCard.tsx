'use client';

import { DragEvent, useState } from 'react';
import { Task, BADGE_CONFIG, PRIORITY_CONFIG } from '@/types/task';
import { CalendarIcon } from './icons/Icons';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskCard = ({ task, onDelete, onUpdate }: TaskCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const badgeConfig = BADGE_CONFIG[task.badge];
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const handleDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.cardTop}>
        <span
          className={styles.badge}
          style={{
            backgroundColor: `${badgeConfig.color}18`,
            color: badgeConfig.color,
            borderColor: `${badgeConfig.color}35`,
          }}
        >
          <span
            className={styles.badgeDot}
            style={{ backgroundColor: badgeConfig.color }}
          />
          {badgeConfig.label}
        </span>
        <button
          className={styles.menuButton}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="3" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="13" cy="8" r="1.5" />
          </svg>
        </button>
      </div>

      <h4 className={styles.title}>{task.title}</h4>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.meta}>
        {task.dueDate && (
          <div className={styles.dueDate}>
            <CalendarIcon />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
        <span
          className={styles.priority}
          style={{
            backgroundColor: `${priorityConfig.color}18`,
            color: priorityConfig.color,
            borderColor: `${priorityConfig.color}35`,
          }}
        >
          {priorityConfig.label}
        </span>
      </div>

      {totalSubtasks > 0 && (
        <div className={styles.subtasks}>
          <div className={styles.subtaskBar}>
            <div
              className={styles.subtaskFill}
              style={{
                width: `${(completedSubtasks / totalSubtasks) * 100}%`,
              }}
            />
          </div>
          <span className={styles.subtaskText}>
            {completedSubtasks}/{totalSubtasks}
          </span>
        </div>
      )}
    </div>
  );
};
