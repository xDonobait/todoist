import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { SparkleIcon } from './icons/Icons';
import styles from './TaskList.module.scss';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskList = ({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <SparkleIcon />
        </div>
        <h3 className={styles.emptyTitle}>No quests await</h3>
        <p className={styles.emptyText}>Your realm is at peace... for now</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.listHeader}>
        <span className={styles.taskCount}>{tasks.length} {tasks.length === 1 ? 'quest' : 'quests'}</span>
      </div>
      <div className={styles.listContent}>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
