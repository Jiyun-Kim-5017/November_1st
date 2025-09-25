'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5분
                gcTime: 1000 * 60 * 30, // 30분 (이전 cacheTime)
                retry: (failureCount, error) => {
                    if (error?.status === 401) return false;
                    return failureCount < 3;
                },
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 1,
            }
        }
    }));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}