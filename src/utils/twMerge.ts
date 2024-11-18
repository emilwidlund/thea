import { twMerge as tw } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export const twMerge = (...params: ClassValue[]) => tw(clsx(...params));
