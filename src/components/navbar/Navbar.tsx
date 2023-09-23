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
import { loginService } from "../../services/login/loginService";
import { login } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import LogoutPopup from "./LogoutPopup";
import LangsComboBox from "./LangsComboBox";
import DesktopLogo from "../../assets/img/on_platform_logo_dark.svg";

interface INavbar {
  isChangeBackgroundHeader: boolean;
}

const Navbar: FC<INavbar> = ({ isChangeBackgroundHeader }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const { status } = useSelector((state: RootState) => state.user);
  const { size } = useSelector((state: RootState) => state.size);

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
      className={`bg-black flex justify-between items-center h-[64px] p-2 text-slate-100 border-b border-white/10 border-solid fixed top-0 left-0 right-0 z-20 transition-colors md:mx-auto md:w-full ${clsx(
        {
          ["changeBg"]: isChangeBackgroundHeader,
          ["bg-transparent"]: status,
        }
      )}`}
    >
      {size >= 768 ? (
        <img alt="" src={DesktopLogo} />
      ) : (
        <>
          <Logo alt="Logo" src={logo_on_phone} size={26} shape="circle" />
        </>
      )}
      <div className="w-10 md:pl-[76px] md:w-[60%] flex justify-end md:justify-start items-center">
        <SearchBox />
      </div>
      {status ? (
        <>
          <div className="flex items-center justify-evenly flex-1">
            {data.map((menuItem, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer  md:hidden"
                  onClick={() => navigate(menuItem.path)}
                >
                  <menuItem.icon className="text-xl text-white/80 md:hidden" />
                  <span className="hidden md:block">{menuItem.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex w-20 justify-between">
            <LangsComboBox />
            <UserAvatar
              onClick={() => setIsLogout(!isLogout)}
              size={28}
              alt="Avatar..."
            />
          </div>
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
