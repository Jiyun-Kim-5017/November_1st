"use client";

import styles from "@/css/FlowerImg.module.css";

export default function FlowerImg({ num }) {
    return (
        num === 1 ? (
            <img
                src="/main_img_icon1.png"
                alt="logo"
                width={150}
                height={100}
                className={styles.flowerRight}
            />
        ) : (
            <img
                src="/main_img_icon2.png"
                alt="logo"
                width={120}
                height={96}
                className={styles.flowerLeft}
            />
        )
    );
}
