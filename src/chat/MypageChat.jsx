import React, { useEffect, useRef, useState } from "react";
import styles from "./MypageChat.module.css";
import MyChat from "./MyChat";
import OthersChat from "./OthersChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import MypageChatItem from "./MypageChatItem";

const data = [
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
  {
    user: 1,
    text: "hello",
  },
  {
    user: 2,
    text: "hi",
  },
];

const MypageChat = () => {
  const scrollRef = useRef();
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    // scrollToBottom();
  }, []);

  return (
    <div className={styles.mypage_chat}>
      <div className={styles.chat_box}>
        <div className={styles.chat_list}>
          <MypageChatItem />
          <MypageChatItem />
          <MypageChatItem />
        </div>

        <div className={styles.chat_area}>
          <div className={styles.chatting}>
            <div ref={scrollRef} className={styles.chatting_log}>
              <div className={styles.chat_date}>
                <span>2023년 10월 20일</span>
              </div>
              {data.map((chat) =>
                chat.user == 1 ? (
                  <MyChat chat={chat} />
                ) : (
                  <OthersChat chat={chat} />
                )
              )}
            </div>

            <div className={styles.input_chat}>
              <input type="text" placeholder="메세지를 입력하세요" />
              <FontAwesomeIcon
                title="Send"
                className={styles.send_icon}
                icon={faPaperPlane}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageChat;
