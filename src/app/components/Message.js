"use client";
import {useEffect, useRef, useState} from "react";

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [newModal, setNewModal] = useState(false);
    const [delModal, setDelModal] = useState({
        show: false,
        messageId: null
    });
    const [modalPassword, setModalPassword] = useState("");
    const isFirstRender = useRef(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (newModal || delModal.show) {
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
        if (!name || !password || !message) return alert("모든 항목을 입력해주세요.");

        const res = await fetch("/api/write", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name,
                password,
                message
            }),
        });

        if (res.ok) {
            setName("");
            setPassword("");
            setMessage("");
            setNewModal(false);
            fetchMessages();
        } else {
            alert("작성 실패");
        }
    }

    function openNewModal() {
        setNewModal(true);
    }

    function openModal(messageId) {
        setDelModal({
            show: true,
            messageId
        });
        setModalPassword("");
    }

    function closeModal() {
        setDelModal({
            show: false,
            messageId: null
        });
        setModalPassword("");
    }

    async function handlePasswordSubmit() {
        if (!modalPassword) return alert("비밀번호를 입력해주세요.");

        const res = await fetch("/api/delete", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: delModal.messageId,
                password: modalPassword
            }),
        });

        if (res.ok) {
            fetchMessages();
            closeModal();
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    }

    return (<div style={{padding: 20}}>

        <div style={{height: '300px', overflowY: 'scroll'}}>
            {messages.map(msg => (<div key={msg.id} style={{marginTop: 20}}>
                <strong>{msg.name}</strong>: {msg.message}
                <button onClick={() => openModal(msg.id)}>삭제</button>
            </div>))}
        </div>
        <button onClick={openNewModal}>메세지 남기기</button>

        {newModal && (<div className="modal-overlay" style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            alignItems: "center",
            zIndex: 100
        }}>
            <div className="modal-content" style={{
                boxSizing: "border-box",
                width: "250px",
                height: "160px",
                padding: "20px",
                borderRadius: "10px",
                background: "white"
            }}>
                <h3>메시지 작성</h3>

                <form onSubmit={handleSubmit}>
                    <input placeholder="이름" value={name} onChange={e => setName(e.target.value)}/><br/>
                    <input placeholder="비밀번호" type="password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
                    <textarea placeholder="메시지" value={message} onChange={e => setMessage(e.target.value)}/><br/>
                    <button type="submit">작성</button>
                </form>
            </div>
        </div>)}

        {delModal.show && (<div className="modal-overlay" style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            alignItems: "center",
            zIndex: 100
        }}>
            <div className="modal-content" style={{
                boxSizing: "border-box",
                width: "250px",
                height: "160px",
                padding: "20px",
                borderRadius: "10px",
                background: "white"
            }}>
                <h3>메시지 삭제</h3>

                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={modalPassword}
                    onChange={e => setModalPassword(e.target.value)}
                /><br/>

                <div>
                    <button onClick={handlePasswordSubmit}>삭제</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </div>)}
    </div>);
}
