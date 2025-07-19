import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'L&SD Office Supplies - Professional Business Solutions',
  description: 'High-quality office supplies, computers, and business services. Custom solutions for your workplace needs with expert support and reliable products.',
  keywords: 'office supplies, computers, business services, office equipment, Canon, Asus, AMD, Epson',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}