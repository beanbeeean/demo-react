import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [newName, setNewName] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

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
