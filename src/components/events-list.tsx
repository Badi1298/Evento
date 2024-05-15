import { EventoEvent } from '@prisma/client';

import EventCard from './event-card';
import PaginationControls from './pagination-controls';

type EventsListProps = {
    events: EventoEvent[];
    previousPath: string;
    nextPath: string;
};

export default async function EventsList({
    events,
    previousPath,
    nextPath,
}: EventsListProps) {
    return (
        <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-5">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}

            <PaginationControls
                previousPath={previousPath}
                nextPath={nextPath}
            />
        </section>
    );
}
