import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Todoist — Minimalist Task Manager',
  description: 'A clean and professional task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
