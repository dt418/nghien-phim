import './globals.css';

import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';

import Footer from '@/components/partials/footer';
import { Header } from '@/components/partials/header';
import config from '@/lib/config';
import { fontBeVietnamPro } from '@/lib/font';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme';

export const metadata: Metadata = {
  metadataBase: new URL(config.NEXT_PUBLIC_BASE_URL),
  title: {
    template: '%s | nghienphim.netlify.app',
    default: 'Danh sách phim mới nhất | nghienphim.netlify.app',
  },
  description:
    'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontBeVietnamPro.variable)}>
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
