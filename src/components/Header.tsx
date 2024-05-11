import Logo from './Logo';

import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Logo />
            <Link href="/">Home</Link>
            <Link href="/events/all">Events</Link>
        </header>
    );
}
