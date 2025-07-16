'use client';
import { useEffect } from 'react';

export default function ScrollLock({ duration }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            document.body.classList.add('scrollable');
        }, duration);

        return () => {
            clearTimeout(timer);
            document.body.classList.add('scrollable');
        };
    }, [duration]);

    return null;
}
