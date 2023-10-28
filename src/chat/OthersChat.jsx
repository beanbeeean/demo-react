import React from "react";
import styles from "./MypageChat.module.css";
const OthersChat = ({ chat }) => {
  return (
    <div className={styles.others}>
      <p className={styles.user_name}>나야</p>
      <span className={styles.chat_text}>{chat.text}</span>
      <span className={styles.chat_time}>pm 10:10</span>
    </div>
  );
};

export default OthersChat;
