"use client";

import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {EffectCoverflow} from "swiper/modules";
import "swiper/css";
import styles from "@/css/Gallery.module.css";
import close from "@/../public/img-x.png";

export default function Gallery() {
    const [openOverlay, setOpenOverlay] = useState({
        show: false,
        idx: 0,
    });
    const IMG_LIST = Array.from({length: 26});

    useEffect(() => {
        document.body.classList.toggle("scrollable", !openOverlay.show);
    }, [openOverlay]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setOpenOverlay({show: false, idx: 0});
        }
    };

    return <>
        <Swiper className={styles.swiperContainer}
                effect={"coverflow"}
                centeredSlides={true}
                spaceBetween={0}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 40, stretch: -20, depth: 40, slideShadows: false
                }} modules={[EffectCoverflow]}>
            {IMG_LIST.map((num, index) => <SwiperSlide className={styles.swiperSlide} key={`slide-${index + 1}`}>
                <Image
                    src={`/gallery/${index + 1}.jpg`}
                    width={600}
                    height={900}
                    quality={90}
                    alt={`Gallery image ${index + 1}`}
                    className={styles.galleryImage}
                    onClick={() => {
                        setOpenOverlay({show: true, idx: index});
                        document.body.classList.remove('scrollable');
                    }}
                />
            </SwiperSlide>)}
        </Swiper>
        {openOverlay.show && <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.overlayContainer}>
                <Image
                    className={styles.closeOverlay}
                    onClick={() => setOpenOverlay({show: false, idx: 0})}
                    src={close}
                    alt="close"
                    priority
                    width={20}
                    height={20}
                />
                <Swiper slidesPerView={1} initialSlide={openOverlay.idx} loop={true}>
                    {IMG_LIST.map((num, index) => (
                        <SwiperSlide className={styles.overlaySwiperSlide} key={`overlay-slide-${index + 1}`}>
                            <Image
                                src={`/gallery/${index + 1}.jpg`}
                                width={1200}
                                height={1800}
                                quality={100}
                                alt={`Gallery image ${index + 1}`}
                                className={styles.overlayImg}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>}
    </>;
}