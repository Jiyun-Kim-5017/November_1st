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

    const shareKakao = () => {
        if (window.Kakao) {
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '지윤',
                    description: '11월 1일, 저희의 결혼식에 초대합니다.',
                    imageUrl: '/4BE00381.jpg',
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

    return (<footer className="">
        <button
            onClick={shareKakao}
            className=""
        >
            카카오톡 공유하기
        </button>

    </footer>)
}
