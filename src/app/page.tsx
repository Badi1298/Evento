import Link from 'next/link';

import MainH1 from '@/components/main-h1';
import SearchForm from '@/components/search-form';

export default function Home() {
    return (
        <main className="flex flex-col items-center pt-36 px-3">
            <MainH1>Find events around you</MainH1>
            <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
                Browse more than{' '}
                <span className="font-bold italic underline text-accent">
                    10,000 events
                </span>{' '}
                around you
            </p>

            <SearchForm />

            <section className="flex gap-x-4 mt-4 text-sm text-white/50">
                <p>Popular:</p>
                <div className="space-x-2 font-semibold">
                    <Link href="/events/austin">Austin</Link>
                    <Link href="/events/seattle">Seattle</Link>
                </div>
            </section>
        </main>
    );
}
