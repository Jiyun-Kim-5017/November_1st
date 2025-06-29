import Footer from "@/app/Footer";
import Calendar from "@/app/Calendar";
import IntroOverlay from "@/app/IntroOverlay";
import ScrollLock from "@/app/ScrollLock";
import HeartCursorEffect from "@/app/HeartCursorEffect";

export default function Home() {
    const images = ["/opening.jpg", "/opening_pic.jpg"];

    return (<>
        <HeartCursorEffect/>
        <ScrollLock duration={2000}/>

        <div className="">
            <main className="" style={{
                display: "flex",
                flexDirection: "column",

            }}>
                <IntroOverlay images={images}/>
                <div style={{background: "center / cover url('/card2.png')"}}>
                    <div
                        className="section" style={{
                        padding: '2rem',
                        textAlign: 'center',
                        wordBreak: 'keep-all',

                    }}>
                        <p><span style={{
                            color: '#f0a1bf',
                            fontWeight: 'bold'
                        }}>봄</span>처럼 포근하고</p>
                        <p><span style={{
                            color: '#4ab34a',
                            fontWeight: 'bold'
                        }}>여름</span>처럼 뜨겁고</p>
                        <p><span style={{
                            color: '#d68231',
                            fontWeight: 'bold'
                        }}>가을</span>처럼 충만하고</p>
                        <p><span style={{
                            color: '#68a4d9',
                            fontWeight: 'bold'
                        }}>겨울</span>처럼 설레는</p>
                        <p>사람을 만났습니다.</p>
                        <br/>
                        <p>이제 서로의 <b>모든 계절</b>을 함께하려 합니다.</p>
                        <p>가장 빛날 오늘,</p>
                        <p>늘 곁에서 아껴준 고마운 분들을 초대합니다.</p>
                    </div>

                    <div className="">
                        <div style={{
                            marginBottom: '0.5rem',
                            fontFamily: 'Fuzzy Bubbles',
                            fontSize: 30,
                            color: 'rgb(50,50,50)',
                            textAlign: 'center'
                        }}>Gallery
                        </div>
                        <div style={{ width: '100vw', aspectRatio: 0.666, background: 'black'}}></div>
                    </div>

                    <div className="" style={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            marginBottom: '0.5rem',
                            fontFamily: 'Fuzzy Bubbles',
                            fontSize: 30,
                            color: 'rgb(50,50,50)',
                            textAlign: 'center'
                        }}>Wedding Day
                        </div>
                        <Calendar/>
                    </div>

                    <div className="">
                        위치(지도), 앱 연결, 오시는 방법
                    </div>

                    <div className="">
                        연락처
                    </div>

                    <div className="">
                        메세지
                    </div>
                </div>
            </main>
        </div>
        <Footer/>
    </>);
}
