import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import api from "./api";

let stompClient = null;

const Component = () => {
  let { id } = useParams();

  let [username, setUsername] = useState("");
  let [userList, setUserList] = useState([]);
  let [msg, setMsg] = useState([]);
  let [inputText, setInputText] = useState("");

  // function connect() {
  //   // username 중복 확인
  //   // isDuplicateName();

  //   // usernamePage 에 hidden 속성 추가해서 가리고
  //   // chatPage 를 등장시킴
  //   // usernamePage.classList.add("hidden");
  //   // chatPage.classList.remove("hidden");

  //   // 연결하고자하는 Socket 의 endPoint
  //   var socket = new SockJS("/ws-stomp");
  //   stompClient = Stomp.over(socket);

  //   stompClient.connect({}, onConnected, console.log("error"));
  //   console.log("[connect] stompClient : ", stompClient);
  // }

  // // function onConnected() {
  // //   // sub 할 url => /sub/chat/room/roomId 로 구독한다
  // //   stompClient.subscribe("/sub/chat/room/" + id, onMessageReceived);

  // //   // 서버에 username 을 가진 유저가 들어왔다는 것을 알림
  // //   // /pub/chat/enterUser 로 메시지를 보냄
  // //   stompClient.send(
  // //     "/pub/chat/enterUser",
  // //     {},
  // //     JSON.stringify({
  // //       roomId: id,
  // //       sender: username,
  // //       type: "ENTER",
  // //     })
  // //   );
  // //   console.log("[onConnected] stompClient : ", stompClient);
  // //   // connectingElement.classList.add("hidden");
  // // }

  // //   function onError(error) {
  // //     connectingElement.textContent =
  // //       "Could not connect to WebSocket server. Please refresh this page to try again!";
  // //     connectingElement.style.color = "red";
  // //   }

  // function onMessageReceived(payload) {
  //   //console.log("payload 들어오냐? :"+payload);
  //   let arr = [];
  //   var chat = JSON.parse(payload.body);

  //   if (chat.type === "ENTER") {
  //     // chatType 이 enter 라면 아래 내용
  //     chat.content = chat.sender + chat.message;
  //     msg.push(chat.content);
  //     setMsg([...msg]);
  //     //   setMsg(chat.content);
  //     getUserList();
  //   } else if (chat.type === "LEAVE") {
  //     // chatType 가 leave 라면 아래 내용

  //     chat.content = chat.sender + chat.message;
  //     msg.push(chat.content);
  //     setMsg([...msg]);
  //   } else {
  //     // chatType 이 talk 라면 아래 내용용
  //     chat.content = chat.sender + chat.message;
  //     msg.push(chat.content);
  //     setMsg([...msg]);
  //   }
  //   console.log("[onMessageReceived] stompClient : ", stompClient);
  // }

  // function getUserList() {
  //   api
  //     .get("/chat/userlist", {
  //       params: {
  //         roomId: id,
  //       },
  //     })
  //     .then(function (res) {
  //       setUserList(res.data);
  //       console.log(userList);
  //     })
  //     .catch(function (err) {
  //       console.log("getUserList", err);
  //     });
  //   console.log("[getUserList] stompClient : ", stompClient);
  // }

  // function sendMessage() {
  //   console.log("[sendMessage] stompClient : ", stompClient);
  //   if (stompClient) {
  //     var chatMessage = {
  //       roomId: id,
  //       sender: username,
  //       message: inputText,
  //       type: "TALK",
  //     };
  //     console.log("sendMessage");
  //     stompClient.send(
  //       "/pub/chat/sendMessage",
  //       {},
  //       JSON.stringify(chatMessage)
  //     );

  //     setInputText("");
  //   }
  // }

  useEffect(() => {
    // getUserList();
  }, []);

  return (
    <div>
      {id}
      <div id="username-page">
        <div class="username-page-container">
          <h1 class="title">Type your username</h1>
          <form id="usernameForm" name="usernameForm">
            <div class="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autocomplete="off"
                class="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* <div class="form-group">
              <button
                type="button"
                onClick={connect}
                class="accent username-submit"
              >
                Start Chatting
              </button>
            </div> */}
          </form>
        </div>
      </div>

      <div id="chat-page" class="hidden">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            참가한 유저
          </button>
          <div
            id="list"
            class="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
          >
            {userList.map((item, idx) => (
              <li>{item}</li>
            ))}
          </div>
        </div>
        <div class="chat-container">
          <div class="chat-header">
            <h2>Spring WebSocket Chatting</h2>
          </div>
          <div class="connecting">Connecting...</div>
          <ul id="messageArea">
            {msg.map((msg) => (
              <li>{msg}</li>
            ))}
          </ul>
          {/* <form id="messageForm" name="messageForm">
            <div class="form-group">
              <div class="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autocomplete="off"
                  class="form-control"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button type="button" class="primary" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Component;
