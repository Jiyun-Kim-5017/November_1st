"use client";

import Image from "next/image";
import styles from '@/css/Contact.module.css'
import call from '@/../public/phone.png';
import massage from '@/../public/email.png';

export default function Contact() {
    return <div className={styles.contact}>
        <div className={styles.listCover}>
            <div className={styles.list}>
                <div><small>신랑</small> 이현준</div>
                <div className={styles.button}>
                    <a href="tel:010-5109-2405">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-5109-2405">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
            <div className={styles.list}>
                <div><small>신랑 아버지</small> 이진구</div>
                <div className={styles.button}>
                    <a href="tel:010-5257-2404">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-5257-2404">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
            <div className={styles.list}>
                <div><small>신랑 어머니</small> 김정자</div>
                <div className={styles.button}>
                    <a href="tel:010-2230-2402">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-2230-2402">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
        </div>
        <div className={styles.listCover}>
            <div className={styles.list}>
                <div><small>신부</small> 김지윤</div>
                <div className={styles.button}>
                    <a href="tel:010-5131-1014">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-5131-1014">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
            <div className={styles.list}>
                <div><small>신부 아버지</small> 김용회</div>
                <div className={styles.button}>
                    <a href="tel:010-6345-8582">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-6345-8582">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
            <div className={styles.list}>
                <div><small>신부 어머니</small> 홍은경</div>
                <div className={styles.button}>
                    <a href="tel:010-2943-9796">
                        <Image src={call} alt="call" width={24} height={24}/>
                    </a>
                    <a href="sms:010-2943-9796">
                        <Image src={massage} alt="call" width={24} height={24}/>
                    </a>
                </div>
            </div>
        </div>
    </div>

}
