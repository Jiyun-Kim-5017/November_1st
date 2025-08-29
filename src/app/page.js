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
import Image from "next/image";
import Contact from "@/app/components/Contact";

export default function Page() {
    return (<>
        <HeartCursorEffect/>
        {/*<ScrollLock duration={2000}/>*/}

        <main className="" style={{
            display: "flex", flexDirection: "column"
        }}>

            <Image src="/main_img_icon1.png" alt="logo" width={150} height={100} style={{position: "absolute", right: 0, top: 10, zIndex: -1}}/>

            <div style={{textAlign: "center", marginTop: "50px", fontSize: "26px", fontFamily: "Gowun Batang", letterSpacing: 1, textShadow: '0 0 5px #e1a1a1'}}>2025. 11. 01</div>
            <div style={{textAlign: "center", fontFamily: "Gowun Batang"}}>SATURDAY</div>
            <IntroOverlay/>
            <div style={{textAlign: "center", marginBottom: "30px", fontSize: "20px", fontFamily: "Gowun Batang", letterSpacing: 3}}>
                이현준 | 김지윤
                <Image src="/main_img_icon2.png" alt="logo" width={120} height={96} style={{position: "absolute", left: 0}}/>
            </div>
            <div className="section" style={{background: "top center / cover no-repeat url('/background.jpg')"}}>
                <Invitation/>

                <div className="" style={{
                    padding: "0 1rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)", color: "white"
                }}>
                    <div className="title cal">WEDDING DAY</div>
                    <div>2025년 11월 1일 토요일 | 오후 1시 50분</div>
                    <Calendar/>
                </div>
            </div>

            <div className="" style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <div className="title">GALLERY</div>
                <div className="miniTitle">갤러리</div>
                <div style={{
                    width: "100%", paddingTop: '1rem', paddingBottom: '1rem', background: "center / cover no-repeat url('/card3.png')",
                }}>
                    <Gallery/>
                </div>
            </div>

            <div className="" style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <div className="title">LOCATION</div>
                <div className="miniTitle">오시는 길</div>
                <div>서울 마포구 월드컵로 240 2층</div>
                <div style={{color: '#aaa', marginBottom: 5}}>(월드컵경기장 서측)</div>
                <div style={{marginBottom: 5}}>월드컵컨벤션 임페리얼블룸</div>
                <Loca/>
            </div>

            <div className="" style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <div className="title">CONTACT</div>
                <div className="miniTitle">연락처</div>
                <Contact/>
            </div>

            <div className="" style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <div className="miniTitle">마음 전하실 곳</div>
                <Account/>
            </div>

            <div className="" style={{
                display: "flex", flexDirection: "column", alignItems: "center"
            }}>
                <div className="title">MESSAGE</div>
                <Message/>
            </div>
            <Footer/>
        </main>
    </>);
}
