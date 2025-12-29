import { useState } from 'react';
import { Task, PRIORITY_CONFIG, DEFAULT_CATEGORIES } from '@/types/task';
import { CheckIcon, DeleteIcon, EditIcon, CalendarIcon, GripIcon } from './icons/Icons';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  index: number;
}

export const TaskItem = ({ task, onToggle, onDelete, onUpdate, index }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const priorityConfig = PRIORITY_CONFIG[task.priority];
  const category = task.category ? DEFAULT_CATEGORIES.find(c => c.id === task.category) : null;
  
  const isOverdue = task.dueDate && !task.completed && task.dueDate < Date.now();
  const isDueToday = task.dueDate && !task.completed && 
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  const formatDueDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''} ${isOverdue ? styles.overdue : ''}`}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        '--priority-color': priorityConfig.color 
      } as React.CSSProperties}
    >
      {/* Priority Indicator */}
      <div 
        className={styles.priorityBar} 
        style={{ backgroundColor: priorityConfig.color }}
        title={`Priority: ${priorityConfig.label}`}
      />
      
      {/* Drag Handle */}
      <button className={styles.gripHandle} aria-label="Drag to reorder">
        <GripIcon />
      </button>

      {/* Checkbox */}
      <button
        className={styles.checkbox}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <span className={styles.checkboxInner}>
          {task.completed && <CheckIcon />}
        </span>
      </button>
      
      {/* Content */}
      <div className={styles.content}>
        {isEditing ? (
          <input
            type="text"
            className={styles.editInput}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className={styles.taskText}>{task.text}</span>
        )}
        
        {/* Meta info */}
        <div className={styles.meta}>
          {category && (
            <span className={styles.category} style={{ borderColor: category.color }}>
              <span>{category.name}</span>
            </span>
          )}
          
          {task.dueDate && (
            <span className={`${styles.dueDate} ${isOverdue ? styles.overdue : ''} ${isDueToday ? styles.today : ''}`}>
              <CalendarIcon />
              <span>{formatDueDate(task.dueDate)}</span>
            </span>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
        >
          <EditIcon />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};
