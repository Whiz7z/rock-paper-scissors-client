import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
