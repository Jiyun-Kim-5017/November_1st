import Footer from "@/app/components/Footer";
import Calendar from "@/app/components/Calendar";
import IntroOverlay from "@/app/components/IntroOverlay";
import ScrollLock from "@/app/ScrollLock";
import HeartCursorEffect from "@/app/components/HeartCursorEffect";
import Message from "@/app/components/Message";
import Loca from "@/app/components/Loca";
import Gallery from "@/app/components/Gallery";
import Contact from "@/app/components/Contact";
import Invitation from "@/app/components/Invitation";

export default function Home() {
    return (<>
        <HeartCursorEffect/>
        <ScrollLock duration={2000}/>

        <main className="" style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            background: "top center / contain repeat-y url('/card4.jpg')",
        }}>
            <IntroOverlay/>
            <Invitation/>

            <div className="" style={{
                padding: "2rem 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <h1>Wedding Day</h1>
                <div>2025년 11월 1일 토요일 | 오후 1시 50분</div>
                <Calendar/>
            </div>

            <div className="" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1>Gallery</h1>
                <div style={{
                    width: "100%",
                    height: "500px",
                    background: "rgba(0,0,0,0.1)",
                }}>
                    <Gallery/>
                </div>
            </div>

            <div className="" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1>Lacation</h1>
                <div>서울 마포구 월드컵로 240 2층 (월드컵경기장 서측)</div>
                <div>월드컵컨벤션 임페리얼블룸</div>
                <Loca/>
            </div>

            <div className="" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1>Contact</h1>
                <Contact/>
            </div>

            <div className="" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h1>Message</h1>
                <Message/>
            </div>
        <Footer/>
        </main>
    </>);
}
