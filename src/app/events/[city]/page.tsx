import { Suspense } from 'react';

import { Metadata } from 'next';

import { capitalizeFirstLetter, getEvents } from '@/lib/utils';

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

export default async function EventsPage({
    params,
    searchParams,
}: EventsPageProps) {
    const { city } = params;
    const page = searchParams.page || 1;

    const events = await getEvents(city, Number(page));

    return (
        <main className="flex flex-col items-center py-24 px-5">
            <MainH1 className="mb-28">
                {city === 'all'
                    ? 'All Events'
                    : `Events in ${capitalizeFirstLetter(city)}`}{' '}
            </MainH1>

            <Suspense fallback={<Loading />}>
                <EventsList events={events} />
            </Suspense>
        </main>
    );
}
