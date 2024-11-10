// Chat.tsx

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { io, Socket } from "socket.io-client"; // io를 가져올 때 Socket 타입도 가져옵니다.
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
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [otherUserName, setOtherUserName] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const userToken = useSelector((state: RootState) => state.user.data.token);
  const userId = useSelector((state: RootState) => state.user.data.user_id);

  
  // Socket.IO 클라이언트 인스턴스를 useRef로 관리
  const socket = useRef<Socket | null>(null);

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

    // Socket.IO 서버에 연결 (auth 옵션 사용)
    socket.current = io(`${API_URL}/chat`, {
      auth: {
        token: userToken.atk, // 인증 토큰을 auth에 포함
      },
      transports: ["websocket"],
    });

    // 연결 성공 시
    socket.current.on("connect", () => {
      console.log("Socket connected with ID:", socket.current?.id);
      // 채팅방에 참가
      socket.current?.emit("joinRoom", roomId);

      // 메시지 수신
      socket.current?.on("message", (data: MessageType) => {
        console.log("Received message from server:", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      // 채팅 내역 요청
      socket.current?.emit("getHistory", roomId);

      // 채팅 내역 수신
      socket.current?.on("history", (history: MessageType[]) => {
        console.log("Received chat history:", history);
        setMessages(history);
      });
    });

    // 에러 처리
    socket.current.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
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
    otherUserId: number,
    otherUserNickname: string
  ) => {
    disconnectHandler();
    setSelectedUser(otherUserId);
    setOtherUserName(otherUserNickname);
    setSelectedRoomId(roomId);
    connectHandler(roomId);
  };

  // 채팅 입력
  const handleSend = () => {
    if (input && selectedUser && socket.current) {
      const newMessage = {
        roomId: selectedRoomId,
        message: input, // message 필드 사용
      };
      console.log("Sending message:", newMessage);

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
            chatList.map((chatRoom) => {
              // 현재 사용자가 user1인지 user2인지 확인
              const isUser1 = chatRoom.user1.user_id === userId;
              const otherUser = isUser1 ? chatRoom.user2 : chatRoom.user1;
              const otherUserNickname = otherUser.nickname;
              const otherUserId = otherUser.user_id;

              return (
                <div
                  key={chatRoom.roomId}
                  className={styles.userName}
                  onClick={() =>
                    handleUserSelect(
                      chatRoom.roomId,
                      otherUserId,
                      otherUserNickname
                    )
                  }
                >
                  {otherUserNickname}
                </div>
              );
            })
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
                      textAlign: message.userId === userId ? "right" : "left",
                    }}
                  >
                    {message.userId === userId && (
                      <span
                        className={styles.createDate}
                        style={{
                          paddingRight: 5,
                        }}
                      >
                        {moment(message.createDate)
                          .local()
                          .locale("ko")
                          .format("A h:mm")}
                      </span>
                    )}
                    <span
                      className={styles.message}
                      style={{
                        backgroundColor:
                          message.userId === userId ? "#006400" : "#394d3f",
                      }}
                    >
                      {message.message} {/* message 필드 사용 */}
                    </span>
                    {message.userId !== userId && (
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
