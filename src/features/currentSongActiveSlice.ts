import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSongId: "",
  activeThumnail: "",
  nextSongId: "",
  prevSongId: "",
};

const activeSong = createSlice({
  name: "songIdIsActive",
  initialState,
  reducers: {
    triggerPlayASingleSong: (state, actions) => {
      state.activeSongId = actions.payload.activeSongId;
      state.activeThumnail = actions.payload.activeThumnail;
      state.nextSongId = actions.payload.nextSongId;
      state.prevSongId = actions.payload.prevSongId;
    },
    triggerEndASingleSong: (state) => {
      state.activeSongId = "";
    },
  },
});

export const { triggerPlayASingleSong, triggerEndASingleSong } =
  activeSong.actions;
export default activeSong;
