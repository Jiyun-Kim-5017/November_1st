"use client"
import {useEffect} from "react";
import styles from "@/css/Footer.module.css";
import Image from "next/image";
import kakao from '@/../public/kakao.png';

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
                    title: '현준❤️지윤',
                    description: '11월 1일, 저희의 결혼식에 초대합니다.',
                    imageUrl: 'https://november-1st.vercel.app/gallery/cover.jpg',
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

    return (<footer className={styles.footer}>
        <Image src={kakao} alt="kakaoTalk" width={24} height={24}/>
        <span onClick={shareKakao}>카카오톡 공유하기</span>
    </footer>)
}
