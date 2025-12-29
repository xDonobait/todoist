import { FilterType, SortType, TaskStats } from '@/types/task';
import { SortIcon, FilterIcon } from './icons/Icons';
import styles from './FilterBar.module.scss';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
  stats: TaskStats;
  onClearCompleted: () => void;
}

export const FilterBar = ({ 
  currentFilter, 
  onFilterChange, 
  currentSort,
  onSortChange,
  stats, 
  onClearCompleted 
}: FilterBarProps) => {
  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: stats.total },
    { label: 'Active', value: 'active', count: stats.active },
    { label: 'Done', value: 'completed', count: stats.completed },
  ];

  const sorts: { label: string; value: SortType }[] = [
    { label: 'Date', value: 'date' },
    { label: 'Priority', value: 'priority' },
    { label: 'A-Z', value: 'alphabetical' },
  ];

  return (
    <div className={styles.filterBar}>
      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.sectionLabel}>
          <FilterIcon />
          <span>Filter</span>
        </div>
        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`${styles.filterButton} ${currentFilter === filter.value ? styles.active : ''}`}
              onClick={() => onFilterChange(filter.value)}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Section */}
      <div className={styles.sortSection}>
        <div className={styles.sectionLabel}>
          <SortIcon />
          <span>Sort</span>
        </div>
        <div className={styles.sorts}>
          {sorts.map((sort) => (
            <button
              key={sort.value}
              className={`${styles.sortButton} ${currentSort === sort.value ? styles.active : ''}`}
              onClick={() => onSortChange(sort.value)}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {stats.completed > 0 && (
          <button 
            className={styles.clearButton}
            onClick={onClearCompleted}
          >
            <span className={styles.clearIcon}>✕</span>
            Clear {stats.completed} completed
          </button>
        )}
      </div>

      {/* Priority Stats */}
      {stats.total > 0 && (
        <div className={styles.priorityStats}>
          <span className={styles.priorityStat} title="Critical">
            <span className={styles.priorityDot} style={{ backgroundColor: 'var(--priority-critical)' }} />
            {stats.byPriority.critical}
          </span>
          <span className={styles.priorityStat} title="High">
            <span className={styles.priorityDot} style={{ backgroundColor: 'var(--priority-high)' }} />
            {stats.byPriority.high}
          </span>
          <span className={styles.priorityStat} title="Medium">
            <span className={styles.priorityDot} style={{ backgroundColor: 'var(--priority-medium)' }} />
            {stats.byPriority.medium}
          </span>
          <span className={styles.priorityStat} title="Low">
            <span className={styles.priorityDot} style={{ backgroundColor: 'var(--priority-low)' }} />
            {stats.byPriority.low}
          </span>
        </div>
      )}
    </div>
  );
};
