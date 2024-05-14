import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { EventoEvent } from '@prisma/client';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getEvents(city: string): Promise<EventoEvent[]> {
    const response = await fetch(
        `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
        {
            next: {
                revalidate: 300,
            },
        }
    );
    if (!response.ok) throw new Error('Failed to fetch data.');

    const events: EventoEvent[] = await response.json();

    return events;
}

export async function getEvent(slug: string): Promise<EventoEvent> {
    const response = await fetch(
        `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
    );
    if (!response.ok) throw new Error('Failed to fetch data.');

    const event: EventoEvent = await response.json();

    return event;
}
