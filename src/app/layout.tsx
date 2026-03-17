import type { Metadata } from 'next';
import { Nunito, Geist } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ScrollToTop from '@/components/ScrollToTop';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

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
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body className={nunito.className}>
        <ReactQueryProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ReactQueryProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
