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
              viewBox="0 0 375 374.999991"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <g />
              </defs>
              <g fill="currentColor" fillOpacity="1">
                <g transform="translate(77.990435, 318.925303)">
                  <g>
                    <path d="M 36.59375 38.40625 L 13.796875 15.59375 C 8.992188 13.59375 4.992188 10.289062 1.796875 5.6875 C -1.398438 1.09375 -3 -3.800781 -3 -9 L -3 -256.203125 C -3 -270.203125 1.898438 -282 11.703125 -291.59375 C 21.503906 -301.195312 33.203125 -306 46.796875 -306 L 204 -306 C 209.601562 -306 214.601562 -304.296875 219 -300.890625 C 223.394531 -297.492188 226.59375 -293.394531 228.59375 -288.59375 L 251.40625 -266.40625 C 256.601562 -261.195312 259.203125 -255.394531 259.203125 -249 L 259.203125 -210 C 259.203125 -203.601562 256.703125 -197.800781 251.703125 -192.59375 C 246.703125 -187.394531 240.800781 -184.796875 234 -184.796875 L 186 -184.796875 C 189.195312 -181.597656 191.394531 -178.195312 192.59375 -174.59375 L 215.40625 -152.40625 C 220.601562 -147.195312 223.203125 -141.394531 223.203125 -135 L 223.203125 -93 C 223.203125 -86.601562 220.703125 -80.800781 215.703125 -75.59375 C 210.703125 -70.394531 204.800781 -67.796875 198 -67.796875 L 154.203125 -67.796875 L 142.203125 -69.59375 L 142.203125 21 C 142.203125 27.394531 139.703125 33.191406 134.703125 38.390625 C 129.703125 43.597656 123.800781 46.203125 117 46.203125 L 54 46.203125 C 47.601562 46.203125 41.800781 43.601562 36.59375 38.40625 Z M 36.59375 38.40625" />
                  </g>
                </g>
              </g>
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
