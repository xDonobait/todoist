'use client';

import { Task, BADGE_CONFIG, PRIORITY_CONFIG, STATUS_CONFIG, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskModal } from './AddTaskModal';
import { useState } from 'react';
import styles from './ListView.module.scss';

export const ListView = () => {
  const { tasks, deleteTask, moveTask, updateTask, addTask } = useTasks();
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const grouped: Record<TaskStatus, Task[]> = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    done: tasks.filter(t => t.status === 'done'),
  };

  return (
    <>
      <div className={styles.list}>
        {(Object.keys(grouped) as TaskStatus[]).map(status => (
          <div key={status} className={styles.group}>
            <div className={styles.groupHeader}>
              <div className={styles.groupLeft}>
                <span className={styles.dot} />
                <h3 className={styles.groupTitle}>{STATUS_CONFIG[status].label}</h3>
                <span className={styles.groupCount}>{grouped[status].length}</span>
              </div>
              <button
                className={styles.addButton}
                onClick={() => setAddingToColumn(status)}
              >
                + Add
              </button>
            </div>
            {grouped[status].map(task => (
              <div key={task.id} className={styles.row}>
                <button
                  className={`${styles.checkbox} ${task.status === 'done' ? styles.checked : ''}`}
                  onClick={() =>
                    moveTask(task.id, task.status === 'done' ? 'todo' : 'done')
                  }
                  aria-label={task.status === 'done' ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.status === 'done' && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  )}
                </button>
                <div className={styles.rowContent}>
                  <span className={`${styles.rowTitle} ${task.status === 'done' ? styles.done : ''}`}>
                    {task.title}
                  </span>
                  {task.description && (
                    <span className={styles.rowDesc}>{task.description}</span>
                  )}
                </div>
                <span className={styles.badge}>
                  {BADGE_CONFIG[task.badge].label}
                </span>
                <span className={styles.priority}>
                  {PRIORITY_CONFIG[task.priority].label}
                </span>
                {task.dueDate && (
                  <span className={styles.date}>{formatDate(task.dueDate)}</span>
                )}
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3l8 8M11 3l-8 8" />
                  </svg>
                </button>
              </div>
            ))}
            {grouped[status].length === 0 && (
              <div className={styles.empty}>No tasks</div>
            )}
          </div>
        ))}
      </div>

      {addingToColumn && (
        <AddTaskModal
          status={addingToColumn}
          onAdd={addTask}
          onClose={() => setAddingToColumn(null)}
        />
      )}
    </>
  );
};
