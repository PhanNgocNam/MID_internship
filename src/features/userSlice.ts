import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  uid: string;
  status: number;
  displayName: string;
  photoURL: string;
  email: string;
}
const initialState: IUser = {
  uid: "",
  status: 0,
  displayName: "",
  photoURL: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.status = action.payload.status;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice;
