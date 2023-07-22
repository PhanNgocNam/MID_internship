import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface playlistActive {
  playlistIsActive: string[];
}

const initialState: playlistActive = {
  playlistIsActive: [],
};

const playListActiveSlice = createSlice({
  name: "activelayList",
  initialState,
  reducers: {
    dispatchCurrentPlaylist: (state, action: PayloadAction<string[]>) => {
      state.playlistIsActive = action.payload;
    },
  },
});

export const { dispatchCurrentPlaylist } = playListActiveSlice.actions;
export default playListActiveSlice;
