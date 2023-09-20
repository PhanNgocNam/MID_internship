import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ready: false,
};

const isPlayingFlagSlice = createSlice({
  name: "playingFlag",
  initialState,
  reducers: {
    triggerReadySatate: (state, actions) => {
      state.ready = actions.payload;
    },
  },
});

export const { triggerReadySatate } = isPlayingFlagSlice.actions;
export default isPlayingFlagSlice;
