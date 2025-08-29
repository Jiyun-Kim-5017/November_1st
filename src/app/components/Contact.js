"use client";

import styles from '@/css/Contact.module.css'
import call from '@/../public/phone.png';
import massage from '@/../public/email.png';
import Image from "next/image";

export default function Contact() {
    return <div className={styles.contact}>
        <div className={styles.list}>
            <div>신랑 이현준</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
        <div className={styles.list}>
            <div>신랑 아버지 이진구</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
        <div className={styles.list}>
            <div>신랑 어머니 김정자</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
        <div className={styles.list}>
            <div>신부 김지윤</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
        <div className={styles.list}>
            <div>신부 아버지 김용회</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
        <div className={styles.list}>
            <div>신부 어머니 홍은경</div>
            <div className={styles.button}>
                <Image src={call} alt="call" width={22} height={22}/>
                <Image src={massage} alt="call" width={22} height={22}/>
            </div>
        </div>
    </div>
}
