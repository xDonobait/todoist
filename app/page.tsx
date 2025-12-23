'use client';

import { TaskInput } from '@/components/TaskInput';
import { TaskList } from '@/components/TaskList';
import { FilterBar } from '@/components/FilterBar';
import { useTasks } from '@/hooks/useTasks';
import styles from './page.module.scss';

export default function Home() {
  const {
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    stats,
  } = useTasks();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todoist</h1>
          <p className={styles.subtitle}>Manage your tasks with clarity</p>
        </header>

        <div className={styles.content}>
          <TaskInput onAddTask={addTask} />
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </main>
  );
}
