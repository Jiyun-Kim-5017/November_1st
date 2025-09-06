"use client";

import Image from "next/image";
import {useCallback, useEffect, useState} from "react";
import {
    handleNaverNavigation,
    handleKakaoNavigation,
    handleTmapNavigation,
    NAVER_MAP_API_URL
} from "@/util/deeplink";
import Script from "next/script";
import styles from "@/css/Loca.module.css";
import train from '@/../public/train.png';
import bus from '@/../public/bus.png';
import car from '@/../public/car.png';

export default function Loca() {
    const [isMobile, setIsMobile] = useState(false);

    const DEST = {
        lat: 37.5684500, 
        lng: 126.896400, 
        name: "월드컵컨벤션",
    };

    useEffect(() => {
        const ua = typeof navigator === "undefined" ? "" : navigator.userAgent.toLowerCase();
        const mobile = /android|iphone|ipad|ipod|windows phone|blackberry|mobi|phone/.test(ua);
        setIsMobile(mobile);
    }, []);

    const initMap = useCallback(() => {
        let map = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(37.5682885, 126.8972730), 
            zoom: 16, 
            minZoom: 14, 
            zoomControl: true, 
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        });

        let marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.5684500, 126.896400), 
            map: map
        });
    }, []);

    const handleNaverClick = (e) => {
        e.preventDefault();
        handleNaverNavigation(DEST, isMobile);
    };

    const handleKakaoClick = (e) => {
        e.preventDefault();
        handleKakaoNavigation(DEST, isMobile);
    };

    const handleTmapClick = (e) => {
        e.preventDefault();
        handleTmapNavigation(DEST, isMobile);
    };

    return <>
        <Script 
            type="text/javascript" 
            strategy="afterInteractive" 
            onReady={initMap} 
            src={NAVER_MAP_API_URL}
        />
        <div id="map" className={styles.map}></div>
        <div className={styles.buttonBox}>
            <a className={styles.button} href="#" onClick={handleNaverClick}>
                <Image src={"/naver.webp"} width={200} height={200} alt={"naver"} className={styles.buttonImg}/>
                네이버
            </a>
            <a className={styles.button} href="#" onClick={handleKakaoClick}>
                <Image src={"/kakao.webp"} width={200} height={200} alt={"kakao"} className={styles.buttonImg}/>
                카카오
            </a>
            {isMobile && <a className={styles.button} href="#" onClick={handleTmapClick}>
                <Image src={"/tmap.webp"} width={200} height={200} alt={"tmap"} className={styles.buttonImg}/>
                티맵
            </a>}
        </div>
        <div className={styles.guideLine}>
            <div className={styles.infoTitle}>
                <Image src={train} alt="train" width={20} height={20}/>
                지하철
            </div>
            <div className={styles.info}>
                <b style={{color: '#CD7C2F'}}>6호선</b> [월드컵경기장]역 2번 출구
            </div>
            <div className={styles.infoTitle}>
                <Image src={bus} alt="train" width={20} height={20}/>
                버스
            </div>
            <div className={styles.info}>[월드컵경기장 서측.문화비축기지]정류장</div>
            <div className={styles.info} style={{color: 'rgb(40 106 191)', fontWeight: 'bold'}}>571, 710, 760</div>
            <div className={styles.info} style={{color: 'rgb(38 189 86)', fontWeight: 'bold'}}>7019, 7715, 8777</div>
            <div className={styles.info} style={{color: 'rgb(251 15 15)', fontWeight: 'bold'}}>9711</div>
            <div className={styles.infoTitle}>
                <Image src={car} alt="train" width={20} height={20}/>
                자가용
            </div>
            <div className={styles.info}>네비게이션에 [<span style={{color: '#000'}}>월드컵컨벤션</span>] 검색</div>
            <div className={styles.info}>서측 1, 2 주차장 이용해 주세요.</div>
            <div className={styles.info}>홈플러스는 무료 주차 불가합니다.</div>
            <div className={styles.info}>주차 접수대 등록하시면 90분 무료입니다.</div>
        </div>
    </>;
}