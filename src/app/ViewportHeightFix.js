'use client';
import { useEffect } from 'react';

export default function ViewportHeightFix() {
    useEffect(() => {
        // 카카오톡 브라우저 감지
        const isKakaoTalk = /KAKAOTALK/i.test(navigator.userAgent);

        function setVH() {
            let vh;

            if (isKakaoTalk) {
                // 카카오톡 브라우저에서는 screen.height 사용
                vh = Math.max(window.innerHeight, window.screen.height) * 0.01;
            } else {
                vh = window.innerHeight * 0.01;
            }

            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // 카카오톡 브라우저 전용 스타일 적용
            if (isKakaoTalk) {
                document.body.style.minHeight = `${vh * 100}px`;

                // 배경 이미지에 최소 높이 설정
                const beforeElement = document.querySelector('body::before');
                if (beforeElement) {
                    beforeElement.style.minHeight = `${vh * 100}px`;
                }
            }
        }

        // 초기 설정
        setVH();

        // 리사이즈 이벤트 리스너 (디바운싱 적용)
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setVH();
            }, 100);
        };

        // 오리엔테이션 변경 감지
        const handleOrientationChange = () => {
            setTimeout(() => {
                setVH();
            }, isKakaoTalk ? 1000 : 500); // 카카오톡에서는 더 긴 지연
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);

        // 카카오톡 브라우저 전용 처리
        if (isKakaoTalk) {
            // 카카오톡에서는 더 빈번한 체크가 필요
            const kakaoCheckInterval = setInterval(() => {
                setVH();
            }, 500);

            // 스크롤 이벤트로도 체크
            const handleScroll = () => {
                setVH();
            };

            document.addEventListener('scroll', handleScroll, { passive: true });
            document.addEventListener('touchmove', handleScroll, { passive: true });

            return () => {
                clearInterval(kakaoCheckInterval);
                document.removeEventListener('scroll', handleScroll);
                document.removeEventListener('touchmove', handleScroll);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('orientationchange', handleOrientationChange);
                clearTimeout(resizeTimer);
            };
        }

        // Visual Viewport API 지원 시 사용 (모던 브라우저)
        if (window.visualViewport) {
            const handleVisualViewportChange = () => {
                const vh = window.visualViewport.height * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            window.visualViewport.addEventListener('resize', handleVisualViewportChange);

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('orientationchange', handleOrientationChange);
                window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
                clearTimeout(resizeTimer);
            };
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
            clearTimeout(resizeTimer);
        };
    }, []);

    return null;
}
