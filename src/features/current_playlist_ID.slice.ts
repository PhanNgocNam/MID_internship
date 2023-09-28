import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlaylistID: "",
};

const currentPlaylistIDSLice = createSlice({
  name: "current_playlist_ID",
  initialState,
  reducers: {
    saveCurrentPlaylistID: (state, actions) => {
      state.currentPlaylistID = actions.payload;
    },
  },
});

export const { saveCurrentPlaylistID } = currentPlaylistIDSLice.actions;
export default currentPlaylistIDSLice;
