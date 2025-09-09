"use client";

import Image from "next/image";
import styles from "@/css/FlowerImg.module.css";
import flower1 from '@/../public/main_img_icon1.png';
import flower2 from '@/../public/main_img_icon2.png';

export default function FlowerImg({ num }) {
    return (
        num === 1 ? (
            <Image
                src={flower1}
                alt="flower"
                width={150}
                height={100}
                className={styles.flowerRight}
            />
        ) : (
            <Image
                src={flower2}
                alt="flower"
                width={120}
                height={96}
                className={styles.flowerLeft}
            />
        )
    );
}
