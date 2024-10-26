import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import Footer from "@/components/partials/footer";
import { Header } from "@/components/partials/header";
import { ThemeProvider } from "@/providers/theme";

import "./globals.css";

const fontBeVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true, // <--- add this
});

export const metadata: Metadata = {
  title: {
    template: "%s | nghienphim.tv",
    default: "Danh sách phim mới nhất | nghienphim.tv",
  },
  description: "nghienphim.tv | Web xem phim miễn phí tốc độc cao",
};

export default function RootLayout({ children }: PropsWithChildren) {
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

export { fontBeVietnamPro };

