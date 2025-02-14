import './globals.css';

import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';

import Footer from '@/components/partials/footer';
import { Header } from '@/components/partials/header';
import { fontBeVietnamPro } from '@/lib/font';
import { ThemeProvider } from '@/providers/theme';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://nghienphim.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | nghienphim.netlify.app',
    default: 'Danh sách phim mới nhất | nghienphim.netlify.app',
  },
  openGraph: {
    images: `${BASE_URL}/opengraph-image.jpg`,
    siteName: 'nghienphim.netlify.app',
    type: 'website',
    url: BASE_URL,
  },
  description:
    'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
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
