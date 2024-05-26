import 'server-only';

import { notFound } from 'next/navigation';
import { unstable_cache } from 'next/cache';

import prisma from './db';
import { EventoEvent } from '@prisma/client';

import { capitalizeFirstLetter } from './utils';

export const getEvents = unstable_cache(
    async (city: string, page: number = 1) => {
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

        let totalCount;

        if (city === 'all') {
            totalCount = await prisma.eventoEvent.count();
        } else {
            totalCount = await prisma.eventoEvent.count({
                where: {
                    city: capitalizeFirstLetter(city),
                },
            });
        }

        return { events, totalCount };
    }
);

export const getEvent = unstable_cache(
    async (slug: string): Promise<EventoEvent> => {
        const event = await prisma.eventoEvent.findUnique({
            where: {
                slug: slug,
            },
        });

        if (!event) return notFound();

        return event;
    }
);
