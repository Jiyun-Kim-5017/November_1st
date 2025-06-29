'use client';
import { useEffect, useRef, useState } from 'react';

export default function HeartCursorEffect() {
    const lastHeartTimeRef = useRef(0);
    const cursorRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const activeHeartsRef = useRef(new Set());
    const isMobileRef = useRef(false);

    useEffect(() => {
        isMobileRef.current = /mobile|tablet|android|ios/i.test(navigator.userAgent);

        // PC에서만 커서 하트 표시
        if (!isMobileRef.current) {
            const cursorHeart = document.createElement('img');
            cursorHeart.src = '/heart.png';
            cursorHeart.className = 'cursor-heart';
            cursorRef.current = cursorHeart;
            document.body.appendChild(cursorHeart);
        }

        const createFloatingHeart = (x, y, duration = 2000) => {
            const heart = document.createElement('img');
            heart.src = '/heart.png';
            heart.className = 'heart-bubble';
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.width = `${Math.random() * 10 + 15}px`;
            heart.style.animationDuration = `${duration / 1000}s`;

            document.body.appendChild(heart);
            activeHeartsRef.current.add(heart);

            setTimeout(() => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
                activeHeartsRef.current.delete(heart);
            }, duration);
        };

        const handleMouseMove = (e) => {
            if (isMobileRef.current) return;

            const now = Date.now();
            setPosition({ x: e.clientX, y: e.clientY });

            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }

            if (now - lastHeartTimeRef.current > 150) {
                lastHeartTimeRef.current = now;
                createFloatingHeart(e.clientX, e.clientY);
            }
        };

        const handleTouch = (e) => {
            if (!isMobileRef.current) return;

            const touch = e.touches[0];
            const now = Date.now();

            if (now - lastHeartTimeRef.current > 150) {
                lastHeartTimeRef.current = now;
                createFloatingHeart(touch.clientX, touch.clientY, 2000);
            }
        };

        const cleanupHearts = () => {
            activeHeartsRef.current.forEach(heart => {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
            });
            activeHeartsRef.current.clear();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouch, { passive: true });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouch);
            if (cursorRef.current) {
                cursorRef.current.remove();
            }
            cleanupHearts();
        };
    }, []);

    return null;
}
