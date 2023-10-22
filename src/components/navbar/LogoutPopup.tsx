import React, { FC } from "react";
import UserAvatar from "../avatar/UserAvatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configs/store";
import { ExportOutlined } from "@ant-design/icons";
import { logoutService } from "../../services/logout/logoutService";

const LogoutPopup: FC = () => {
  const { displayName, email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-[64px] right-1 p-2 bg-stone-600/90 rounded-sm z-20">
      <div className="flex items-center before:border-x-8 before:border-y-8 before:top-[-16px] before:absolute before:right-3 before:border-l-transparent before:border-r-transparent before:border-t-transparent before:border-b-slate-500 transition-all duration-1000">
        <UserAvatar alt="Ngoc Nam" size={40} />
        <div className="py-2 ml-2">
          <h3 className="tracking-wide">{displayName}</h3>
          <p className="text-xs tracking-wide">{email}</p>
        </div>
      </div>
      <div
        onClick={() => logoutService(dispatch)}
        className="flex py-2 border-t border-solid cursor-pointer"
      >
        <ExportOutlined className="pr-4" /> Đăng xuất
      </div>
    </div>
  );
};

export default LogoutPopup;
