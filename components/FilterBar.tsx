import { FilterType } from '@/types/task';
import styles from './FilterBar.module.scss';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const FilterBar = ({ currentFilter, onFilterChange, stats, onClearCompleted }: FilterBarProps) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`${styles.filterButton} ${currentFilter === filter.value ? styles.active : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.stats}>
        <span className={styles.statItem}>{stats.active} active</span>
        {stats.completed > 0 && (
          <button 
            className={styles.clearButton}
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};
