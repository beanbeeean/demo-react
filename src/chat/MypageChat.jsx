import React, { useEffect, useRef, useState } from "react";
import styles from "./MypageChat.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import MypageChatItem from "./MypageChatItem";
import api from "../api";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatArea from "./ChatArea";
import { Routes } from "react-router-dom";
import { param } from "jquery";

const MypageChat = () => {
  const [showChatList, setShowChatList] = useState(0);
  const [newName, setNewName] = useState("");
  const [list, setList] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [userMaxCount, setUserMaxCount] = useState(2);
  const [leave, setLeave] = useState();
  let [userName, setUserName] = useState("");

  const leaveConfirm = () => {
    setLeave(window.confirm("나갈래요?"));
  };

  const test = () => {
    api
      .post("http://127.0.0.1:8080/chat/createroom", {
        newName: newName,
        userMaxCount: userMaxCount,
        userName: userName,
      })
      .then(function (response) {
        console.log(response);
        getList();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getList = () => {
    api
      .get("http://127.0.0.1:8080/", {
        params: {
          userName: userName,
        },
      })
      .then(function (res) {
        setList(res.data.list);
        console.log("list res", list);
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  useEffect(() => {
    console.log("show ", showChatList);
  }, [showChatList]);

  useEffect(() => {
    getList();
  }, [userName]);

  return (
    <div className={styles.mypage_chat}>
      <div className={styles.chat_box}>
        <div className={styles.chat_list}>
          {list.map((item) => (
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">
                  <a onClick={() => setRoomId(item.roomId)}>{item.roomName}</a>
                </div>
              </div>
              <span class="badge bg-primary rounded-pill">
                {item.userCount}명
              </span>
              <button onClick={leaveConfirm}>채팅방 나가기</button>
            </li>
          ))}
        </div>

        {roomId !== "" ? (
          <ChatArea
            roomId={roomId}
            setRoomId={setRoomId}
            userName={userName}
            leave={leave}
          />
        ) : (
          "없음"
        )}
      </div>
      <div>
        <input
          type="text"
          name="name"
          class="form-control"
          id="roomName"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button class="btn btn-secondary" id="create" onClick={test}>
          개설하기
        </button>
        <br />
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
        <br />
        <input
          type="number"
          onChange={(e) => setUserMaxCount(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MypageChat;
