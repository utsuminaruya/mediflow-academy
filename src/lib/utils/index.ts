import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, MultiLangText } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedText(
  text: MultiLangText,
  locale: Locale,
  fallback: Locale = "ja"
): string {
  return text[locale] || text[fallback] || text.ja || "";
}

export function formatDate(date: string, locale: Locale = "ja"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatSalary(min?: number, max?: number): string {
  if (!min && !max) return "応相談";
  if (min && max) {
    return `${(min / 10000).toFixed(0)}万〜${(max / 10000).toFixed(0)}万円`;
  }
  if (min) return `${(min / 10000).toFixed(0)}万円〜`;
  return `〜${(max! / 10000).toFixed(0)}万円`;
}

export function getJLPTColor(level: string): string {
  const colors: Record<string, string> = {
    N1: "#8B5CF6",
    N2: "#3B82F6",
    N3: "#10B981",
    N4: "#F59E0B",
    N5: "#EF4444",
  };
  return colors[level] || "#718096";
}

export function calculateStreakDays(dates: string[]): number {
  if (!dates.length) return 0;
  const sorted = [...dates].sort().reverse();
  const today = new Date().toDateString();
  let streak = 0;
  let current = new Date();

  for (const date of sorted) {
    const d = new Date(date);
    if (d.toDateString() === current.toDateString()) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}
