import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from "../features/userSlice";
// const reducer = combineReducers({
//   // here we will be adding reducers
// });
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
