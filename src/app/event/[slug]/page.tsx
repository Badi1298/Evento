import { format } from 'date-fns';

import { Metadata } from 'next';

import { getEvent } from '@/lib/server-utils';

import Image from 'next/image';
import MainH1 from '@/components/main-h1';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;

    const event = await getEvent(slug);

    return {
        title: event?.name,
    };
}

export async function generateStaticParams() {
    // top 100 most popular events
    return [{ slug: 'comedy-extravaganza' }, { slug: 'dj-practice-session' }];
}

export default async function EventPage({ params }: Props) {
    const { slug } = params;

    const event = await getEvent(slug);

    return (
        <main>
            <section className="relative flex justify-center items-center overflow-hidden py-14 md:py-20">
                <Image
                    src={event.imageUrl}
                    alt="Event backround image"
                    fill
                    quality={50}
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover blur-3xl z-0"
                />

                <div className="relative flex flex-col lg:flex-row gap-6 lg:gap-16 z-10">
                    <Image
                        src={event.imageUrl}
                        alt={event.name}
                        width={300}
                        height={201}
                        className="rounded-xl border-2 border-white/50 object-cover"
                    />

                    <div className="flex flex-col">
                        <p className="text-white/75">
                            {format(new Date(event.date), 'EEEE, MMMM dd')}
                        </p>
                        <MainH1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
                            {event.name}
                        </MainH1>
                        <p className="whitespace-nowrap text-xl text-white/75">
                            Organized by{' '}
                            <span className="italic">
                                {event.organizerName}
                            </span>
                        </p>
                        <button className="bg-white/20 text-lg capitalize w-[95vw] py-2 sm:w-full rounded-md border-2 border-white/10 backdrop-blur mt-5 lg:mt-auto state-effects">
                            Get tickets
                        </button>
                    </div>
                </div>
            </section>

            <div className="min-h-[75vh] text-center px-5 py-16">
                <Section>
                    <SectionHeading>About this event</SectionHeading>
                    <SectionContent>{event.description}</SectionContent>
                </Section>
                <Section>
                    <SectionHeading>Location</SectionHeading>
                    <SectionContent>{event.location}</SectionContent>
                </Section>
            </div>
        </main>
    );
}

function Section({ children }: { children: React.ReactNode }) {
    return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
            {children}
        </p>
    );
}
