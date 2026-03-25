import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: string = 'ja'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateLevel(xp: number): { level: number; progress: number; nextLevelXp: number } {
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;
  const nextLevelXp = 100;
  return { level, progress, nextLevelXp };
}
