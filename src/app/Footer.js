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
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '지윤',
                    description: '11월 1일, 저희의 결혼식에 초대합니다.',
                    imageUrl: 'https://november-1st.vercel.app/4.png',
                    link: {
                        mobileWebUrl: 'https://november-1st.vercel.app',
                        webUrl: 'https://november-1st.vercel.app'
                    }
                },
                buttons: [{
                    title: '청첩장 열기',
                    link: {
                        mobileWebUrl: 'https://november-1st.vercel.app',
                        webUrl: 'https://november-1st.vercel.app'
                    }
                }]
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
