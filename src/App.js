import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import "./App.scss";
import RoomPage from "./Pages/RoomPage/RoomPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/auth" element={<AuthPage />} exact />
        <Route path="/room/:roomId" element={<RoomPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
