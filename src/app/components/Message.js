"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import styles from "@/css/Message.module.css";
import heart from "@/../public/4.png";
import close from "@/../public/x.png";

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [newModal, setNewModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [delID, setDelID] = useState(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (newModal || delModal) {
            document.body.classList.remove('scrollable');
        } else {
            document.body.classList.add('scrollable');
        }
    }, [newModal, delModal]);

    async function fetchMessages() {
        const res = await fetch("api/list");
        const data = await res.json();
        if (res.ok) setMessages(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {};
        for (const [key, value] of formData.entries()) {
            if (!value) return alert("모든 항목을 입력해 주세요.")
            data[key] = value;
        }

        const res = await fetch("/api/write", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(data)
        });

        if (res.ok) {
            fetchMessages();
            setNewModal(false);
        } else {
            alert("메세지 등록에 실패했습니다.");
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        const password = document.getElementById("delPassword").value;
        if (!password) return alert("비밀번호를 입력해 주세요.");

        const res = await fetch("/api/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: delID,
                password: password,
            }),
        });

        if (res.status === 200) {
            fetchMessages();
            setDelModal(false);
        } else if (res.status === 401) {
            alert("비밀번호가 틀렸습니다.");
        } else {
            alert("메세지를 삭제하지 못했습니다. 신부에게 문의해 주세요.")
        }
    }

    return (<>
        <div className={styles.messageList}>
            {messages.map(msg => (<div key={msg.id} className={styles.message}>
                <div className={styles.messageTitle}>
                    <Image src={heart} width={20} height={20} alt="heart"/>
                    <div>{msg.name}</div>
                    <Image src={close} alt="delete" onClick={() => {setDelModal(true);setDelID(msg.id);}} width={14} height={14}/>
                </div>
                <div className={styles.messageContent}>{msg.message}</div>
            </div>))}
        </div>
        <button className={styles.openButton} onClick={() => {setNewModal(true)}}>메세지 남기기</button>

        {(newModal || delModal) && <div className={styles.modalOverlay}>
            {newModal && <div className={styles.modalContent}>
                <div className={styles.modlTitle}>
                    <div>축하 메시지 작성</div>
                    <div id="closeModal" onClick={() => {setNewModal(false)}}>
                        <Image src={close} alt="close" width={14} height={14}/>
                    </div>
                </div>
                <form id="messageForm" onSubmit={handleSubmit}>
                    <div className={styles.modalInput}>
                        <div>이름</div>
                        <input name="name" autoComplete="off"/>
                    </div>
                    <div className={styles.modalInput}>
                        <div>비밀번호</div>
                        <input name="password" type="password" autoComplete="off"/>
                    </div>
                    <div className={styles.modalInput}>
                        <div>축하 메세지</div>
                        <textarea className={styles.textArea} name="message" autoComplete="off"/>
                    </div>
                    <button className={styles.modalBtn} type="submit">등록</button>
                </form>
            </div>}
            {delModal && <div className={styles.modalContent}>
                <div className={styles.modlTitle}>
                    <div>메세지 삭제</div>
                    <div id="closeModal" onClick={() => {setDelModal(false)}}>
                        <Image src={close} alt="close" width={14} height={14}/>
                    </div>
                </div>
                <form id="delForm" onSubmit={handleDelete}>
                    <div className={styles.modalInput}>
                        <div>비밀번호</div>
                        <input id="delPassword" name="password" type="password" autoComplete="off"/>
                    </div>
                    <button className={styles.modalBtn} type="submit">삭제</button>
                </form>
            </div>}
        </div>}
    </>);
}
