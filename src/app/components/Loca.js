"use client";

import Image from "next/image";
import {useCallback, useEffect, useState} from "react";
import {openAppWithFallback} from "@/util/deeplink";
import Script from "next/script";
import styles from "@/css/Loca.module.css";

export default function Loca() {
    const [isMobile, setIsMobile] = useState(false);

    const DEST = {
        lat: 37.5684500, lng: 126.896400, name: "월드컵컨벤션",
    };

    const naverMobileURL = `nmap://route/public?dlat=${DEST.lat}&dlng=${DEST.lng}&dname=${encodeURIComponent(DEST.name)}`;
    const naverWebURL = `https://map.naver.com/p/directions/-/14126029.9633415,4518658.3911646,,1902387925,PLACE_POI/-/transit?c=15.00,0,0,0,dh`;
    const kakaoMobileURL = `kakaomap://route?ep=${DEST.lat},${DEST.lng}&by=PUBLICTRANSIT&en=${encodeURIComponent(DEST.name)}`;
    const kakaoWebURL = `https://m.map.kakao.com/scheme/route?ep=${DEST.lat},${DEST.lng}&en=${encodeURIComponent(DEST.name)}`;
    const tmapMobileURL = `tmap://route?goalname=${encodeURIComponent(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`;

    useEffect(() => {
        const ua = typeof navigator === "undefined" ? "" : navigator.userAgent.toLowerCase();
        const mobile = /android|iphone|ipad|ipod|windows phone|blackberry|mobi|phone/.test(ua);
        setIsMobile(mobile);
    }, []);

    const initMap = useCallback(() => {
        let map = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(37.5682885, 126.8972730), zoom: 16, minZoom: 14, zoomControl: true, zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        });

        let marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(37.5684500, 126.896400), map: map
        });
    }, []);

    const handleNaverClick = (e) => {
        e.preventDefault();
        if (isMobile) {
            openAppWithFallback(naverMobileURL, "naver");
        } else {
            window.open(naverWebURL, "_blank");
        }
    };

    const handleKakaoClick = (e) => {
        e.preventDefault();
        if (isMobile) {
            openAppWithFallback(kakaoMobileURL, "kakao");
        } else {
            window.open(kakaoWebURL, "_blank");
        }
    };

    const handleTmapClick = (e) => {
        e.preventDefault();
        if (isMobile) {
            openAppWithFallback(tmapMobileURL, "tmap");
        }
    };

    return <>
        <Script type="text/javascript" strategy="afterInteractive" onReady={initMap} src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=0hk8z6jh50"/>
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
        <div style={{width: '75%'}}>
            <div className={styles.infoTitle}>지하철</div>
            <div className={styles.info}>6호선 [월드컵경기장]역 2번 출구</div>
            <div className={styles.infoTitle}>버스</div>
            <div className={styles.info}>[월드컵경기장 서측.문화비축기지]정류장</div>
            <div className={styles.info}>파란 버스 571, 710, 760</div>
            <div className={styles.info}>녹색 버스 7019, 7715, 8777</div>
            <div className={styles.info}>빨간 버스 9711</div>
            <div className={styles.infoTitle}>자가용</div>
            <div className={styles.info}>네비게이션에 [월드컵컨벤션] 검색</div>
            <div className={styles.info}>서측 1, 2 주차장 이용해 주세요.</div>
            <div className={styles.info}>홈플러스는 무료 주차 불가합니다.</div>
            <div className={styles.info}>주차 접수대 등록하시면 90분 무료입니다.</div>
        </div>
    </>;
}
