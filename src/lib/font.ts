import { Be_Vietnam_Pro } from 'next/font/google'

export const fontBeVietnamPro = Be_Vietnam_Pro({
  display: 'swap',
  preload: true,
  // Include Vietnamese glyphs and full weight range to match Tailwind utilities
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be',
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'sans-serif',
  ],
})
