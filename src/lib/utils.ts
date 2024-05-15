import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import prisma from './db';
import { EventoEvent } from '@prisma/client';

import { notFound } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';

    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getEvents(
    city: string,
    page: number = 1
): Promise<EventoEvent[]> {
    const events = await prisma.eventoEvent.findMany({
        where: {
            city: city === 'all' ? undefined : capitalizeFirstLetter(city),
        },
        orderBy: {
            date: 'asc',
        },
        skip: (page - 1) * 6,
        take: 6,
    });

    return events;
}

export async function getEvent(slug: string): Promise<EventoEvent | null> {
    const event = await prisma.eventoEvent.findUnique({
        where: {
            slug: slug,
        },
    });

    if (!event) return notFound();

    return event;
}
