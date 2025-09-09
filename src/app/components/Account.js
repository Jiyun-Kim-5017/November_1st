"use client";

import {useState} from "react";
import Image from "next/image";
import styles from "@/css/Account.module.css";
import open from "@/../public/open.png";
import close from "@/../public/close.png";
import copy from "@/../public/copy.png";

export default function Account() {
    const [openGroom, setOpenGroom] = useState(false);
    const [openBride, setOpenBride] = useState(false);

    const handleCopy = async (text) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return;
            }

            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.body.removeChild(textarea);
        } catch (err) {
            console.error("복사 실패:", err);
        }
    };

    return (<>
        <div className={styles.guide}>참석이 어려우신 분들을 위해 기재하였습니다.<br/>너그러운 마음으로 양해 부탁드립니다.</div>
        <div className={styles.openButton}>신랑측
            {openGroom ? <Image className={styles.openImg} src={close} alt="close" width={16} height={16}
                                onClick={() => setOpenGroom(!openGroom)}/> :
                <Image className={styles.openImg} src={open} alt="open" width={16} height={16}
                       onClick={() => setOpenGroom(!openGroom)}/>}
            {openGroom && <div className={styles.openList}>
                <div className={styles.listItem}>
                    <div>
                        <div>이진구</div>
                        <div>우체국 102608-02-186201</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("우체국 10260802186201")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>
                <div className={styles.listItem}>
                    <div>
                        <div>김정자</div>
                        <div>기업 258-100825-01-018</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("기업 25810082501018")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>
                <div className={styles.listItem}>
                    <div>
                        <div>이현준</div>
                        <div>기업 220-069658-01-011</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("기업 22006965801011")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>
            </div>}
        </div>

        <div className={styles.openButton}>신부측
            {openBride ? <Image className={styles.openImg} src={close} alt="close" width={16} height={16}
                                onClick={() => setOpenBride(!openBride)}/> :
                <Image className={styles.openImg} src={open} alt="open" width={16} height={16}
                       onClick={() => setOpenBride(!openBride)}/>}
            {openBride && <div className={styles.openList}>
                <div className={styles.listItem}>
                    <div>
                        <div>김용회</div>
                        <div>sc제일 403-20-486623</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("sc제일 40320486623")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>

                <div className={styles.listItem}>
                    <div>
                        <div>홍은경</div>
                        <div>우리 1002-251-593587</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("우리 1002251593587")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>

                <div className={styles.listItem}>
                    <div>
                        <div>김지윤</div>
                        <div>기업 600-055679-01-019</div>
                    </div>
                    <div className={styles.copyBtn} onClick={() => handleCopy("기업 60005567901019")}>
                        <Image src={copy} alt="copy" width={14} height={14}/>
                        복사
                    </div>
                </div>
            </div>}
        </div>
    </>);
}
