import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSongId: "",
};

const activeSong = createSlice({
  name: "songIdIsActive",
  initialState,
  reducers: {
    triggerPlayASingleSong: (state, actions) => {
      state.activeSongId = actions.payload.activeSongId;
    },
    triggerEndASingleSong: (state) => {
      state.activeSongId = "";
    },
  },
});

export const { triggerPlayASingleSong, triggerEndASingleSong } =
  activeSong.actions;
export default activeSong;
