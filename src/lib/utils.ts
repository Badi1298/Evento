import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}
