"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import styles from "@/css/Message.module.css";
import heart from "@/../public/4.png";
import close from "@/../public/x.png";
import loading from "@/../public/loading.gif";

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [newModal, setNewModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [delID, setDelID] = useState(null);
    const [delPassword, setDelPassword] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        document.body.classList.toggle("scrollable", !(newModal || delModal));
    }, [newModal, delModal]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    async function fetchMessages() {
        const res = await fetch("api/list");
        setIsLoading(true);
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
            setIsLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (Object.values(data).some(v => !v)) {
            return alert("모든 항목을 입력해 주세요.");
        }

        const url = editMode ? "/api/update" : "/api/write";
        const body = editMode ? {...data, id: editingMessage.id} : data;

        const res = await fetch(url, {
            method: editMode ? "PUT" : "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
        });

        if (res.ok) {
            fetchMessages();
            closeModal();
        } else if (res.status === 401) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            alert(`메세지 ${editMode ? '수정' : '등록'}에 실패했습니다.`);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        if (!delPassword) return alert("비밀번호를 입력해 주세요.");

        const res = await fetch("/api/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: delID, password: delPassword}),
        });

        if (res.status === 200) {
            fetchMessages();
            closeModal();
        } else if (res.status === 401) {
            alert("비밀번호가 틀렸습니다.");
        } else {
            alert("메세지를 삭제하지 못했습니다. 신부에게 문의해 주세요.");
        }
    }

    const openEditModal = (msg) => {
        setEditMode(true);
        setEditingMessage(msg);
        setNewModal(true);
    };

    const closeModal = () => {
        setNewModal(false);
        setDelModal(false);
        setDelPassword("");
        setEditMode(false);
        setEditingMessage(null);
    };

    return (
        <>
            <div className={styles.messageList}>
                {isLoading && <Image className={styles.loading} src={loading} alt="loading" width={40} height={40}/>}
                {messages.map(msg => (
                    <div key={msg.id} className={styles.message}>
                        <div className={styles.messageTitle}>
                            <Image src={heart} width={20} height={20} alt="heart"/>
                            <div>{msg.name}</div>
                            <Image
                                src={close}
                                alt="delete"
                                onClick={() => {
                                    setDelModal(true);
                                    setDelID(msg.id);
                                }}
                                width={14}
                                height={14}
                            />
                        </div>
                        <div className={styles.messageContent}>{msg.message}</div>
                        <div>
                            <button onClick={() => openEditModal(msg)}>수정</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.openButton} onClick={() => setNewModal(true)}>
                메세지 남기기
            </button>

            {(newModal || delModal) && (
                <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                    {newModal && (
                        <div className={styles.modalContent}>
                            <div className={styles.modlTitle}>
                                <div>{editMode ? '메세지 수정' : '축하 메시지 작성'}</div>
                                <div onClick={closeModal}>
                                    <Image src={close} alt="close" width={14} height={14}/>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.modalInput}>
                                    <div>이름</div>
                                    <input
                                        name="name"
                                        autoComplete="off"
                                        defaultValue={editMode ? editingMessage?.name : ""}
                                    />
                                </div>
                                <div className={styles.modalInput}>
                                    <div>비밀번호</div>
                                    <input name="password" type="password" autoComplete="off"/>
                                </div>
                                <div className={styles.modalInput}>
                                    <div>축하 메세지</div>
                                    <textarea
                                        className={styles.textArea}
                                        name="message"
                                        autoComplete="off"
                                        defaultValue={editMode ? editingMessage?.message : ""}
                                    />
                                </div>
                                <button className={styles.modalBtn} type="submit">{editMode ? '수정' : '등록'}</button>
                            </form>
                        </div>
                    )}
                    {delModal && (
                        <div className={styles.modalContent}>
                            <div className={styles.modlTitle}>
                                <div>메세지 삭제</div>
                                <div onClick={closeModal}>
                                    <Image src={close} alt="close" width={14} height={14}/>
                                </div>
                            </div>
                            <form onSubmit={handleDelete}>
                                <div className={styles.modalInput}>
                                    <div>비밀번호</div>
                                    <input
                                        value={delPassword}
                                        onChange={e => setDelPassword(e.target.value)}
                                        type="password"
                                        autoComplete="off"
                                    />
                                </div>
                                <button className={styles.modalBtn} type="submit">삭제</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}