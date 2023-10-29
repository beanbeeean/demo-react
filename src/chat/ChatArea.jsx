import React, { useEffect, useState } from "react";
import styles from "./MypageChat.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import api from "../api";

let stompClient = null;

const ChatArea = ({ roomId, setRoomId, userName }) => {
  let [userList, setUserList] = useState([]);
  let [msg, setMsg] = useState([]);
  let [inputText, setInputText] = useState("");

  function connect() {
    var socket = new SockJS("/ws-stomp");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, console.log("error"));
    console.log("[connect] stompClient : ", stompClient);
  }

  function onConnected() {
    // sub 할 url => /sub/chat/room/roomId 로 구독한다
    stompClient.subscribe("/sub/chat/room/" + roomId, onMessageReceived);

    // 서버에 userName 을 가진 유저가 들어왔다는 것을 알림
    // /pub/chat/enterUser 로 메시지를 보냄
    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: userName,
        type: "ENTER",
      })
    );
    //   console.log("[onConnected] stompClient : ", stompClient);
    //   // connectingElement.classList.add("hidden");
  }

  function onMessageReceived(payload) {
    //console.log("payload 들어오냐? :"+payload);
    let arr = [];
    var chat = JSON.parse(payload.body);

    if (chat.type === "ENTER") {
      // chatType 이 enter 라면 아래 내용
      chat.content = chat.sender + chat.message;
      msg.push(chat.content);
      setMsg([...msg]);
      //   setMsg(chat.content);
      getUserList();
    } else if (chat.type === "LEAVE") {
      // chatType 가 leave 라면 아래 내용

      chat.content = chat.sender + chat.message;
      msg.push(chat.content);
      setMsg([...msg]);
    } else {
      // chatType 이 talk 라면 아래 내용용
      chat.content = chat.sender + chat.message;
      msg.push(chat.content);
      setMsg([...msg]);
    }
    console.log("[onMessageReceived] stompClient : ", stompClient);
  }

  function getUserList() {
    api
      .get("/chat/userlist", {
        params: {
          roomId: roomId,
        },
      })
      .then(function (res) {
        setUserList(res.data);
        console.log(userList);
      })
      .catch(function (err) {
        console.log("getUserList", err);
      });
    console.log("[getUserList] stompClient : ", stompClient);
  }

  function sendMessage() {
    console.log("[sendMessage] stompClient : ", stompClient);
    if (stompClient) {
      var chatMessage = {
        roomId: roomId,
        sender: userName,
        message: inputText,
        type: "TALK",
      };
      console.log("sendMessage");
      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );

      setInputText("");
    }
  }

  useEffect(() => {
    connect();
  }, [roomId]);

  return (
    <div className={styles.chat_area}>
      <div className={styles.chatting}>
        <div className={styles.chatting_log}>
          <div className={styles.chat_date}>
            <span>2023년 10월 20일</span>
          </div>
          <div>{roomId}</div>
          {msg.map((msg) => (
            <MyChat msg={msg} />
          ))}
          {/* <MyChat msg={msg} /> */}
          {/* {data.map((chat) =>
            chat.user == 1 ? <MyChat chat={chat} /> : <OthersChat chat={chat} />
          )} */}
        </div>

        <div className={styles.input_chat}>
          <input
            type="text"
            placeholder="메세지를 입력하세요"
            onChange={(e) => setInputText(e.target.value)}
          />
          <FontAwesomeIcon
            title="Send"
            className={styles.send_icon}
            icon={faPaperPlane}
            onClick={sendMessage}
          />
          <button onClick={() => setRoomId("")}>돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
