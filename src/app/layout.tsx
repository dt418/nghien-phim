import './globals.css';

import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';

import Footer from '@/components/partials/footer';
import { Header } from '@/components/partials/header';
import { fontBeVietnamPro } from '@/lib/font';
import { ThemeProvider } from '@/providers/theme';

export const metadata: Metadata = {
  title: {
    template: '%s | nghienphim.tv',
    default: 'Danh sách phim mới nhất | nghienphim.tv',
  },
  description: 'nghienphim.tv | Web xem phim miễn phí tốc độc cao',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontBeVietnamPro.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
