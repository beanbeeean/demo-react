import React from "react";
import styles from "./MypageChat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FaTrashAlt } from "react-icons/fa";

const MypageChatItem = () => {
  const deleteChat = () => {
    alert("채팅방을 나가시겠습니까?");
  };

  return (
    <div className={styles.chat_room}>
      <div className={styles.chat_room_title}>
        <div className={styles.chatting_room}>
          <FontAwesomeIcon className={styles.group_icon} icon={faPeopleGroup} />
          <br />
          <span className={styles.group_name}>BTC DEVELOPER STUDY</span>
          <span>
            <FaTrashAlt className={styles.delete_room} onClick={deleteChat} />
          </span>
        </div>
      </div>
      <div className={styles.chat_room_latest}>
        <span>아이구</span> <span className={styles.chat_date}>1일전</span>
      </div>
    </div>
  );
};

export default MypageChatItem;
