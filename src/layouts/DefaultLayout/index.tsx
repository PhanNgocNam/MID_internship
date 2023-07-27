import React, { FC, ReactNode, useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configs/store";
import Player from "../../components/player/Player";
import { resizeWindow } from "../../features/windowSizeSlice";
import VerticalNavbar from "../../components/vertical_navbar/VerticalNavbar";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isChangeBackgroundHeader, setIsChangeBackgroundHeader] =
    useState<boolean>(false);

  window.addEventListener("scroll", handleChangeBg);
  useEffect(() => {
    window.addEventListener("resize", () =>
      dispatch(resizeWindow(window.innerWidth))
    );
    return () => {
      window.removeEventListener("resize", () =>
        dispatch(resizeWindow(window.innerWidth))
      );
    };
  }, [window]);

  const { status } = useSelector((state: RootState) => state.user);
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);

  function handleChangeBg() {
    const { scrollY } = window;
    if (!status) return;
    if (scrollY >= 10) {
      setIsChangeBackgroundHeader(true);
    } else {
      setIsChangeBackgroundHeader(false);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="hidden w-[20%] float-left fixed top-0 bottom-0 left-0 pt-[64px] border-r border-solid border-white/10 bg-black md:block">
        <VerticalNavbar />
      </div>
      <div className="bg-black none_scrollbar md:w-[80%] float-right w-full h-full">
        <Navbar isChangeBackgroundHeader={isChangeBackgroundHeader} />
        {children}
        {activeSongId ? <Player /> : ""}
      </div>
    </div>
  );
};

export default DefaultLayout;
