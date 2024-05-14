import React from 'react';
import Skeleton from './skeleton';

export default function SkeletonCard() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-52" />
        </div>
    );
}
