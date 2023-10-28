import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

const Home = () => {
  const [newName, setNewName] = useState("");
  const [userName, setUserName] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  let [userList, setUserList] = useState([]);
  let [msg, setMsg] = useState([]);

  // ///////////////////////////////////////////
  function connect(id) {
    // username 중복 확인
    // isDuplicateName();

    // usernamePage 에 hidden 속성 추가해서 가리고
    // chatPage 를 등장시킴
    // usernamePage.classList.add("hidden");
    // chatPage.classList.remove("hidden");

    // 연결하고자하는 Socket 의 endPoint
    var socket = new SockJS("/ws-stomp");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected(id), console.log("error"));
    console.log("[connect] stompClient : ", stompClient);
  }

  function onConnected(id) {
    // sub 할 url => /sub/chat/room/roomId 로 구독한다
    stompClient.subscribe("/sub/chat/room/" + id, onMessageReceived);

    // 서버에 username 을 가진 유저가 들어왔다는 것을 알림
    // /pub/chat/enterUser 로 메시지를 보냄
    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: id,
        sender: userName,
        type: "ENTER",
      })
    );
    console.log("[onConnected] stompClient : ", stompClient);
    // connectingElement.classList.add("hidden");
  }

  //   function onError(error) {
  //     connectingElement.textContent =
  //       "Could not connect to WebSocket server. Please refresh this page to try again!";
  //     connectingElement.style.color = "red";
  //   }

  function onMessageReceived(payload) {
    //console.log("payload 들어오냐? :"+payload);
    let arr = [];
    var chat = JSON.parse(payload.body);

    if (chat.type === "ENTER") {
      // chatType 이 enter 라면 아래 내용
      chat.content = chat.sender + chat.message;
      msg.push(chat.content);
      setMsg([...msg]);
      // setMsg(chat.content);
      // getUserList();
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

  /////////////////

  const test = () => {
    api
      .post("http://127.0.0.1:8080/chat/createroom", {
        newName,
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
      .get("http://127.0.0.1:8080/")
      .then(function (res) {
        setList(res.data.list);
        console.log("list res", list);
      })
      .catch(function (err) {
        console.log("list err", err);
      });
  };

  const enterChatRoom = (roomId) => {
    navigate(`/cc/${roomId}`);
    connect(roomId);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log("www", list);
  }, [list]);
  return (
    <div>
      <div class="container">
        <div>
          <ul>
            {list.map((item) => (
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    {/* <a th:href="@{/chat/room(roomId=${room.roomId})}"> */}
                    {/* [[${room.roomName}]] */}
                    <a onClick={() => enterChatRoom(item.roomId)}>
                      {item.roomName}
                    </a>
                  </div>
                </div>
                <span class="badge bg-primary rounded-pill">
                  {item.userCount}명
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
      <input type="text" onChange={(e) => setUserName(e.target.name)} />
      {/* <form
        action="/chat/createroom"
        method="post"
        onSubmit="return createRoom()"
      >
        <input type="text" name="name" class="form-control" id="roomName" />
        <button class="btn btn-secondary" id="create">
          개설하기
        </button>
      </form> */}
    </div>
  );
};

export default Home;
