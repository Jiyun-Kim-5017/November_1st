"use client";

import {useEffect, useState} from "react";
import {openAppWithFallback} from "@/util/deeplink";

export default function Loca() {
    const [isMobile, setIsMobile] = useState(false);

    const DEST = {
        lat: 37.5684500,
        lng: 126.896400,
        name: "월드컵컨벤션",
    };

    // 기존 URL들
    const naverMobileURL = `nmap://route/public?dlat=${DEST.lat}&dlng=${DEST.lng}&dname=${encodeURIComponent(DEST.name)}`;
    const naverWebURL = `https://map.naver.com/p/directions/-/14126029.9633415,4518658.3911646,,1902387925,PLACE_POI/-/transit?c=15.00,0,0,0,dh`;
    const kakaoMobileURL = `kakaomap://route?ep=${DEST.lat},${DEST.lng}&by=PUBLICTRANSIT&en=${encodeURIComponent(DEST.name)}`;
    const kakaoWebURL = `https://m.map.kakao.com/scheme/route?ep=${DEST.lat},${DEST.lng}&en=${encodeURIComponent(DEST.name)}`;
    const tmapMobileURL = `tmap://route?goalname=${encodeURIComponent(DEST.name)}&goalx=${DEST.lng}&goaly=${DEST.lat}`;

    useEffect(() => {
        const ua = typeof navigator === "undefined" ? "" : navigator.userAgent.toLowerCase();
        const mobile = /android|iphone|ipad|ipod|windows phone|blackberry|mobi|phone/.test(ua);
        setIsMobile(mobile);

        // 네이버 지도 초기화
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

    // 앱 실행 핸들러들
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

    return (<>
            <div id="map" style={{
                width: "80%",
                position: "relative",
                overflow: "hidden",
                background: "rgb(248, 249, 250)",
                aspectRatio: 1.2,
            }}></div>

            <a href="#" onClick={handleNaverClick}>Naver 길찾기</a>
            <a href="#" onClick={handleKakaoClick}>KaKao 길찾기</a>
            {isMobile && <a href="#" onClick={handleTmapClick}>Tmap 길찾기</a>}
        </>);
}
