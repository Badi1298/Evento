import { Metadata } from 'next';
import { Suspense } from 'react';

import { z } from 'zod';

import { getEvents } from '@/lib/server-utils';
import { capitalizeFirstLetter } from '@/lib/utils';

import Loading from './loading';
import MainH1 from '@/components/main-h1';
import EventsList from '@/components/events-list';

type Props = {
    params: { city: string };
};

type EventsPageProps = Props & {
    searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
    const { city } = params;

    return {
        title:
            city === 'all'
                ? 'All Events'
                : `Event in ${capitalizeFirstLetter(city)}`,
    };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
    params,
    searchParams,
}: EventsPageProps) {
    const { city } = params;
    const parsedPage = pageNumberSchema.safeParse(searchParams.page);

    if (!parsedPage.success) {
        throw new Error('Invalid page number');
    }

    const page = Number(parsedPage.data);
    const { events, totalCount } = await getEvents(city, page);

    const previousPath = getPreviousPath(city, page);
    const nextPath = getNextPath(city, page, totalCount);

    return (
        <main className="flex flex-col items-center py-24 px-5">
            <MainH1 className="mb-28">{getCityTitle(city)}</MainH1>

            <Suspense key={`${city}-${page}`} fallback={<Loading />}>
                <EventsList
                    events={events}
                    previousPath={previousPath}
                    nextPath={nextPath}
                />
            </Suspense>
        </main>
    );
}

function getPreviousPath(city: string, page: number): string {
    return page > 1 ? `/events/${city}?page=${page - 1}` : '';
}

function getNextPath(city: string, page: number, totalCount: number): string {
    return totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : '';
}

function getCityTitle(city: string): string {
    return city === 'all'
        ? 'All Events'
        : `Events in ${capitalizeFirstLetter(city)}`;
}
