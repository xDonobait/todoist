'use client';

import { useState } from 'react';
import { TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { BoardColumn } from './BoardColumn';
import { AddTaskModal } from './AddTaskModal';
import styles from './Board.module.scss';

const COLUMNS: TaskStatus[] = ['todo', 'in-progress', 'done'];

export const Board = () => {
  const { addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [addingToColumn, setAddingToColumn] = useState<TaskStatus | null>(null);

  const handleDrop = (taskId: string, newStatus: TaskStatus) => {
    moveTask(taskId, newStatus);
  };

  return (
    <>
      <div className={styles.board}>
        {COLUMNS.map(status => (
          <BoardColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onDrop={handleDrop}
            onAddClick={() => setAddingToColumn(status)}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
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
