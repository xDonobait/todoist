'use client';

import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { useTasks } from '@/hooks/useTasks';
import { OrnamentLeft, OrnamentRight } from '@/components/icons/Icons';
import styles from './page.module.scss';

export default function Home() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    sort,
    setSort,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    stats,
  } = useTasks();

  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Fokus</h1>
          </div>
          <p className={styles.subtitle}>Master your destiny, one task at a time</p>
        </header>

        {/* Stats Dashboard */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.active}</div>
            <div className={styles.statLabel}>Pending</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.completed}</div>
            <div className={styles.statLabel}>Conquered</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: stats.overdue > 0 ? 'var(--color-crimson)' : undefined }}>
              {stats.overdue}
            </div>
            <div className={styles.statLabel}>Overdue</div>
          </div>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className={styles.progressText}>
              <span>Progress</span>
              <span>{completionPercentage}% Complete</span>
            </div>
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.sectionTitle}>New Quest</div>
          <TaskInput onAddTask={addTask} />
          
          <div className={styles.sectionTitle}>Your Quests</div>
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
          
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            currentSort={sort}
            onSortChange={setSort}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
        </div>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Crafted with <span>♦</span> darkness
          </p>
        </footer>
      </div>
    </main>
  );
}
