import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// allows me to use conditional classnames, join them together
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}