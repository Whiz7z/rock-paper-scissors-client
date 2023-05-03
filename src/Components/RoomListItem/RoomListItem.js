import React from "react";
import styles from "./RoomListItem.module.scss";
import { useRooms } from "../../zustand/store";
import { Link } from "react-router-dom";

const RoomListItem = ({ room }) => {
  const { deleteRoom } = useRooms((state) => state);
  const deleteRoomHandler = () => {
    deleteRoom(room.roomId);
  };
  return (
    <div className={styles.room_item}>
      <p className={styles.room_id}>{room.roomId}</p>
      <Link to={`room/${room.roomId}`} className={styles.room_join_btn}>
        Join the room
      </Link>
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
