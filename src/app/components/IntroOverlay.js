'use client';

import {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import styles from '@/css/IntroOverlay.module.css';
import opening from '@/../public/opening.png';
import openingPic from '@/../public/opening_pic.png';

export default function IntroOverlay() {
    const images = [opening, openingPic];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imgRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex(1);
        }, 400);

        const imgTimer = setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.style.display = 'none';
            }
        }, 1200);

        return () => {
            clearTimeout(timer);
            clearTimeout(imgTimer);
        }
    }, []);

    return (
        <div className={styles.container}>
            {images.map((img, idx) => (
                <div key={idx} className={`${styles.imageContainer} ${currentImageIndex === idx ? styles.visible : styles.hidden}`}>
                    <Image
                        ref={idx === 0 ? imgRef : null}
                        className={styles.image}
                        src={img}
                        alt={`이미지 ${idx + 1}`}
                        sizes="100%"
                        placeholder="blur"
                        blurDataURL={img.blurDataURL}
                        width={0}
                        height={0}
                        quality={100}
                        priority
                    />
                </div>
            ))}
        </div>
    );
}
