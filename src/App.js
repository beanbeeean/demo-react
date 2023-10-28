import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Component from "./Component";

function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/cc/:id"} element={<Component />} />
      </Routes>
    </div>
  );
}

export default App;
