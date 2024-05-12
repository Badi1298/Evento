'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

import Logo from './logo';
import Link from 'next/link';

const routes = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Events',
        path: '/events/all',
    },
];

export default function Header() {
    const activePathname = usePathname();

    return (
        <header className="flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9">
            <Logo />
            <nav className="h-full">
                <ul className="flex gap-x-6 h-full text-sm">
                    {routes.map((route) => (
                        <li
                            key={route.path}
                            className={cn(
                                'flex items-center relative transition hover:text-white',
                                [
                                    activePathname === route.path
                                        ? 'text-white'
                                        : 'text-white/50',
                                ]
                            )}
                        >
                            <Link href={route.path}>{route.name}</Link>

                            {activePathname === route.path && (
                                <motion.div
                                    layoutId="header-active-link"
                                    className="bg-accent h-1 w-full absolute bottom-0"
                                ></motion.div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
