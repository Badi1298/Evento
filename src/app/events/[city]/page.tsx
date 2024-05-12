import { EventoEvent } from '@/lib/types';

import MainH1 from '@/components/main-h1';
import EventsList from '@/components/events-list';

type EventsPageProps = {
    params: { city: string };
};

export default async function EventsPage({ params }: EventsPageProps) {
    const response = await fetch(
        'https://bytegrad.com/course-assets/projects/evento/api/events?city=austin'
    );
    if (!response.ok) throw new Error('Failed to fetch data.');

    const events: EventoEvent[] = await response.json();

    const { city } = params;

    const capitalizeFirstWord = (str: string): string => {
        if (!str) return '';

        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <main className="flex flex-col items-center py-24 px-5">
            <MainH1 className="mb-28">
                {city === 'all'
                    ? 'All Events'
                    : `Events in ${capitalizeFirstWord(city)}`}{' '}
            </MainH1>

            <EventsList events={events} />
        </main>
    );
}
