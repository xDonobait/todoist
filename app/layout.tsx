import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import './globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  title: 'Fokus — Task Board',
  description: 'A modern Kanban-style task board for organizing and tracking your projects. Built with Next.js.',
  keywords: ['task manager', 'kanban board', 'productivity', 'project management', 'tasks'],
  authors: [{ name: 'Donoban Peralta' }],
  openGraph: {
    title: 'Fokus — Task Board',
    description: 'A modern Kanban-style task board for organizing and tracking your projects',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
