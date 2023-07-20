import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
};

const currentTimeSlice = createSlice({
  name: "now",
  initialState,
  reducers: {
    dispatchCurrenttime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { dispatchCurrenttime } = currentTimeSlice.actions;
export default currentTimeSlice;
