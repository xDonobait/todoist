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
  title: 'Fokus',
  description: 'A minimalist task management application',
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
