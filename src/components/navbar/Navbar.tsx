import { FC, useEffect, useState } from "react";
import logo_on_phone from "../../assets/img/logo-on-phone.svg";
import UserAvatar from "../avatar/UserAvatar";
import Logo from "../logo/Logo";
import SearchBox from "./SearchBox";
import { data } from "../../items/navbar/navbar.item";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Button } from "antd";
import { signInWithGoogle } from "../../configs/firebase";
import { IUser, loginService } from "../../services/login/loginService";
import { login } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import LogoutPopup from "./LogoutPopup";
import LangsComboBox from "./LangsComboBox";

interface INavbar {
  isChangeBackgroundHeader: boolean;
}

const Navbar: FC<INavbar> = ({ isChangeBackgroundHeader }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const status = useSelector((state: RootState) => state.user.status);
  useEffect(() => {
    if (!status) {
      const user: string = localStorage.getItem("user")!;
      if (user) {
        dispatch(login(JSON.parse(user)));
      }
    }
  }, []);

  return (
    <div
      className={`bg-black flex justify-between items-center h-[64px] p-2 text-slate-100 border-b border-white/10 border-solid fixed top-0 left-0 right-0 z-20 transition-colors ${clsx(
        {
          ["changeBg"]: isChangeBackgroundHeader,
          ["bg-transparent"]: status,
        }
      )}`}
    >
      <Logo alt="Logo" src={logo_on_phone} size={26} shape="circle" />
      {status ? (
        <>
          <div className="flex w-[60%] items-center justify-evenly ">
            {data.map((menuItem, index) => {
              return (
                <menuItem.icon
                  className="text-xl text-white/80"
                  key={index}
                  onClick={() => navigate(menuItem.path)}
                />
              );
            })}
            <SearchBox />
          </div>
          <LangsComboBox />
          <UserAvatar
            onClick={() => setIsLogout(!isLogout)}
            size={28}
            alt="Avatar..."
          />
          {isLogout ? <LogoutPopup /> : ""}
        </>
      ) : (
        <Button
          onClick={async () => {
            const res = await loginService(signInWithGoogle);
            dispatch(login(res));
          }}
          style={{ color: "#fff" }}
          shape="round"
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
