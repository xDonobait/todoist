import { useState, KeyboardEvent } from 'react';
import { PlusIcon, CalendarIcon, FlagIcon, ChevronDownIcon } from './icons/Icons';
import { Priority, PRIORITY_CONFIG, DEFAULT_CATEGORIES } from '@/types/task';
import styles from './TaskInput.module.scss';

interface TaskInputProps {
  onAddTask: (text: string, priority: Priority, dueDate?: number, category?: string) => void;
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [showOptions, setShowOptions] = useState(false);
  const [dueDate, setDueDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<'priority' | 'category' | null>(null);

  const handleSubmit = () => {
    if (text.trim()) {
      const dueDateTimestamp = dueDate ? new Date(dueDate).getTime() : undefined;
      onAddTask(text, priority, dueDateTimestamp, category || undefined);
      setText('');
      setPriority('medium');
      setDueDate('');
      setCategory('');
      setShowOptions(false);
      setActiveDropdown(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const closeDropdown = () => setActiveDropdown(null);

  const priorityConfig = PRIORITY_CONFIG[priority];

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        <div 
          className={styles.priorityIndicator} 
          style={{ backgroundColor: priorityConfig.color }}
          title={`Priority: ${priorityConfig.label}`}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="What must be conquered today?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowOptions(true)}
        />
        <button
          className={styles.addButton}
          onClick={handleSubmit}
          disabled={!text.trim()}
          aria-label="Add task"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Options Panel */}
      <div className={`${styles.optionsPanel} ${showOptions ? styles.visible : ''}`}>
        {/* Priority Selector */}
        <div className={styles.optionGroup}>
          <button 
            className={styles.optionButton}
            onClick={() => setActiveDropdown(activeDropdown === 'priority' ? null : 'priority')}
          >
            <FlagIcon />
            <span style={{ color: priorityConfig.color }}>{priorityConfig.label}</span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Due Date */}
        <div className={styles.optionGroup}>
          <label className={styles.dateLabel}>
            <CalendarIcon />
            <input
              type="date"
              className={styles.dateInput}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </label>
        </div>

        {/* Category Selector */}
        <div className={styles.optionGroup}>
          <button 
            className={styles.optionButton}
            onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
          >
            <span>{category ? DEFAULT_CATEGORIES.find(c => c.id === category)?.name : 'Category'}</span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button 
            className={styles.quickAction}
            onClick={() => {
              const today = new Date();
              setDueDate(today.toISOString().split('T')[0]);
            }}
          >
            Today
          </button>
          <button 
            className={styles.quickAction}
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              setDueDate(tomorrow.toISOString().split('T')[0]);
            }}
          >
            Tomorrow
          </button>
          <button 
            className={styles.quickAction}
            onClick={() => {
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              setDueDate(nextWeek.toISOString().split('T')[0]);
            }}
          >
            Next Week
          </button>
        </div>
      </div>

      {/* Priority Dropdown Modal */}
      {activeDropdown === 'priority' && (
        <>
          <div className={styles.overlay} onClick={closeDropdown} />
          <div className={styles.dropdownModal}>
            <div className={styles.dropdownHeader}>
              <span>Select Priority</span>
              <button onClick={closeDropdown}>✕</button>
            </div>
            {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => (
              <button
                key={p}
                className={`${styles.dropdownItem} ${priority === p ? styles.active : ''}`}
                onClick={() => {
                  setPriority(p);
                  closeDropdown();
                }}
              >
                <span className={styles.priorityDot} style={{ backgroundColor: PRIORITY_CONFIG[p].color }} />
                <span>{PRIORITY_CONFIG[p].label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Category Dropdown Modal */}
      {activeDropdown === 'category' && (
        <>
          <div className={styles.overlay} onClick={closeDropdown} />
          <div className={styles.dropdownModal}>
            <div className={styles.dropdownHeader}>
              <span>Select Category</span>
              <button onClick={closeDropdown}>✕</button>
            </div>
            <button
              className={`${styles.dropdownItem} ${!category ? styles.active : ''}`}
              onClick={() => {
                setCategory('');
                closeDropdown();
              }}
            >
              <span>None</span>
            </button>
            {DEFAULT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.dropdownItem} ${category === cat.id ? styles.active : ''}`}
                onClick={() => {
                  setCategory(cat.id);
                  closeDropdown();
                }}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
