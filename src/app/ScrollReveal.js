'use client';
import {useEffect, useRef, useState} from 'react';

export default function ScrollReveal({children}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(true); // 기본값 true (데스크탑용)
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const mobile = /Mobi|Android/i.test(navigator.userAgent);
        setIsMobile(mobile);

        if (!mobile) {
            // 모바일이 아니면 관찰하지 않고 항상 보이게
            setIsVisible(true);
            return;
        }

        // 모바일일 때만 observer 동작
        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio;
                setIsVisible(ratio >= 0.4);
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100),
            }
        );

        const target = ref.current;
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-opacity duration-700 ease-in-out transform opacity-0 ${
                isMobile
                    ? isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    : ''
            }`}
        >
            {children}
        </div>
    );
}
