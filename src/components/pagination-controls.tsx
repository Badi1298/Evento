import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

const btnStyles =
    'flex items-center gap-x-2 text-white px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-xs';

type PaginationControlsTypes = {
    previousPath: string;
    nextPath: string;
};

export default function PaginationControls({
    previousPath,
    nextPath,
}: PaginationControlsTypes) {
    return (
        <section className="flex justify-between w-full">
            {previousPath ? (
                <Link href={previousPath} className={btnStyles}>
                    <ArrowLeftIcon />
                    Previous
                </Link>
            ) : (
                <div />
            )}
            {nextPath && (
                <Link href={nextPath} className={btnStyles}>
                    Next
                    <ArrowRightIcon />
                </Link>
            )}
        </section>
    );
}
