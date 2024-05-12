type MainH1Props = {
    children: React.ReactNode;
};

export default function MainH1({ children }: MainH1Props) {
    return (
        <h1 className="text-3xl lg:text-6xl font-bold tracking-tight">
            {children}
        </h1>
    );
}
