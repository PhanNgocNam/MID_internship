import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: window.innerWidth,
};

const windowSizeSlice = createSlice({
  name: "windowSize",
  initialState,
  reducers: {
    resizeWindow: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { resizeWindow } = windowSizeSlice.actions;
export default windowSizeSlice;
