'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/css/IntroOverlay.module.css';

export default function IntroOverlay() {
    const images = ["/opening.jpg", "/opening_pic.jpg"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex(1);
        }, 1000);

        const imgTimer = setTimeout(() => {
            document.querySelector('#first img').style.display = 'none';
        }, 2000);

        return () => {
            clearTimeout(timer);
            clearTimeout(imgTimer);
        }
    }, []);

    return (
        <div className={styles.container}>
            {images.map((img, idx) => (
                <div
                    key={img}
                    className={`${styles.imageContainer} ${
                        currentImageIndex === idx ? styles.visible : styles.hidden
                    }`}
                    id={idx === 0 ? "first": ""}
                >
                    <Image
                        className={styles.image}
                        src={img}
                        alt={`이미지 ${idx + 1}`}
                        sizes="100%"
                        placeholder="blur"
                        blurDataURL={img}
                        width={0}
                        height={0}
                        style={{ width: '100%', height: '100%' }}
                        quality={100}
                    />
                </div>
            ))}
        </div>
    );
}
