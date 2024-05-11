import Logo from './Logo';

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
    return (
        <header className="flex justify-between items-center border-b border-white/10 h-14 px-3 sm:px-9">
            <Logo />
            <nav>
                <ul className="flex gap-x-6 text-sm">
                    {routes.map(route => (
                        <li
                            key={route.path}
                            className="text-white/50 hover:text-white transition"
                        >
                            <Link href={route.path}>{route.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}