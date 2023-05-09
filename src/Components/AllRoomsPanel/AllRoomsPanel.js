import React, { useRef, useEffect } from "react";
import styles from "./AllRoomsPanel.module.scss";
import RoomsList from "../RoomsList/RoomsList";
import { useRooms, useUser } from "../../zustand/store";
import axios from "axios";
import { socket } from "../../socket/socket";

function percentage(partialValue, totalValue) {
  return ((100 * partialValue) / totalValue).toFixed(2);
}

const AllRoomsPanel = () => {
  const inputRef = useRef();
  const { addRoom, setError, createRoomError } = useRooms((state) => state);
  const { user, winrate } = useUser((state) => state);

  const createRoomHandler = () => {
    if (user) {
      if (
        inputRef.current.value.length <= 16 &&
        inputRef.current.value.trim().length > 0
      ) {
        const roomObj = { roomId: inputRef.current.value, players: [] };
        addRoom(roomObj);

        socket.emit("room:create", {
          roomId: roomObj.roomId,
          token: user.token,
        });

        setError(null);
      } else if (inputRef.current.value.length > 16) {
        console.log("err");
        setError("Cannot create room, max 16 symbols");
      }
    } else {
      setError("Cannot create room, not logged in");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.player_info}>
        <h1 className={styles.nickname}>{user && user.nickname}</h1>
        {winrate && (
          <>
            <p className={styles.winrate}>
              wins - {winrate.wins} / loses - {winrate.loses}
            </p>
            <p className={styles.winrate_percent}>
              Win rate -{" "}
              <span>
                {` ${percentage(winrate.wins, winrate.wins + winrate.loses)}`}%
              </span>
            </p>
          </>
        )}
      </div>
      <div className={styles.rooms_container}>
        <h2>Rooms</h2>
        <RoomsList />
      </div>
      <div className={styles.create_room_form}>
        <input ref={inputRef} type="text" placeholder="Create room" />
        {createRoomError && (
          <p className={styles.create_error}>{createRoomError}</p>
        )}
        <button onClick={() => createRoomHandler()}>Create</button>
      </div>
    </div>
  );
};

export default AllRoomsPanel;
