import React, { FC, useEffect } from "react";
import { data } from "../../items/navbar/navbar.item";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

type Props = {};

const VerticalNavbar: FC = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="h-fit py-2 text-white border-b border-solid border-white/10">
      {data.map((menuItem, index) => (
        <div
          key={index}
          className={`cursor-pointer flex items-center p-3 mx-2 rounded-lg ${clsx(
            {
              "bg-white/20": location.pathname === `${menuItem.path}`,
            }
          )}`}
          onClick={() => navigate(menuItem.path)}
        >
          <menuItem.icon
            size={50}
            className="text-xl text-white/80 flex items-center"
          />
          <span className="md:block ml-2">{menuItem.label}</span>
        </div>
      ))}
    </div>
  );
};

export default VerticalNavbar;
