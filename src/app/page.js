import Image from "next/image";
import Footer from "@/app/Footer";

export default function Home() {



    return (<>
        <div
            className="justify-items-center p-[30px] pb-20">
            <main className="flex flex-col gap-[32px] w-full sm:w-1/3">
                <Image
                    className="dark:invert w-full"
                    src="/setFull_1372_1.png"
                    alt="대문이미지"
                    width={500}
                    height={500}
                    priority
                />
                <Image
                    className="dark:invert w-full"
                    src="/setFull_1372_1.png"
                    alt="대문이미지"
                    width={500}
                    height={500}
                    priority
                />


                <div className="h-[400px] w-full bg-[#000000] text-white">
                    인사문구
                </div>

                <div className="h-[400px] w-full bg-[#000000] text-white">
                    갤러리
                </div>

                <div className="h-[400px] w-full bg-[#000000] text-white">
                    날짜, 달력, 결혼식이 며칠 남았습니다
                </div>

                <div className="h-[800px] w-full bg-[#000000] text-white">
                    위치(지도), 앱 연결, 오시는 방법
                </div>

                <div className="h-[400px] w-full bg-[#000000] text-white">
                    마음 전하실 곳
                </div>

                <div className="h-[500px] w-full bg-[#000000] text-white">
                    축하메세지
                </div>
            </main>
        </div>
        <Footer/>
    </>);
}
