"use client"

import styles from '@/css/Invitation.module.css'

export default function Invitation() {
    return (<div className={styles.invitation}>
        <p><span className={styles.spring}>봄</span>처럼 포근하고</p>
        <p><span className={styles.summer}>여름</span>처럼 뜨겁고</p>
        <p><span className={styles.autumn}>가을</span>처럼 충만하고</p>
        <p><span className={styles.winter}>겨울</span>처럼 설레는</p>
        <p>사람을 만났습니다.</p>
        <br/>
        <p>이제 서로의 <b>모든 계절</b>을 함께하려 합니다.</p>
        <p>가장 빛날 오늘,</p>
        <p>늘 곁에서 아껴준 고마운 분들을 초대합니다.</p>
        <p className={`${styles.host} ${styles.firstHost}`}><b>이진구 | 김정자</b>의 장남 <b>현준</b></p>
        <p className={styles.host}><b>김용회 | 홍은경</b>의 장녀 <b>지윤</b></p>
    </div>)
}
