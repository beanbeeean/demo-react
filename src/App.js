import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Component from "./Component";
import MypageChat from "./chat/MypageChat";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/cc/:id"} element={<Component />} />
        <Route path={"/chat"} element={<MypageChat />} />
      </Routes>
    </div>
  );
}

export default App;
