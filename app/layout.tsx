import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import './globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
});

export const metadata: Metadata = {
  title: 'Fokus — Minimalist Task Manager',
  description: 'A clean, distraction-free task management app. Create, organize, and complete your tasks with clarity. Built with Next.js for a fast, minimalist productivity experience.',
  keywords: ['task manager', 'todo list', 'productivity', 'minimalist', 'organizer', 'tasks'],
  authors: [{ name: 'Donoban Peralta' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  openGraph: {
    title: 'Fokus — Minimalist Task Manager',
    description: 'A clean, distraction-free task management app for focused productivity',
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
