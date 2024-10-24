// Chat.tsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import io from "socket.io-client";
import { ChatList, MessageType } from "../../../interface/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { API_URL, userChatList } from "../../../api";
import { CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const Chat: React.FC = () => {
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const userToken = useSelector((state: RootState) => state.user.data.token);
  const userEmail = useSelector((state: RootState) => state.user.email);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socket = useRef<any>(null);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await fetch(`${API_URL}/api/${userChatList}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken.atk}`,
          },
        });
        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`);
        }
        const responseData = await response.json();
        setChatList(responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatList();
  }, [userToken]);

  // 채팅방에 연결
  const connectHandler = (roomId: string) => {
    if (socket.current) {
      socket.current.disconnect();
    }

    // Socket.IO 서버에 연결
    socket.current = io(`${API_URL}/chat`, {
      extraHeaders: {
        Authorization: `Bearer ${userToken.atk}`,
      },
      transports: ["websocket"],
    });

    // 연결 성공 시
    socket.current.on("connect", () => {
      console.log("Socket connected");
      // 채팅방에 참가
      socket.current.emit("joinRoom", roomId);

      // 메시지 수신
      socket.current.on("message", (data: MessageType) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      // 채팅 내역 요청
      socket.current.emit("getHistory", roomId);

      // 채팅 내역 수신
      socket.current.on("history", (history: MessageType[]) => {
        setMessages(history);
      });
    });

    // 에러 처리
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.current.on("connect_error", (err: any) => {
      console.error("Socket connection error:", err);
    });
  };

  // 연결 해제
  const disconnectHandler = () => {
    if (socket.current) {
      socket.current.disconnect();
    }
    setSelectedUser(null);
    setMessages([]);
  };

  // 사용자 선택
  const handleUserSelect = (
    roomId: string,
    userEmail: string,
    userNickname: string
  ) => {
    disconnectHandler();
    setSelectedUser(userEmail);
    setOtherUserName(userNickname);
    setSelectedRoomId(roomId);
    connectHandler(roomId);
  };

  // 채팅 입력
  const handleSend = () => {
    if (input && selectedUser && socket.current) {
      const newMessage = {
        roomId: selectedRoomId,
        message: input,
      };

      // 서버에 메시지 전송
      socket.current.emit("message", newMessage);

      setInput("");
    }
  };

  // 채팅창 Enter 입력
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // 메시지 입력 -> 자동 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  const userInforClass = selectedUser
    ? `${styles.userInfor} ${styles.selectedUserInfor}`
    : `${styles.userInfor}`;

  return (
    <div className={styles.chatContainer}>
      <h6 className={styles.hiddenH6}>채팅</h6>
      <div className={styles.userDiv}>
        <div className={userInforClass}>
          <h2>채팅</h2>
          {chatList.length > 0 ? (
            chatList.map((user) => (
              <div
                key={user.roomId}
                className={styles.userName}
                onClick={() =>
                  handleUserSelect(
                    user.roomId,
                    userEmail || "default",
                    user.userNickname
                  )
                }
              >
                {user.userNickname}
              </div>
            ))
          ) : (
            <div className={styles.noList}>
              대화 상대가 없습니다 <br />
            </div>
          )}
        </div>

        {selectedUser && (
          <div className={styles.chatDiv}>
            <h2>
              '{otherUserName}' 님과 대화를 나눠보세요
              <CloseCircleOutlined
                className={styles.clIcon}
                onClick={disconnectHandler}
              />
            </h2>
            <div className={styles.chat}>
              <div className={styles.chatMessageDiv} ref={messageEndRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={styles.messageDiv}
                    style={{
                      textAlign:
                        message.userEmail === userEmail ? "right" : "left",
                    }}
                  >
                    {message.userEmail === userEmail && (
                      <span
                        className={styles.createDate}
                        style={{
                          paddingRight: 5,
                        }}
                      >
                        {moment(message.createDate)
                          .add(9, "hours")
                          .locale("ko")
                          .format("A h:mm")}
                      </span>
                    )}
                    <span
                      className={styles.message}
                      style={{
                        backgroundColor:
                          message.userEmail === userEmail
                            ? "#7f35fc"
                            : "#9d54fd",
                      }}
                    >
                      {message.msg}
                    </span>
                    {message.userEmail !== userEmail && (
                      <span
                        className={styles.createDate}
                        style={{
                          paddingLeft: 5,
                        }}
                      >
                        {moment(message.createDate)
                          .add(9, "hours")
                          .locale("ko")
                          .format("A h:mm")}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
              <div className={styles.messageInput}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={handleKeyUp}
                  placeholder="채팅글 작성"
                />
                <button onClick={handleSend}>전송</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
