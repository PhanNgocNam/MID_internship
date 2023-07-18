import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: true,
};

const isPlayingSlice = createSlice({
  name: "isPlaying",
  initialState,
  reducers: {
    triggerPlay: (state) => {
      state.isPlaying = true;
    },
    triggerPause: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { triggerPlay, triggerPause } = isPlayingSlice.actions;
export default isPlayingSlice;
