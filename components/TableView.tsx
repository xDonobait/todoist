'use client';

import { Task, BADGE_CONFIG, PRIORITY_CONFIG, STATUS_CONFIG, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskModal } from './AddTaskModal';
import { useState } from 'react';
import styles from './TableView.module.scss';

export const TableView = () => {
  const { tasks, deleteTask, moveTask, addTask } = useTasks();
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.toolbar}>
          <button
            className={styles.addButton}
            onClick={() => setAddingToColumn('todo')}
          >
            + New task
          </button>
        </div>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thCheck}></th>
                <th className={styles.thTitle}>Title</th>
                <th>Status</th>
                <th>Badge</th>
                <th>Priority</th>
                <th>Due date</th>
                <th>Created</th>
                <th className={styles.thActions}></th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={8} className={styles.empty}>
                    No tasks yet. Create one to get started.
                  </td>
                </tr>
              )}
              {tasks.map(task => (
                <tr key={task.id} className={styles.row}>
                  <td>
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
                  </td>
                  <td>
                    <div className={styles.titleCell}>
                      <span className={`${styles.titleText} ${task.status === 'done' ? styles.done : ''}`}>
                        {task.title}
                      </span>
                      {task.description && (
                        <span className={styles.descText}>{task.description}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={styles.statusChip}>
                      <span className={styles.statusDot} />
                      {STATUS_CONFIG[task.status].label}
                    </span>
                  </td>
                  <td>
                    <span className={styles.chip}>
                      {BADGE_CONFIG[task.badge].label}
                    </span>
                  </td>
                  <td>
                    <span className={styles.chip}>
                      {PRIORITY_CONFIG[task.priority].label}
                    </span>
                  </td>
                  <td className={styles.dateCell}>
                    {task.dueDate ? formatDate(task.dueDate) : '—'}
                  </td>
                  <td className={styles.dateCell}>
                    {formatDate(task.createdAt)}
                  </td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 3l8 8M11 3l-8 8" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
