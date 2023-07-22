import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import isPlayingSlice from "../features/currentTimeSlice";
import activeSong from "../features/currentSongActiveSlice";
import activePlayListSlice from "../features/playListActiveSlice";
import { apiSlice } from "../features/apiSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    currentTime: isPlayingSlice.reducer,
    activeSong: activeSong.reducer,
    activePlaylist: activePlayListSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
