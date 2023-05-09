import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { mountStoreDevtool } from "simple-zustand-devtools";

// {roomId: String,
// players: Array}

export const useRooms = create(
  devtools(
    (set) => ({
      rooms: [],
      winrate: null,
      createRoomError: null,
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
      getAllRooms: async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/rooms`,
          config
        );
        set({ rooms: await response.data });
      },
      setError: (error) => {
        set({ createRoomError: error });
      },
    }),
    "useRooms"
  )
);

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const useUser = create(
  devtools(
    (set) => ({
      user: JSON.parse(sessionStorage.getItem("userData")) ?? null,
      login: async (nickname, password) => {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
          { nickname, password },
          config
        );
        if (response.status > 400) {
          console.log(response);
        } else {
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              userId: response.data._id,
              nickname: response.data.nickname,
              token: response.data.token,
            })
          );
          set({ user: await response.data });
        }
      },
      register: async (nickname, password) => {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
          { nickname, password },
          config
        );
        if (response.status > 400) {
          console.log(response);
        } else {
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              userId: response.data.id,
              nickname: response.data.nickname,
              token: response.data.token,
            })
          );
          set({ user: await response.data });
        }
      },
      logout: () => {
        sessionStorage.removeItem("userData");
        set({ user: null });
      },

      getWinrate: async (token) => {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/users/winrate`,
          {
            params: { token: token },
          },
          config
        );

        set({ winrate: response.data });
      },
    }),
    "useUser"
  )
);

export const useGame = create(
  devtools(
    (set) => ({
      roomId: null,
      opponent: null,
      myCount: 0,
      opponentCount: 0,
      playersInTheRoom: [],
      opponentMadeMove: false,
      iMadeMove: false,
      lastMatch: null,
      setOpponent: (nickname) => {
        set({ opponent: nickname });
      },
      setPlayersInTheRoom: (array) => {
        set({ playersInTheRoom: array });
      },

      setRoom: (roomId) => {
        set({ roomId: roomId });
      },

      setMyCount: () => {
        set((state) => ({ myCount: state.myCount + 1 }));
      },
      setOpponentCount: () => {
        set((state) => ({ opponentCount: state.opponentCount + 1 }));
      },

      resetCount: () => {
        set({ myCount: 0, opponentCount: 0 });
      },

      setWhoMoves: (me) => {
        if (me) {
          set({ iMadeMove: true });
        } else {
          set({ opponentMadeMove: true });
        }
      },

      resetMoves: () => {
        set({ iMadeMove: false, opponentMadeMove: false });
      },

      setLastMatch: (payload) => {
        set({ lastMatch: payload });
      },
    }),
    "useGame"
  )
);

// if (useUser.getState().nickname) {
//   mountStoreDevtool("Rooms ", useRooms);
// }
// mountStoreDevtool("User", useUser);
// mountStoreDevtool("Game", useGame);
