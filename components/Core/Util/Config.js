import nextConfig from 'next/config';
import { useMemo } from 'react';
const { publicRuntimeConfig } = nextConfig();

export function useConfig() {
    const config = useMemo(() => {
        return getConfig();
    }, []);
    return config;
}

export function getConfig() {
    return { ...publicRuntimeConfig };
}
