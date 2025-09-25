"use client";

import Image from "next/image";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import styles from "@/css/Message.module.css";
import heart from "@/../public/4.png";
import close from "@/../public/x.png";

const messagesAPI = {
    getMessages: async () => {
        const res = await fetch("/api/list");
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
    },

    createMessage: async (data) => {
        const res = await fetch("/api/write", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            if (res.status === 401) throw new Error("PASSWORD_MISMATCH");
            throw new Error("CREATE_FAILED");
        }
        return res.json();
    },

    updateMessage: async (data) => {
        const res = await fetch("/api/update", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            if (res.status === 401) throw new Error("PASSWORD_MISMATCH");
            throw new Error("UPDATE_FAILED");
        }
        return res.json();
    },

    deleteMessage: async ({id, password}) => {
        const res = await fetch("/api/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, password}),
        });
        if (!res.ok) {
            if (res.status === 401) throw new Error("PASSWORD_MISMATCH");
            throw new Error("DELETE_FAILED");
        }
        return res.json();
    },
};

export default function Message() {
    const [newModal, setNewModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [delID, setDelID] = useState(null);
    const [delPassword, setDelPassword] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);

    const queryClient = useQueryClient();

    const {
        data: messages = [],
        error,
    } = useQuery({
        queryKey: ["messages"],
        queryFn: messagesAPI.getMessages,
        staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
        refetchOnWindowFocus: true, // 창 포커스시 자동 refetch
    });

    const messageUpsertMutation = useMutation({
        mutationFn: (data) => {
            return editMode
                ? messagesAPI.updateMessage({...data, id: editingMessage.id})
                : messagesAPI.createMessage(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["messages"]});
            closeModal();
        },
        onError: (error) => {
            if (error.message === "PASSWORD_MISMATCH") {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                alert(`메세지 ${editMode ? "수정" : "등록"}에 실패했습니다.`);
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: messagesAPI.deleteMessage,
        onMutate: async ({id}) => {
            await queryClient.cancelQueries({queryKey: ["messages"]});
            const previousMessages = queryClient.getQueryData(["messages"]);

            queryClient.setQueryData(["messages"], (old) =>
                old?.filter(msg => msg.id !== id) || [],
            );

            return {previousMessages};
        },
        onSuccess: () => {
            closeModal();
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(["messages"], context.previousMessages);

            if (error.message === "PASSWORD_MISMATCH") {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                alert("메세지를 삭제하지 못했습니다. 신부에게 문의해 주세요.");
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["messages"]});
        },
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (Object.values(data).some(v => !v)) {
            return alert("모든 항목을 입력해 주세요.");
        }

        messageUpsertMutation.mutate(data);
    }

    async function handleDelete(e) {
        e.preventDefault();
        if (!delPassword) return alert("비밀번호를 입력해 주세요.");

        deleteMutation.mutate({id: delID, password: delPassword});
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

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (error) {
        return (
            <div className={styles.errorMessage}>
                메시지를 불러오는데 실패했습니다.
                <button onClick={() => queryClient.invalidateQueries({queryKey: ["messages"]})}>
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <>
            <div className={styles.messageList}>
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
                            <button onClick={() => openEditModal(msg)} disabled={messageUpsertMutation.isPending}>
                                수정
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.openButton} onClick={() => setNewModal(true)} disabled={messageUpsertMutation.isPending}>
                메세지 남기기
            </button>

            {(newModal || delModal) && (
                <div className={styles.modalOverlay} onClick={handleOverlayClick}>
                    {newModal && (
                        <div className={styles.modalContent}>
                            <div className={styles.modlTitle}>
                                <div>{editMode ? "메세지 수정" : "축하 메시지 작성"}</div>
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
                                        disabled={messageUpsertMutation.isPending}
                                    />
                                </div>
                                <div className={styles.modalInput}>
                                    <div>비밀번호</div>
                                    <input
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        disabled={messageUpsertMutation.isPending}
                                    />
                                </div>
                                <div className={styles.modalInput}>
                                    <div>축하 메세지</div>
                                    <textarea
                                        className={styles.textArea}
                                        name="message"
                                        autoComplete="off"
                                        defaultValue={editMode ? editingMessage?.message : ""}
                                        disabled={messageUpsertMutation.isPending}
                                    />
                                </div>
                                <button className={styles.modalBtn} type="submit" disabled={messageUpsertMutation.isPending}>
                                    {messageUpsertMutation.isPending ? (editMode ? "수정" : "등록") + " 중..." : (editMode ? "수정" : "등록")}
                                </button>
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
                                        disabled={deleteMutation.isPending}
                                    />
                                </div>
                                <button className={styles.modalBtn} type="submit" disabled={deleteMutation.isPending}>
                                    {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}