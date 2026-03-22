'use client';

import { useState, useRef, useEffect } from 'react';
import {
  TaskStatus,
  TaskBadge,
  Priority,
  STATUS_CONFIG,
  BADGE_CONFIG,
  PRIORITY_CONFIG,
  DEFAULT_BADGE_FOR_STATUS,
  BADGES_FOR_STATUS,
} from '@/types/task';
import styles from './AddTaskModal.module.scss';

interface AddTaskModalProps {
  status: TaskStatus;
  onAdd: (task: {
    title: string;
    description?: string;
    status: TaskStatus;
    badge?: TaskBadge;
    priority: Priority;
    dueDate?: number;
  }) => void;
  onClose: () => void;
}

export const AddTaskModal = ({ status, onAdd, onClose }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [badge, setBadge] = useState<TaskBadge>(
    DEFAULT_BADGE_FOR_STATUS[status]
  );
  const [dueDate, setDueDate] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description: description || undefined,
      status,
      badge,
      priority,
      dueDate: dueDate ? new Date(dueDate).getTime() : undefined,
    });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const statusColor = STATUS_CONFIG[status].color;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.modalHeader}>
          <h3>
            Add task to{' '}
            <span style={{ color: statusColor }}>
              {STATUS_CONFIG[status].label}
            </span>
          </h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="task-title">Title</label>
            <input
              ref={titleRef}
              id="task-title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className={styles.input}
              autoComplete="off"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="task-desc">Description</label>
            <textarea
              id="task-desc"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add more details..."
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label>Priority</label>
              <div className={styles.chipGroup}>
                {(Object.keys(PRIORITY_CONFIG) as Priority[]).map(p => (
                  <button
                    key={p}
                    type="button"
                    className={`${styles.chip} ${priority === p ? styles.chipActive : ''}`}
                    style={
                      priority === p
                        ? {
                            backgroundColor: `${PRIORITY_CONFIG[p].color}20`,
                            borderColor: `${PRIORITY_CONFIG[p].color}50`,
                            color: PRIORITY_CONFIG[p].color,
                          }
                        : {}
                    }
                    onClick={() => setPriority(p)}
                  >
                    {PRIORITY_CONFIG[p].label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Status</label>
              <div className={styles.chipGroup}>
                {BADGES_FOR_STATUS[status].map(b => (
                  <button
                    key={b}
                    type="button"
                    className={`${styles.chip} ${badge === b ? styles.chipActive : ''}`}
                    style={
                      badge === b
                        ? {
                            backgroundColor: `${BADGE_CONFIG[b].color}20`,
                            borderColor: `${BADGE_CONFIG[b].color}50`,
                            color: BADGE_CONFIG[b].color,
                          }
                        : {}
                    }
                    onClick={() => setBadge(b)}
                  >
                    {BADGE_CONFIG[b].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="task-date">Due date</label>
            <input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!title.trim()}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
