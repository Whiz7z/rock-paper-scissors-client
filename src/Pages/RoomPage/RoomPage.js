import React, { useEffect, useCallback } from "react";
import styles from "./RoomPage.module.scss";
import { useParams } from "react-router-dom";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import axios from "axios";

import { socket } from "../../socket/socket";
import { useUser, useGame } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modal/Modal";
const RoomPage = () => {
  const { roomId } = useParams();
  const { user } = useUser((state) => state);
  const {
    opponent,
    playersInTheRoom,
    setPlayersInTheRoom,
    setOpponent,
    setRoom,
    iMadeMove,
    opponentMadeMove,
    opponentCount,
    myCount,
    lastMatch,
  } = useGame((state) => state);
  const navigates = useNavigate();

  const exitRoomHandler = () => {
    if (user) {
      socket.emit("room:exit", { roomId: roomId, token: user.token });
    }
    navigates("/main");
  };

  const makeMoveHandler = useCallback(
    (choice) => {
      if (user) {
        socket.emit("player:make-move", {
          roomId: roomId,
          choice: choice,
          nickname: user.nickname,
        });
      }
    },
    [roomId, user]
  );

  useEffect(() => {
    if (user) {
      socket.emit("room:join", { roomId: roomId, token: user.token });
    }

    return () => {
      socket.removeListener("room:join");
    };
  }, [roomId, user]);

  useEffect(() => {
    const getPlayersInTheRoom = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/rooms/getplayers`,
        {
          params: { roomId: roomId },
        }
      );

      setPlayersInTheRoom(response.data);
      setRoom(roomId);
      setOpponent(response.data.find((nick) => nick !== user.nickname));
    };
    getPlayersInTheRoom();
  }, [roomId, setPlayersInTheRoom]);

  return (
    <div className={styles.container}>
      {lastMatch && <Modal />}
      <div className={styles.content}>
        <button
          className={styles.go_back_btn}
          onClick={() => exitRoomHandler()}
        >
          Exit room
        </button>
        <div className={styles.game_block}>
          <h2 className={styles.room_name}>
            Room
            <br />
            {roomId}
          </h2>
          <div className={styles.opponent_part}>
            {opponent ? (
              <p className={styles.opponent_name}>
                <span>{opponent}</span>
              </p>
            ) : (
              <p className={styles.opponent_name}>Wait for your opponent</p>
            )}
            {opponent && (
              <p className={styles.opponent_score}>{opponentCount}</p>
            )}

            {!opponent ? null : !opponentMadeMove && opponent ? (
              <p className={styles.opponent_move_status}>
                Opponent hasn't moved yet
              </p>
            ) : (
              opponentMadeMove &&
              opponent && (
                <p className={styles.opponent_move_status_ok}>
                  Opponent has made a move
                </p>
              )
            )}
          </div>
          <div className={styles.player_part}>
            {opponent && <p className={styles.my_score}>{myCount}</p>}
            {!iMadeMove ? (
              <p className={styles.my_status}> Make a move</p>
            ) : (
              <p className={styles.my_status_ok}>You have made a move</p>
            )}

            <div className={styles.moves}>
              <div
                className={`${styles.move} ${styles.paper_move}`}
                onClick={() => makeMoveHandler("paper")}
              >
                <FaRegHandPaper />
              </div>
              <div
                className={`${styles.move} ${styles.rock_move}`}
                onClick={() => makeMoveHandler("rock")}
              >
                <FaRegHandRock />
              </div>
              <div
                className={`${styles.move} ${styles.scissors_move}`}
                onClick={() => makeMoveHandler("scissors")}
              >
                <FaRegHandScissors />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
