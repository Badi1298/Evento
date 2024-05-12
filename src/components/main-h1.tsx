import { cn } from '@/lib/utils';

type MainH1Props = {
    children: React.ReactNode;
    className?: string;
};

export default function MainH1({ children, className }: MainH1Props) {
    return (
        <h1
            className={cn(
                'text-3xl lg:text-6xl font-bold tracking-tight',
                className
            )}
        >
            {children}
        </h1>
    );
}
