"use client";

import Image from "next/image";
import {useState} from "react";
import styles from "@/css/Gallery.module.css";

export default function Gallery() {
    const IMG_LIST = [1, 2, 3, 4, 5];
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex => prevIndex === 0 ? IMG_LIST.length - 1 : prevIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex => prevIndex === IMG_LIST.length - 1 ? 0 : prevIndex + 1);
    };

    return (<div className={styles.galleryContainer}>
            {/* 이미지 컨테이너 */}
            <div className={styles.imageContainer} style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                {IMG_LIST.map(num => (<div key={num} className={styles.imageWrapper}>
                        <Image
                            src={`/gallery/${num}.jpg`}
                            width={0}
                            sizes="100vw"
                            height={0}
                            alt={`Gallery image ${num}`}
                            className={styles.image}
                        />
                    </div>))}
            </div>

            {/* 네비게이션 버튼 */}
            <button onClick={goToPrevious} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous image">
                <Image src={'/prev.png'} width={12} height={12} alt={'prev image'}/>
            </button>

            <button onClick={goToNext} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next image">
                <Image src={'/next.png'} width={12} height={12} alt={'next image'}/>
            </button>
        </div>);
}
