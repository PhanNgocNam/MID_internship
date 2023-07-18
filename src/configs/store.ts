import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "../features/userSlice";
import isPlayingSlice from "../features/isPlayingSlice";
import activeSong from "../features/currentSongIdActive";
import { apiSlice } from "../features/apiSlice";
// const rootReducer = combineReducers({
//   user: userSlice.reducer,
//   isPlaying: isPlayingSlice.reducer,
//   activeSongId: activeSong.reducer,
//   [apiSlice.reducerPath]: apiSlice.reducer,
// });
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    isPlaying: isPlayingSlice.reducer,
    activeSong: activeSong.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
