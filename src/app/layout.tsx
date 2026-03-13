import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ScrollToTop from '@/components/ScrollToTop';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Its Coffee',
  description: 'Good Coffee for someone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
