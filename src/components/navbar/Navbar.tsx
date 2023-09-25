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
      className={`bg-black flex justify-between items-center h-[64px] py-2 px-2 text-slate-100 
      border-b border-white/10 border-solid md:px-0 fixed top-0 left-0 right-0 z-20 md:mx-auto md:w-full bg-transparent ${clsx(
        {
          ["changeBg"]: isChangeBackgroundHeader,
        }
      )}`}
    >
      <div className="w-fit md:w-[20%] md:pl-5">
        {size >= 768 ? (
          <img alt="" src={DesktopLogo} />
        ) : (
          <>
            <Logo alt="Logo" src={logo_on_phone} size={26} shape="circle" />
          </>
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center justify-evenly flex-1 md:hidden">
          {data.map((menuItem, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer md:hidden"
                onClick={() => navigate(menuItem.path)}
              >
                <menuItem.icon className="text-xl text-white/80 md:hidden" />
                <span className="hidden md:block">{menuItem.label}</span>
              </div>
            );
          })}
        </div>

        <SearchBox />
        <div className="flex items-center md:mr-10">
          <LangsComboBox className="px-4" />
          {status ? (
            <>
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
      </div>
    </div>
  );
};

export default Navbar;
