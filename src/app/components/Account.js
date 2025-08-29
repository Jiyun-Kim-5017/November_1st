"use client";

import {useState} from "react";
import styles from "@/css/Account.module.css";

export default function Account() {
    const [openGroom, setOpenGroom] = useState(false);
    const [openBride, setOpenBride] = useState(false);

    return (<div className={styles.account}>
        <div style={{textAlign: "center", color: "#68a4d9", marginBottom: 10}}>참석이 어려우신 분들을 위해 기재하였습니다.<br/>너그러운 마음으로 양해 부탁드립니다.</div>
        <div className={styles.openButton} onClick={() => setOpenGroom(!openGroom)} style={{marginBottom: openGroom ? 0 : 10}}>신랑측</div>
        {openGroom && <div className={styles.openList}>
            <div>신랑 아버지</div>
            <div>신랑 어머니</div>
            <div>신랑</div>
        </div>}
        <div className={styles.openButton} onClick={() => setOpenBride(!openBride)}>신부측</div>
        {openBride && <div className={styles.openList}>
            <div>신부 아버지</div>
            <div>신부 어머니</div>
            <div>신부</div>
        </div>}
    </div>);
}
