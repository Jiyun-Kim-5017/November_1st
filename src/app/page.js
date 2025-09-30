import Footer from "@/app/components/Footer";
import Calendar from "@/app/components/Calendar";
import IntroOverlay from "@/app/components/IntroOverlay";
import ScrollLock from "@/util/ScrollLock";
import HeartCursorEffect from "@/app/components/HeartCursorEffect";
import Message from "@/app/components/Message";
import Loca from "@/app/components/Loca";
import Gallery from "@/app/components/Gallery";
import Invitation from "@/app/components/Invitation";
import Account from "@/app/components/Account";
import Contact from "@/app/components/Contact";
import FlowerImg from "@/app/components/FlowerImg";
import styles from "@/css/Page.module.css";

export default function Page() {
    return (<>
        <HeartCursorEffect/>
        <ScrollLock duration={800}/>

        <main className={styles.main}>
            <FlowerImg num={1}/>

            <div className={styles.date}>2025. 11. 01</div>
            <div>SATURDAY</div>
            <IntroOverlay/>
            <div className={styles.name}>
                이현준 | 김지윤
                <FlowerImg num={2}/>
            </div>
            <div style={{background: "top center / cover no-repeat url('/background.jpg')"}}>
                <Invitation/>

                <div className={`${styles.calSection} ${styles.section}`}>
                    <div className={`${styles.title} ${styles.cal}`}>WEDDING DAY</div>
                    <div>2025년 11월 1일 토요일 | 오후 1시 50분</div>
                    <Calendar/>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>GALLERY</div>
                <div className={styles.subTitle}>갤러리</div>
                <div className={styles.gal} style={{background: "center / cover no-repeat url('/card3.png')"}}>
                    <Gallery/>
                    <p>사진을 클릭하면 크게 보실 수 있습니다.</p>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>LOCATION</div>
                <div className={styles.subTitle}>오시는 길</div>
                <div style={{fontSize: 17}}>서울 마포구 월드컵로 240 2층</div>
                <div style={{color: '#aaa', marginBottom: 5, fontSize: 15}}>(월드컵경기장 서측)</div>
                <div style={{marginBottom: 5, fontSize: 17}}>월드컵컨벤션 임페리얼블룸</div>
                <Loca/>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>CONTACT</div>
                <div className={styles.subTitle}>연락처</div>
                <Contact/>
            </div>

            <div className={styles.section}>
                <div className={styles.subTitle}>마음 전하실 곳</div>
                <Account/>
            </div>

            <div className={styles.section}>
                <div className={styles.title}>MESSAGE</div>
                <div className={styles.subTitle}>축하 메세지</div>
                <Message/>
            </div>
            <Footer/>
        </main>
    </>);
}
