import React from "react";
import styles from "./RoomListItem.module.scss";

const RoomListItem = ({ room }) => {
  return (
    <div className={styles.room_item}>
      <p className={styles.room_id}>{room.roomId}</p>
      <button className={styles.room_join_btn}>Join room</button>
      <button className={styles.room_delete_btn}>Delete room</button>
      <p className={styles.room_players_count}>{room.players.length}/2</p>
    </div>
  );
};

export default RoomListItem;
