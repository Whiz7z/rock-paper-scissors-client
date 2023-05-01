import React from "react";
import RoomListItem from "../RoomListItem/RoomListItem";
import styles from "./RoomsList.module.scss";

import { useRooms } from "../../zustand/store";

const RoomsList = () => {
  const rooms = useRooms((state) => state.rooms);
  return (
    <div className={styles.rooms_list}>
      {rooms &&
        rooms.map((room) => <RoomListItem key={room.roomId} room={room} />)}
    </div>
  );
};

export default RoomsList;
