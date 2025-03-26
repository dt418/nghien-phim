import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import Footer from '~/components/partials/footer'
import { Header } from '~/components/partials/header'
import config from '~/lib/config'
import { fontBeVietnamPro } from '~/lib/font'
import { cn } from '~/lib/utils'
import { ThemeProvider } from '~/providers/theme'
import './globals.css'

export const metadata: Metadata = {
  description:
    'Xem phim mới nhất miễn phí tại nghienphim.netlify.app | Web xem phim miễn phí tốc độ cao',
  metadataBase: new URL(config.NEXT_PUBLIC_BASE_URL),
  title: {
    default: 'Danh sách phim mới nhất | nghienphim.netlify.app',
    template: '%s | nghienphim.netlify.app',
  },
}

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
  )
}
