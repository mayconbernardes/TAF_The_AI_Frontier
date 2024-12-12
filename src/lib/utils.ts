import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueSlug(title: string): string {
  // Convert to lowercase and replace spaces with hyphens
  let slug = title.toLowerCase().replace(/\s+/g, "-");
  
  // Remove special characters
  slug = slug.replace(/[^a-z0-9-]/g, "");
  
  // Add a random suffix to ensure uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  
  return `${slug}-${randomSuffix}`;
}