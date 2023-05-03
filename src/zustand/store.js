import { create } from "zustand";
import { devtools } from "zustand/middleware";

// {roomId: String,
// players: Array}

export const useRooms = create(
  devtools((set) => ({
    rooms: [],
    addRoom: (room) =>
      set((state) => {
        if (!state.rooms.find((rm) => room.roomId === rm.roomId)) {
          return { rooms: [...state.rooms, room] };
        } else {
          return { rooms: [...state.rooms] };
        }
      }),
    deleteRoom: (roomId) =>
      set((state) => ({
        rooms: state.rooms.filter((el) => el.roomId !== roomId),
      })),
  }))
);
