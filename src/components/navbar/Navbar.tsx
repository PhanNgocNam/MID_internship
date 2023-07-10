import React, { FC } from "react";
import logo_on_phone from "../../assets/img/logo-on-phone.svg";
import avatar from "../../assets/img/avatar.jpg";
import UserAvatar from "../avatar/UserAvatar";
import Logo from "../logo/Logo";
import SearchBox from "./SearchBox";
// import { data } from "../../items/navbar/navbar.item";

import {
  HomeOutlined,
  CompassOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";

const Navbar: FC = () => {
  return (
    <div className="bg-transparent flex justify-between items-center h-[64px] p-2 text-slate-100 border-b border-white/10 border-solid fixed top-0 left-0 right-0">
      <Logo alt="Logo" src={logo_on_phone} size={26} shape="circle" />
      <div className="flex w-[60%] items-center justify-evenly ">
        <HomeOutlined className="text-xl" />
        <CompassOutlined className="text-xl" />
        <PlaySquareOutlined className="text-xl" />
        <SearchBox />
      </div>
      <UserAvatar size={28} src={avatar} alt="Avatar..." />
    </div>
  );
};

export default Navbar;
