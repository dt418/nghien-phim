import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function textTruncate(str: string, length = 160, ending = "...") {
  
  if (length == null) {
    length = 100;
  }

  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str?.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}
