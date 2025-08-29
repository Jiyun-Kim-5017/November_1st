"use client";

const APP_STORES = {
    naver: {
        ios: "https://apps.apple.com/kr/app/naver-map-navigation/id311867728",
        android: "https://play.google.com/store/apps/details?id=com.nhn.android.nmap"
    },
    kakao: {
        ios: "https://apps.apple.com/kr/app/kakaomap-korea-no-1-map/id304608425",
        android: "https://play.google.com/store/apps/details?id=net.daum.android.map"
    },
    tmap: {
        ios: "https://apps.apple.com/kr/app/t-map/id431589174",
        android: "https://play.google.com/store/apps/details?id=com.skt.tmap.ku"
    }
};

// URL 생성 함수들
export const createNaverURLs = (destination) => ({
    mobile: `nmap://route/public?dlat=${destination.lat}&dlng=${destination.lng}&dname=${encodeURIComponent(destination.name)}`,
    web: `https://map.naver.com/p/directions/-/14126029.9633415,4518658.3911646,,1902387925,PLACE_POI/-/transit?c=15.00,0,0,0,dh`
});

export const createKakaoURLs = (destination) => ({
    mobile: `kakaomap://route?ep=${destination.lat},${destination.lng}&by=PUBLICTRANSIT&en=${encodeURIComponent(destination.name)}`,
    web: `https://m.map.kakao.com/scheme/route?ep=${destination.lat},${destination.lng}&en=${encodeURIComponent(destination.name)}`
});

export const createTmapURL = (destination) => 
    `tmap://route?goalname=${encodeURIComponent(destination.name)}&goalx=${destination.lng}&goaly=${destination.lat}`;

// 네이버 지도 API URL
export const NAVER_MAP_API_URL = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=0hk8z6jh50";

export const detectDevice = () => {
    if (typeof navigator === "undefined") return "desktop";

    const ua = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|windows phone|blackberry|mobi|phone/.test(ua);

    if (!isMobile) return "desktop";

    if (/iphone|ipad|ipod/.test(ua)) return "ios";
    if (/android/.test(ua)) return "android";

    return "mobile";
};

export const openAppWithFallback = (appSchemeUrl, appType) => {
    const device = detectDevice();

    if (device === "desktop") {
        window.open(appSchemeUrl, '_blank');
        return;
    }

    const startTime = Date.now();

    window.location.href = appSchemeUrl;

    setTimeout(() => {
        if (Date.now() - startTime < 1500) {
            const storeUrl = APP_STORES[appType]?.[device];
            if (storeUrl) {
                window.location.href = storeUrl;
            }
        }
    }, 1000);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
};

// 통합 핸들러 함수들
export const handleNaverNavigation = (destination, isMobile) => {
    const urls = createNaverURLs(destination);
    if (isMobile) {
        openAppWithFallback(urls.mobile, "naver");
    } else {
        window.open(urls.web, "_blank");
    }
};

export const handleKakaoNavigation = (destination, isMobile) => {
    const urls = createKakaoURLs(destination);
    if (isMobile) {
        openAppWithFallback(urls.mobile, "kakao");
    } else {
        window.open(urls.web, "_blank");
    }
};

export const handleTmapNavigation = (destination, isMobile) => {
    if (isMobile) {
        const url = createTmapURL(destination);
        openAppWithFallback(url, "tmap");
    }
};