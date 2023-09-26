import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSongPlaying: false,
};

const isSongPlayingSlice = createSlice({
  name: "isSongPlaying",
  initialState,
  reducers: {
    triggerPlay: (state) => {
      state.isSongPlaying = true;
    },
    triggerPause: (state) => {
      state.isSongPlaying = false;
    },
  },
});

export const { triggerPause, triggerPlay } = isSongPlayingSlice.actions;
export default isSongPlayingSlice;
