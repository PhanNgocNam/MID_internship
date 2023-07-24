import React, { FC, ReactNode, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import Player from "../../components/player/Player";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: FC<IProps> = ({ children }) => {
  const [isChangeBackgroundHeader, setIsChangeBackgroundHeader] =
    useState<boolean>(false);

  const { status } = useSelector((state: RootState) => state.user);
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);

  const handleChangeBg = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (!status) return;
    if (scrollTop >= 10) {
      setIsChangeBackgroundHeader(true);
    } else {
      setIsChangeBackgroundHeader(false);
    }
  };
  return (
    <div
      onScroll={(e) => handleChangeBg(e)}
      className="fixed top-0 left-0 right-0 bottom-0 overflow-auto bg-black"
    >
      <Navbar isChangeBackgroundHeader={isChangeBackgroundHeader} />
      {children}
      {activeSongId ? <Player /> : ""}
    </div>
  );
};

export default DefaultLayout;
