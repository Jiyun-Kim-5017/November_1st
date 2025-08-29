'use client';
import {useState, useEffect} from 'react';

export default function ComingSoonTimer() {
    const targetDate = "2025-09-05T00:00:00";
    const [timeLeft, setTimeLeft] = useState({
        days: '--',
        hours: '--',
        minutes: '--',
        seconds: '--'
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const differenceNow = new Date(targetDate) - new Date();
            if (differenceNow > 0) {
                return {
                    days: Math.floor(differenceNow / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((differenceNow / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((differenceNow / 1000 / 60) % 60),
                    seconds: Math.floor((differenceNow / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: "relative",
            top: 0,
            left: 0,
            background: "center / cover no-repeat url('/card2.png')",
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{textAlign: 'center', fontSize: '20px', lineHeight: '1.8'}}>
                <div style={{fontSize: '24px', marginBottom: 5}}>
                    <b style={{color: '#f0a1bf'}}>9</b>월 <b style={{color: '#f0a1bf'}}>5</b>일
                </div>
                <div style={{fontSize: '20px', marginBottom: '20px'}}>
                    모바일 청첩장이 공개됩니다
                </div>

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    <div style={{textAlign: 'center'}}>
                        <span>{timeLeft.days}</span>
                        <span style={{fontSize: '14px', fontWeight: 'normal'}}> 일</span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <span>{timeLeft.hours}</span>
                        <span style={{fontSize: '14px', fontWeight: 'normal'}}> 시간</span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <span>{timeLeft.minutes}</span>
                        <span style={{fontSize: '14px', fontWeight: 'normal'}}> 분</span>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <span>{timeLeft.seconds}</span>
                        <span style={{fontSize: '14px', fontWeight: 'normal'}}> 초</span>
                    </div>
                </div>

                <div style={{fontSize: 18, color: "#68a4d9", fontWeight: 'bold', letterSpacing: 1}}>
                    COMING SOON!
                </div>
            </div>
        </div>
    );
}