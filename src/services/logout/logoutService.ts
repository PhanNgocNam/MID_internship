import { logout } from "../../features/userSlice";

export const logoutService = async (dispatch: any) => {
  dispatch(logout());
  localStorage.setItem("user", JSON.stringify({}));
};
