import React from "react";
import styles from "./MypageChat.module.css";
const MyChat = ({ msg }) => {
  return (
    <div className={styles.mine}>
      <span className={styles.chat_time}>pm 10:10</span>
      <span className={styles.chat_text}>{msg}</span>
    </div>
  );
};

export default MyChat;
