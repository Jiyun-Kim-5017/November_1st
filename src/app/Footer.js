"use client"
import {useEffect} from "react";

export default function Footer() {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const {Kakao} = window;

            if (!Kakao.isInitialized()) {
                Kakao.init('9426ccf8915681c7bf6bf1153f2b218b');
            }
        }
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };
    const shareKakao = () => {
        if (window.Kakao) {
            // 여기에 카카오톡 개발자 사이트에서 만든 템플릿 코드를 그대로 붙여넣으세요
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '현준,지윤',
                    imageUrl: 'https://november-1st.vercel.app/setFull_1372_1.png',
                    link: {
                        mobileWebUrl: 'https://november-1st.vercel.app',
                        webUrl: 'https://november-1st.vercel.app'
                    }},

            });
        }
    };

    return (<footer className="w-full h-[40px] bg-red-200">
        <button
            onClick={shareKakao}
            className="fixed bottom-20 right-4 z-50 bg-yellow-300 rounded-full p-4 shadow-lg"
        >
            카카오톡 공유하기
        </button>

    </footer>)
}
