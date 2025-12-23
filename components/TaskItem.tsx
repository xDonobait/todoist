import { Task } from '@/types/task';
import { CheckIcon, DeleteIcon } from './icons/Icons';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <CheckIcon />}
      </button>
      
      <span className={styles.taskText}>{task.text}</span>
      
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
