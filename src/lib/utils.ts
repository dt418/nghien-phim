import { type ClassValue, clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string, format: 'year' | 'full') => {
  const dateTime = DateTime.fromISO(date);
  if (format === 'year') return dateTime.year ?? null;
  return dateTime.setLocale('vi').toLocaleString(DateTime.DATETIME_MED) ?? null;
};

export const getFilmFormat = (totalEpisodes: number) =>
  totalEpisodes === 1 ? 'Phim lẻ' : 'Phim bộ';
