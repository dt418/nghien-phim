import './globals.css';

import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';

import Footer from '@/components/partials/footer';
import { Header } from '@/components/partials/header';
import { fontBeVietnamPro } from '@/lib/font';
import { ThemeProvider } from '@/providers/theme';

export const metadata: Metadata = {
  title: {
    template: '%s | nghienphim.netlify.app',
    default: 'Danh sách phim mới nhất | nghienphim.netlify.app',
  },
  description:
    'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
  openGraph: {
    title: 'Danh sách phim mới nhất | nghienphim.netlify.app',
    description:
      'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
    url: 'https://nghienphim.netlify.app/',
    siteName: 'nghienphim.netlify.app',
    images: [
      {
        url: 'https://nghienphim.netlify.app/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'nghienphim.netlify.app',
      },
    ],
    type: 'website',
  },
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
