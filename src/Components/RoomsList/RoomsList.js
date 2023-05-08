import React, { useEffect } from "react";
import RoomListItem from "../RoomListItem/RoomListItem";
import styles from "./RoomsList.module.scss";
import { useRooms } from "../../zustand/store";
import { socket } from "../../socket/socket";

const RoomsList = () => {
  const { rooms, getAllRooms } = useRooms((state) => state);

  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  // useEffect(() => {
  //   function onRoomCreatedEvent(payload) {
  //     console.log("payload", payload);
  //     getAllRooms();
  //   }
  //   socket.on("room:created", onRoomCreatedEvent);

  //   return () => {
  //     socket.off("room:created", onRoomCreatedEvent);
  //   };
  // }, [getAllRooms]);

  return (
    <div className={styles.rooms_list}>
      {rooms &&
        rooms.map((room) => <RoomListItem key={room.roomId} room={room} />)}
    </div>
  );
};

export default RoomsList;
