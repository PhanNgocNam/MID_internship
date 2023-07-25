import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShuffringMode: false,
};

const isShuffringMode = createSlice({
  name: "shuffer",
  initialState,
  reducers: {
    triggerShufferingMode: (state, action) => {
      state.isShuffringMode = action.payload;
    },
  },
});

export const { triggerShufferingMode } = isShuffringMode.actions;
export default isShuffringMode;
