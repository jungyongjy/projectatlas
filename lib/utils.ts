import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatenate class names, filtering out falsy values.
 * Uses clsx + tailwind-merge for intelligent Tailwind class merging.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string for display (Singapore locale).
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Estimate reading time in minutes from plain text content.
 */
export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const wpm = 225;
  return Math.max(1, Math.ceil(words / wpm));
}

/**
 * Format reading time for display.
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "Less than a minute";
  if (minutes === 1) return "1 minute";
  return `${minutes} minutes`;
}

/**
 * Generate an anchor-friendly ID from a heading string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
