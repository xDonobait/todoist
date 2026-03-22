'use client';

import { useState, DragEvent } from 'react';
import { Task, TaskStatus, STATUS_CONFIG } from '@/types/task';
import { TaskCard } from './TaskCard';
import { PlusIcon } from './icons/Icons';
import styles from './BoardColumn.module.scss';

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
  onAddClick: () => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

export const BoardColumn = ({
  status,
  tasks,
  onDrop,
  onAddClick,
  onDeleteTask,
  onUpdateTask,
}: BoardColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = STATUS_CONFIG[status];

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  return (
    <div
      className={`${styles.column} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span
            className={styles.dot}
            style={{ backgroundColor: config.color }}
          />
          <h3 className={styles.title}>{config.label}</h3>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.iconButton}
            onClick={onAddClick}
            aria-label={`Add task to ${config.label}`}
          >
            <PlusIcon />
          </button>
          <button className={styles.iconButton} aria-label="More options">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="3" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="13" cy="8" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.cards}>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onUpdate={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
};
