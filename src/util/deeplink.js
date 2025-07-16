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
