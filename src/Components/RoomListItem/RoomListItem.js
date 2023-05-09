import React, { useEffect, useCallback } from "react";
import styles from "./RoomListItem.module.scss";
import { useRooms, useUser } from "../../zustand/store";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket/socket";

const RoomListItem = ({ room }) => {
  const { deleteRoom, getAllRooms } = useRooms((state) => state);
  const { user } = useUser((state) => state);
  const navigate = useNavigate();
  const deleteRoomHandler = () => {
    if (user) {
      socket.emit("room:delete", { roomId: room.roomId, token: user.token });
    }
  };

  const joinRoomHandler = useCallback(() => {
    navigate(`room/${room.roomId}`);
  }, []);

  return (
    <div className={styles.room_item}>
      <p className={styles.room_id}>{room.roomId}</p>
      <button
        className={styles.room_join_btn}
        onClick={() => joinRoomHandler()}
      >
        Join the room
      </button>
      <button
        className={styles.room_delete_btn}
        onClick={() => deleteRoomHandler()}
      >
        Delete the room
      </button>
      <p className={styles.room_players_count}>{room.players.length}/2</p>
    </div>
  );
};

export default RoomListItem;
