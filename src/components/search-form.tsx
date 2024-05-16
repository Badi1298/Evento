'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchText) return;

        router.push(`/events/${searchText}?page=1`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full sm:w-[36.25rem]">
            <input
                value={searchText}
                type="text"
                name="city"
                id="city"
                spellCheck="false"
                placeholder="Search events in any city..."
                autoComplete="off"
                className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent transition focus:ring-2 focus:bg-white/10"
                onChange={(e) => setSearchText(e.target.value)}
            />
        </form>
    );
}
