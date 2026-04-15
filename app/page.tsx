'use client';

import { useState, type ReactNode } from 'react';
import { Board } from '@/components/Board';
import { ListView } from '@/components/ListView';
import { TableView } from '@/components/TableView';
import styles from './page.module.scss';

type TabKey = 'board' | 'list' | 'table';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'board', label: 'Board' },
  { key: 'list', label: 'List' },
  { key: 'table', label: 'Table' },
];

const TAB_ICONS: Record<TabKey, ReactNode> = {
  board: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="4" height="14" rx="1" />
      <rect x="6" y="1" width="4" height="14" rx="1" />
      <rect x="11" y="1" width="4" height="14" rx="1" />
    </svg>
  ),
  list: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  ),
  table: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="14" height="14" rx="1" />
      <path d="M1 6h14M1 11h14M6 1v14M11 1v14" />
    </svg>
  ),
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('board');

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <svg
              className={styles.logo}
              width="32"
              height="32"
              viewBox="0 0 375 375"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 300.960938 37.5 L 300.960938 300.71875 L 37.5 300.71875 L 37.5 337.5 L 337.5 337.5 L 337.5 37.5 Z" />
              <path d="M 74.28125 74.28125 L 187.558594 74.28125 L 187.558594 37.5 L 37.5 37.5 L 37.5 262.558594 L 74.28125 262.558594 Z" />
              <path d="M 130.921875 112.441406 L 112.679688 112.441406 L 112.679688 262.621094 L 262.5 262.621094 L 262.5 37.5 L 225.71875 37.5 L 225.71875 112.378906 L 130.921875 112.378906 Z M 225.71875 225.839844 L 149.160156 225.839844 L 149.160156 149.28125 L 225.71875 149.28125 Z" />
            </svg>
            <div>
              <h1 className={styles.title}>Tasks</h1>
            </div>
          </div>
        </div>
        <nav className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
              aria-current={activeTab === tab.key ? 'page' : undefined}
            >
              {TAB_ICONS[tab.key]}
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <section className={styles.viewSection}>
        {activeTab === 'board' && <Board />}
        {activeTab === 'list' && <ListView />}
        {activeTab === 'table' && <TableView />}
      </section>
    </main>
  );
}
