"use client";

import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow} from "swiper/modules";
import "swiper/css";
import styles from "@/css/Gallery.module.css";

export default function Gallery() {
    const IMG_LIST = [1, 2, 3, 4, 5];

    return <Swiper className={styles.swiperContainer}
                   effect={"coverflow"}
                   centeredSlides={true}
                   spaceBetween={0}
                   loop={true}
                   slidesPerView={"auto"}
                   coverflowEffect={{
                       rotate: 40, stretch: -20, depth: 40, slideShadows: false
                   }} modules={[EffectCoverflow]}>
        {IMG_LIST.map(num => <SwiperSlide className={styles.swiperSlide} key={`slide-${num}`}>
            <Image
                src={`/gallery/${num}.jpg`}
                width={1200}
                height={1800}
                quality={100}
                alt={`Gallery image ${num}`}
                className={styles.galleryImage}
                priority={num <= 3}
            />
        </SwiperSlide>)}
    </Swiper>;
}
