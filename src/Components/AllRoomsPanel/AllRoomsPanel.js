import React, { useRef, useEffect } from "react";
import styles from "./AllRoomsPanel.module.scss";
import RoomsList from "../RoomsList/RoomsList";
import { useRooms, useUser } from "../../zustand/store";
import axios from "axios";
import { socket } from "../../socket/socket";

const AllRoomsPanel = () => {
  const inputRef = useRef();
  const { addRoom } = useRooms((state) => state);
  const { user } = useUser((state) => state);

  const createRoomHandler = () => {
    console.log(inputRef.current.value);
    if (inputRef.current.value.trim().length > 0) {
      const roomObj = { roomId: inputRef.current.value, players: [] };
      addRoom(roomObj);

      socket.emit("room:create", roomObj);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.player_info}>
        <h1 className={styles.nickname}>{user && user.nickname}</h1>
        <p className={styles.winrate}>wins - 5 / loses - 5</p>
        <p className={styles.winrate_percent}>
          Win rate - <span>50%</span>
        </p>
      </div>
      <div className={styles.rooms_container}>
        <h2>Rooms</h2>
        <RoomsList />
      </div>
      <div className={styles.create_room_form}>
        <input ref={inputRef} type="text" placeholder="Create room" />
        <button onClick={() => createRoomHandler()}>Create</button>
      </div>
    </div>
  );
};

export default AllRoomsPanel;
