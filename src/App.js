import { Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import "./App.scss";
import { useEffect, useState } from "react";
import { socket } from "./socket/socket";
import RoomPage from "./Pages/RoomPage/RoomPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import { useRooms, useUser, useGame } from "./zustand/store";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);

  const { getAllRooms } = useRooms((state) => state);
  const {
    roomId,
    opponent,
    myCount,
    opponentCount,
    setRoom,
    setOpponent,
    setPlayersInTheRoom,
    setMyCount,
    setOpponentCount,
    resetCount,
    setWhoMoves,
    resetMoves,
    setLastMatch,
  } = useGame((state) => state);
  const { user } = useUser((state) => state);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function getAllRoomHandler() {
      getAllRooms();
    }

    function playerReadyHandler(payload) {
      console.log("player ready payload", payload);

      setRoom(payload.roomId);
      resetMoves();
      resetCount();
      setPlayersInTheRoom(payload.playersInTheRoom);
      if (payload.playersInTheRoom.length) {
        console.log("set opponent");
        setOpponent(
          payload.playersInTheRoom.find((nick) => nick !== user.nickname)
        );
      }
    }

    function notJoinedHandler(payload) {
      console.log("notJoined payload", payload);
    }

    function playerExitedHandler(payload) {
      setOpponent(null);
      resetCount();
      setPlayersInTheRoom(payload.playersInTheRoom);

      console.log("exited payload", payload);
      resetMoves();
    }

    function playerWinnerHandler(payload) {
      console.log("winner payload", payload);

      if (payload.result === "draw") {
        console.log("draw");
        setLastMatch({
          you: payload.choices.filter((ch) => ch.nickname === user.nickname)[0]
            .choice,
          opp: payload.choices.filter((ch) => ch.nickname !== user.nickname)[0]
            .choice,
        });
      } else if (payload.winner.nickname === user.nickname) {
        setMyCount();
        console.log("i win");
        setLastMatch({
          you: payload.choices.filter((ch) => ch.nickname === user.nickname)[0]
            .choice,
          opp: payload.choices.filter((ch) => ch.nickname !== user.nickname)[0]
            .choice,
        });
      } else {
        setOpponentCount();
        console.log("i loose");
        setLastMatch({
          you: payload.choices.filter((ch) => ch.nickname === user.nickname)[0]
            .choice,
          opp: payload.choices.filter((ch) => ch.nickname !== user.nickname)[0]
            .choice,
        });
      }

      resetMoves();
    }

    function playerMoveHandler(payload) {
      console.log("player move ", payload);

      if (payload[0].nickname === user.nickname) {
        setWhoMoves(true);
        console.log("me");
      } else if (payload[0].nickname !== user.nickname) {
        setWhoMoves(false);
        console.log("him");
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("room:created", getAllRoomHandler);
    socket.on("room:deleted", getAllRoomHandler);
    socket.on("room:joined", getAllRoomHandler);
    socket.on("room:exited", getAllRoomHandler);
    socket.on("room:notjoined", notJoinedHandler);

    socket.on("player:ready", playerReadyHandler);
    socket.on("player:exited", playerExitedHandler);
    socket.on("player:move-made", playerMoveHandler);
    socket.on("player:winner", playerWinnerHandler);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("room:created", getAllRoomHandler);
      socket.off("room:deleted", getAllRoomHandler);
      socket.off("room:joined", getAllRoomHandler);
      socket.off("room:exited", getAllRoomHandler);
      socket.off("player:ready", playerReadyHandler);
      socket.off("player:exited", playerExitedHandler);
      socket.off("player:winner", playerWinnerHandler);
    };
  }, []);
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
