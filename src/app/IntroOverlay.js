'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '@/css/IntroOverlay.module.css';

export default function IntroOverlay({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex(1);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.container}>
            {images.map((img, index) => (
                <div
                    key={img}
                    className={`${styles.imageContainer} ${
                        currentImageIndex === index ? styles.visible : styles.hidden
                    }`}
                >
                    <Image
                        className={styles.image}
                        src={img}
                        alt={`이미지 ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority={index === 0}
                        style={{ width: '100%', height: '100%' }}
                        quality={100}
                    />
                </div>
            ))}
        </div>
    );
}
