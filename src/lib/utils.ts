import type { ClassValue } from 'clsx'
import type { Config } from 'isomorphic-dompurify'
import { clsx } from 'clsx'
import DOMPurify from 'isomorphic-dompurify'
import { DateTime } from 'luxon'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string according to the specified format
 * @param date - ISO date string to format
 * @param format - Format type:
 *  - 'year': Returns only the year
 *  - 'full': Returns localized date and time in Vietnamese medium format
 * @returns Formatted date string or null if parsing fails
 *
 * @example
 * ```ts
 * // Get year only
 * formatDate('2023-12-25', 'year')
 * // Returns: 2023
 *
 * // Get full formatted date in Vietnamese
 * formatDate('2023-12-25T15:30:00', 'full')
 * // Returns: '25 thg 12, 2023, 15:30'
 * ```
 */
export function formatDate(date: string, format: 'year' | 'full') {
  const dateTime = DateTime.fromISO(date)
  if (format === 'year')
    return dateTime.year ?? null
  return dateTime.setLocale('vi').toLocaleString(DateTime.DATETIME_MED) ?? null
}

export function getFilmFormat(totalEpisodes: number) {
  return totalEpisodes === 1 ? 'Phim lẻ' : 'Phim bộ'
}

/**
 * Sanitizes HTML content using DOMPurify to prevent XSS attacks
 * @param {string | Node} html - The HTML content to sanitize
 * @param {Config} [cfg] - Optional DOMPurify configuration object
 * @returns {string} Sanitized HTML string
 * @example
 * // Basic usage
 * const dirty = '<div onclick="alert()">Hello</div>';
 * const clean = sanitizedHtml(dirty);
 * // Result: <div>Hello</div>
 *
 * // With config
 * const config = { ALLOWED_TAGS: ['div'] };
 * const dirty = '<div><script>alert()</script></div>';
 * const clean = sanitizedHtml(dirty, config);
 * // Result: <div></div>
 */
export function sanitizedHtml(html: string | Node, cfg?: Config) {
  return DOMPurify.sanitize(html, cfg)
}
