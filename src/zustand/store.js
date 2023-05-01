import { create } from "zustand";
import { devtools } from "zustand/middleware";

// {roomId: String,
// players: Array}

export const useRooms = create(
  devtools((set) => ({
    rooms: [],
    addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
    deleteRoom: (roomId) =>
      set((state) => ({
        rooms: state.rooms.filter((el) => el.roomId !== roomId),
      })),
  }))
);
